---
title: VirtualBox部署华为enspPro
description: 详细介绍使用VirtualBox 5.2.44部署华为enspPro网络模拟器的完整流程和配置要求
tags: [VirtualBox, 网络模拟器, enspPro, 华为数通, 虚拟化]
date: 2024-05-13T23:00:29Z
lastmod: 2024-05-13T23:19:24Z
---

# 使用VirtualBox部署enspPro模拟器

　　环境：VirtualBox 5.2.44

　　镜像文件下载：[https://blog.csdn.net/weixin_47115107/article/details/138823425?spm=1001.2014.3001.5501](https://blog.csdn.net/weixin_47115107/article/details/138823425?spm=1001.2014.3001.5501)

　　‍

　　最低配置要求：

　　CPU：8核心

　　内存：16G

　　硬盘：40G

　　‍

## 安装流程

　　下载镜像，并保存到本地

​![image](assets/image-20240513230653-4dp1ue9.png)​

　　打开VirtualBox，点击新建

​![image](assets/image-20240513230809-ghviqqu.png)​

　　名称自定义，类型选择 Linux ，版本选择 Other-64位

　　内存最低需要16G，硬盘选择刚才下载好的VDI文件

　　点击创建即可，创建成功后右键点击虚拟机-设置

​![image](assets/image-20240513231014-sncmzw3.png)​

　　点击系统-处理器，将处理器数量最低改为8

​![image](assets/image-20240513231037-twwl3b0.png)​

　　然后点击网络，修改网卡

　　网卡一：仅主机(Host-Only)网络

　　网卡一：网络地址转换(NAT)网络

　　网卡一：仅主机(Host-Only)网络

​![image](assets/image-20240513231204-4lchm9l.png)​

​![image](assets/image-20240513231211-w29c6tu.png)​

​![image](assets/image-20240513231216-o7pxv8w.png)​

　　全部设置完成后，点击启动

​![image](assets/image-20240513231314-z8n9i04.png)​

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
