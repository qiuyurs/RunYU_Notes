# 获取飞书云文档内容并保存为md文件
AppID = 'cli_a7479f80ac38100d'
AppSecret = '6SMgj8u5uOhOrQhsVVqqjglxgqskgl6d'
output_dir = './docs/2025/04'

import os

def get_tenant_access_token():
    """
    获取飞书tenant_access_token
    返回: tuple(token, expire_time) 或 None(失败时)
    """
    import requests
    
    url = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal"
    headers = {"Content-Type": "application/json; charset=utf-8"}
    payload = {
        "app_id": AppID,
        "app_secret": AppSecret
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        data = response.json()
        if data.get('code') == 0:
            return data['tenant_access_token'], data['expire']
        else:
            print(f"获取token失败: {data.get('msg')}")
            return None
    except Exception as e:
        print(f"请求异常: {str(e)}")
        return None
        
def get_document_obj_token(token, obj_type="wiki"):
    """
    获取知识库文档实际obj_token
    参数:
        token: 文档token
        obj_type: 文档类型，默认为wiki
    返回: obj_token或None(失败时)
    """
    import requests
    
    access_token = get_tenant_access_token()
    if not access_token:
        return None
        
    url = "https://open.feishu.cn/open-apis/wiki/v2/spaces/get_node"
    headers = {
        "Authorization": f"Bearer {access_token[0]}",
        "Content-Type": "application/json; charset=utf-8"
    }
    params = {"token": token, "obj_type": obj_type}
    
    try:
        print("正在获取文档信息...")
        response = requests.get(url, headers=headers, params=params)
        
        data = response.json()
        if data.get('code') == 0:
            if 'data' in data and 'obj_token' in data['data']:
                print(f"成功获取文档obj_token:{data['data']['obj_token']}")
                return data['data']['obj_token']
            elif 'data' in data and 'node' in data['data'] and 'obj_token' in data['data']['node']:
                print(f"成功获取文档obj_token:{data['data']['node']['obj_token']}")
                return data['data']['node']['obj_token']
            else:
                print("无法找到obj_token字段")
                return None
        else:
            print(f"获取obj_token失败: {data.get('msg')}")
            return None
    except Exception as e:
        print(f"请求异常: {str(e)}")
        print(f"异常详情: {e.__dict__ if hasattr(e, '__dict__') else str(e)}")
        return None
        
def export_document(obj_token):
    """
    导出文档为Word文件
    参数:
        obj_token: 文档obj_token
    返回: 导出文件路径或None(失败时)
    """
    import requests
    import time
    
    access_token = get_tenant_access_token()
    if not access_token:
        return None
        
    # 创建导出任务
    url = "https://open.feishu.cn/open-apis/drive/v1/export_tasks"
    headers = {
        "Authorization": f"Bearer {access_token[0]}",
        "Content-Type": "application/json; charset=utf-8"
    }
    
    # 修改后的payload
    payload = {
        "file_extension": "docx",
        "token": obj_token,
        "type": "docx"  # 新版API不再需要sub_id参数
    }
    
    try:
        # 创建导出任务
        response = requests.post(url, headers=headers, json=payload)
        data = response.json()
        if data.get('code') != 0:
            print(f"创建导出任务失败: {data.get('msg')}")
            print(f"请求详情: URL={url}, 请求体={payload}")
            return None
            
        ticket = data['data']['ticket']

        print(f"创建导出任务成功: ticket={ticket}")
        
        # 轮询导出任务状态
        for _ in range(10):  # 最多尝试10次
            time.sleep(5)  # 每次等待5秒
            url = f"https://open.feishu.cn/open-apis/drive/v1/export_tasks/{ticket}"
            params = {"token": obj_token}  # 添加token查询参数
            response = requests.get(url, headers=headers, params=params)
            data = response.json()
            
            if data.get('code') != 0:
                print(f"查询导出任务失败: {data.get('msg')}")
                print(f"请求详情: URL={url}, 参数={params}")
                print(f"完整响应: {data}")
                return None
                
            if data['data']['result']['job_status'] == 0:  # 任务完成
                file_token = data['data']['result']['file_token']
                file_name = data['data']['result']['file_name']

                print(f"导出任务完成: file_token={file_token}, file_name={file_name}")
                
                # 下载文件
                url = f"https://open.feishu.cn/open-apis/drive/v1/export_tasks/file/{file_token}/download"
                response = requests.get(url, headers=headers, stream=True)
                
                if response.status_code == 200:
                    file_path = os.path.join(output_dir, f"{file_name}.docx")
                    os.makedirs(output_dir, exist_ok=True)
                    with open(file_path, 'wb') as f:
                        for chunk in response.iter_content(1024):
                            f.write(chunk)
                    return file_path

                else:
                    print(f"下载文件失败: {response.status_code}")
                    return None
                    
        print("导出任务超时")
        return None
        
    except Exception as e:
        print(f"请求异常: {str(e)}")
        return None

def download_external_resource(url, local_path):
    """
    下载外部资源到本地
    参数:
        url: 资源URL
        local_path: 本地保存路径
    返回: 是否成功
    """
    import requests
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            os.makedirs(os.path.dirname(local_path), exist_ok=True)
            with open(local_path, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            return True
    except Exception as e:
        print(f"下载资源失败: {url}, 错误: {str(e)}")
    return False

def process_external_links(content, output_dir):
    """
    处理Markdown中的外部链接
    参数:
        content: Markdown内容
        output_dir: 输出目录
    返回: 处理后的内容和资源目录路径
    """
    import re
    import os
    import uuid
    
    # 创建临时资源目录
    temp_dir = os.path.join(output_dir, f"temp_resources_{uuid.uuid4().hex}")
    os.makedirs(temp_dir, exist_ok=True)
    
    # 匹配图片链接
    img_pattern = re.compile(r'!\[.*?\]\((http[s]?:\/\/[^\s)]+)\)')
    # 匹配普通链接
    link_pattern = re.compile(r'\[.*?\]\((http[s]?:\/\/[^\s)]+)\)')
    
    def replace_link(match):
        url = match.group(1)
        # 提取URL中的路径部分
        path = url.split('//', 1)[1].split('/', 1)[1] if '/' in url.split('//', 1)[1] else ''
        if not path:
            return match.group(0)
            
        local_path = os.path.join(temp_dir, path)
        if download_external_resource(url, local_path):
            # 返回相对路径
            return match.group(0).replace(url, os.path.join('./', path))
        return match.group(0)
    
    # 处理图片链接
    content = img_pattern.sub(replace_link, content)
    # 处理普通链接
    content = link_pattern.sub(replace_link, content)
    
    return content, temp_dir

def process_feishu_url(url, output_dir="docs"):
    """
    处理飞书文档URL并导出为Word文件
    参数:
        url: 飞书文档URL
        output_dir: 输出目录，默认为docs
    返回: 保存的文件路径或None(失败时)
    """
    import os
    import re
    
    print(f"开始处理URL: {url}")
    
    # 从URL中提取token
    token_match = re.search(r'(docx|wiki)/([a-zA-Z0-9]+)', url)
    if not token_match:
        print("无法从URL中提取文档token")
        return None
    
    doc_type, token = token_match.groups()
    
    # 根据文档类型获取obj_token
    if doc_type == "docx":
        print("处理云文档...")
        obj_token = token
    elif doc_type == "wiki":
        print("处理知识库文档...")
        obj_token = get_document_obj_token(token)
        if not obj_token:
            return None
    else:
        print(f"不支持的文档类型: {doc_type}")
        return None
    
    # 导出文档
    file_path = export_document(obj_token)
    if not file_path:
        print("导出文档失败")
        return None
    
    print(f"文档已保存到: {file_path}")
    return file_path

def main():
    """
    主函数：提示用户输入飞书文档URL并处理
    """
    print("飞书文档下载工具")
    print("请输入飞书文档URL(格式如：https://xxx.feishu.cn/docx/xxx 或 https://xxx.feishu.cn/wiki/xxx)")
    
    while True:
        url = input("> ").strip()
        if not url:
            print("输入不能为空，请重新输入")
            continue
            
        if not (url.startswith('http://') or url.startswith('https://')):
            print("请输入有效的URL(http/https开头)")
            continue
            
        result = process_feishu_url(url,output_dir=output_dir)
        if result:
            print(f"处理成功，文件已保存到: {result}")
        else:
            print("处理失败，请检查URL是否正确")
        
        choice = input("是否继续处理其他文档？(y/n): ").lower()
        if choice != 'n':
            break

if __name__ == "__main__":
    main()
