---
title: EVE桥接锐捷防火墙指南
description: 详细介绍EVE模拟器通过桥接物理网卡访问锐捷防火墙的配置步骤和访问方法
tags: [EVE, 锐捷防火墙, 网络模拟, 桥接配置, 网络实验]
date: 2023-12-09T20:48:17Z
lastmod: 2023-12-10T22:53:48Z
---

# EVE桥接网卡访问锐捷防火墙

# eve桥接物理网卡

## 虚拟机配置

　　1.创建一块新的网卡

　　设置为仅主机模式，选择“将主机虚拟适配器连接到次网络”选上，  选择“使用本地DHCP服务将IP分配给虚拟机”，

　　网段可以自定义。我这边因为锐捷防火墙镜像的默认IP为`192.168.1.200`​所以设置了`192.168.1.0`​网段。

​![image](assets/image-20231209224325-3x4jwff.png)​

　　2.将虚拟机的网卡改为自定义，选择刚才添加的网卡，保存重启EVE虚拟机

​![image](assets/image-20231209224528-tt37xm0.png)​

## EVE配置

　　1.eve选择“network”

​![image](assets/image-20231209224633-7st6kke.png)​

　　2.type这里选择“Management(Cloud0)”

​![image](assets/image-20231209224700-562xnyh.png)​

　　3.连接防火墙的G0/0口

​![image](assets/image-20231209230004-df4f6tm.png)​

　　4.浏览器访问`htps://192.168.1.200`​即可访问防火墙的web页面。默认密码：`admin/firewall`​。

​![image](assets/image-20231209230340-rgh6bcn.png)​

​![image](assets/image-20231209230425-qlycqa0.png)​

　　‍

　　参考链接：[http://ie.oldc.cc/article/1](http://ie.oldc.cc/article/1)
