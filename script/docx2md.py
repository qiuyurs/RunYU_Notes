import os
import subprocess
import shutil
import hashlib
import re

def convert_docx_to_md(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.docx'):
                docx_path = os.path.join(root, file)
                md_path = os.path.splitext(docx_path)[0] + '.md'
                
                # 创建assets目录
                assets_dir = os.path.join(os.path.dirname(docx_path), 'assets')
                if not os.path.exists(assets_dir):
                    os.makedirs(assets_dir)
                    print(f'检测目录: {assets_dir}')
                
                # 使用pandoc转换格式并提取图片
                subprocess.run(['E:\RunYU_notes\script\pandoc.exe', docx_path,
                              '--extract-media=' + os.path.dirname(docx_path),
                              '-o', md_path])
                
                # 更新md文件中的图片引用路径
                with open(md_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # 处理media目录中的图片
                media_dir = os.path.join(os.path.dirname(docx_path), 'media')
                if os.path.exists(media_dir):
                    for media_file in os.listdir(media_dir):
                        if media_file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                            # 生成新的文件名
                            ext = os.path.splitext(media_file)[1]
                            new_name = f"image_{hashlib.md5(media_file.encode()).hexdigest()[:8]}{ext}"
                            
                            # 移动文件到assets目录
                            src_path = os.path.join(media_dir, media_file)
                            dest_path = os.path.join(assets_dir, new_name)
                            print(f"检测到图片: {media_file} -> {new_name}")
                            shutil.move(src_path, dest_path)
                            
                            # 构建旧路径模式（考虑不同路径格式）
                            old_patterns = [
                                os.path.join('media', media_file),  # media/image1.png
                                os.path.join('media', media_file).replace('\\', '/')  # media/image1.png
                            ]
                            
                            # 构建新路径（相对路径）
                            # 直接使用assets目录
                            new_path = os.path.join('assets', new_name).replace('\\', '/')
                            
                            # 替换所有可能的旧路径格式
                            for pattern in old_patterns:
                                content = content.replace(pattern, new_path)
                    
                    # 删除空的media目录
                    try:
                        os.rmdir(media_dir)
                    except OSError:
                        pass
                
                # 额外处理：确保所有路径使用正斜杠
                def replace_backslashes(match):
                    return "(" + match.group(1).replace('\\', '/') + ")"
                
                # 处理绝对路径和不同层级的相对路径
                def path_replacer(match):
                    original_path = match.group(2)
                    # 转换绝对路径为相对路径
                    if os.path.isabs(original_path):
                        abs_path = os.path.normpath(os.path.join(os.path.dirname(docx_path), original_path))
                        image_name = os.path.basename(abs_path)
                        return '![{}](assets/{})'.format(match.group(1), image_name)
                    # 处理相对路径，确保以 assets/ 开头
                    if 'assets' in original_path:
                        image_name = os.path.basename(original_path)
                        return '![{}](assets/{})'.format(match.group(1), image_name)
                    return '![{}](assets/{})'.format(match.group(1), os.path.basename(original_path))
                
                # 统一替换所有图片路径为直接assets路径并移除尺寸属性
                content = re.sub(r'!\[(.*?)\]\(([^)]+)\)(\{.*?\})?', 
                               lambda m: f'![{m.group(1).replace("/", "")}](assets/{os.path.basename(m.group(2))})', 
                               content)
                # 确保所有路径使用正斜杠
                content = content.replace('\\', '/')
                
                # 清理文本中的多余斜杠
                content = content.replace('/"', '"')
                
                # 写入更新后的内容
                with open(md_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                # 删除原docx文件
                os.remove(docx_path)
                print(f'检测到文件: {docx_path}')

if __name__ == '__main__':
    dir = "docs"
    convert_docx_to_md(dir)
