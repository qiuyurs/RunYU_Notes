---
title: Vmware部署华为enspPro网络模拟器
description: 详细介绍在Vmware 17环境下部署华为enspPro网络模拟器的完整流程，包含系统配置要求和安装步骤
tags: [Vmware, 网络模拟器, enspPro, 华为, 虚拟化]
date: 2024-05-13T23:20:53Z
lastmod: 2024-05-13T23:27:45Z
---

# 使用Vmware部署enspPro华为数通模拟器

　　环境：Vmware 17

　　镜像文件下载：[https://blog.csdn.net/weixin_47115107/article/details/138823425?spm=1001.2014.3001.5501](https://blog.csdn.net/weixin_47115107/article/details/138823425?spm=1001.2014.3001.5501)

　　‍

　　最低配置要求：

　　CPU：8核心

　　内存：16G

　　硬盘：40G

## 安装流程

　　下载镜像，并保存到本地

​![image](assets/image-20240513232137-s3kvnc5.png)​

　　打开Vmware，点击文件 - 打开 - 选择刚才下载的文件

​![image](assets/image-20240513232152-wwrrk9n.png)​

　　虚拟机名称可自定义，存储位置可根据需要自己修改

​![image](assets/image-20240513232225-04wzool.png)​

　　点击导入，会提示导入失败，这时点击重试即可

​![image](assets/image-20240513232309-m0kopxm.png)​

　　导入成功后，点击虚拟机 - 编辑虚拟机设置

​![image](assets/image-20240513232337-ia1p3ac.png)​

　　要求CPU八核及以上、内存16G及以上

　　网卡一：仅主机模式

　　网卡二：NAT模式

　　网卡三：仅主机模式

​![image](assets/image-20240513232458-ewc3b2d.png)​

　　修改完毕后，点击保存

　　并开启虚拟机

​![image](assets/image-20240513232600-6vckqtg.png)​

　　此时，看到内网ip，使用浏览器打开

　　看到正确获取到IP后即可。

　　浏览器打开 https://IP:8443  即可

​![image](assets/image-20240513231404-88wjiv3.png)​

　　点击右上角登录，使用自己的华为账号登录即可。

　　然后点击最近打开 - 更多

​![image](assets/image-20240513231456-7krwkx9.png)​

　　创建沙箱进入

​![image](assets/image-20240513231517-rv44nnd.png)​

​![image](assets/image-20240513231413-6cqytcv.png)​

　　右键点击启动，这个颜色正在启动

​![image](assets/image-20240513231551-9ztq4w2.png)​

　　设备全绿后，即为启动成功。点击图标即可进入控制台

​![image](assets/image-20240513231722-fhzhqpp.png)​

　　右键可以进行抓包

​![image](assets/image-20240513231741-0jqm6u6.png)​

　　‍
