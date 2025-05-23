---
title: PBR策略路由实验
description: 通过华为eNSP模拟器实现无路由表情况下的网络互通，演示策略路由(PBR)配置与应用
tags: [PBR, 策略路由, eNSP, 网络实验, ACL]
date: 2024-01-20T21:30:50Z
lastmod: 2024-01-20T22:49:11Z
---

# 使用ensp模拟无路由互联互通实验

　　使用策略路由PBR在路由表无对方内网路由的情况下实现互相通信。

　　环境：ensp AR2220。

　　技术：策略路由PBR

　　拓扑：

​![image](assets/image-20240119203700-kavb24c.png)​

　　区域1使用192.168.1.0实现内网互联，区域2使用172.16.1.0实现内网互联。

　　在两个路由器中，使用12.1.1.0进行互联。

## 策略路由的基本介绍

　　在开始之前，先介绍一下什么是策略路由：

　　策略路由（Policy-Based Routing，PBR）是一种网络路由的技术，它允许根据特定的策略或条件对网络流量进行定制化的路由。

　　传统的路由是基于目标地址选择最佳路径进行转发，而PBR将路由决策与其他因素（如源地址、应用类型、协议等）相结合，以决定如何处理特定流量。

　　PBR的基本原理是通过创建并应用路由策略来匹配流量，并根据设定的策略将该流量定向到特定的出接口或下一跳地址。这允许网络管理员根据特定需求或策略来定制路由行为，例如：

* 根据源地址进行流量控制：将特定源地址的流量引导到不同的出口或下一跳地址，以实现分流或负载均衡。
* 根据应用类型进行优先级设置：根据流量中的应用类型（例如视频、音频、文件传输等）设置不同的优先级或服务质量。
* 根据安全需求重定向流量：根据安全策略，将特定流量（例如恶意流量或未经授权的流量）重定向到专用设备进行检查或阻止。

　　实施PBR通常涉及以下步骤：

1. 创建路由策略访问列表（Route-map）：定义匹配条件，如源地址、目标地址、协议等。
2. 定义路由策略：规定如果特定条件匹配，则如何处理流量，如指定下一跳地址或出接口。
3. 将路由策略应用到接口或特定流量：通过接口配置或ACL进行应用，以决定哪些流量将遵循PBR策略。
4. 验证和监控PBR的效果：测试和观察流量是否按照预期的策略进行处理。

　　这里最重要的一点：

　　**PBR的优先级高于路由表。也就是说，可以在路由表没有路由的情况下完成转发**

## 路由配置

### 首先完成基础配置

　　R1配置IP：

```vim
[R1-GigabitEthernet0/0/1]ip add 192.168.1.254 24
[R1-GigabitEthernet0/0/0]ip add 12.1.1.1 24
```

　　R2配置IP：

```vim
[R2-GigabitEthernet0/0/0]ip add 12.1.1.2 24
[R2-GigabitEthernet0/0/1]ip add 172.16.1.254 24
```

### 接下来配置ACL，用于匹配对端流量

　　创建高级ACL，用于匹配对方内网流量

　　R1：

```vim
[R1]acl 3001
[R1-acl-adv-3001]rule 5 permit ip destination 172.16.1.0 0.0.0.255 
```

　　R2：

```vim
[R2]acl 3001
[R2-acl-adv-3001]rule 5 permit ip destination 192.168.1.0 0.0.0.255
```

### 创建策略，修改下一跳

　　创建策略，将acl 3001匹配到的数据包修改下一跳

　　R1：

```vim
// test为策略的名字，permit为“匹配” node 10 为顺序号
[R1]policy-based-route test permit node 10
// 匹配条件为：acl 3001
[R1-policy-based-route-test-10]if-match acl 3001 
// 执行动作：将数据包的下一跳改为12.1.1.2（对方路由器的ip）
[R1-policy-based-route-test-10]apply ip-address next-hop 12.1.1.2
```

　　R2：

```vim
[R2]policy-based-route test permit node 10
[R2-policy-based-route-test-10]if-match acl 3001
[R2-policy-based-route-test-10]apply ip-address next-hop 12.1.1.1
```

## 结果验证

　　可以看到，R1和R2的路由表中没有对方内网（192.168.1.0和172.16.1.0）网段的路由

​![image](assets/image-20240119205018-hp9ob3y.png)​

​![image](assets/image-20240119205031-n26wgpg.png)​

　　接下来，可以看到双方可以正常通信。

​![image](assets/image-20240119212055-haysa24.png)​

​![image](assets/image-20240119212137-oh0vuwb.png)​

　　这里用的是带源ping。

　　正常来说应该在PC上验证，但是因为模拟器的原因，在PC上无法验证。

　　在真机上是没有问题的。有条件的可以试一下

　　‍

　　欢迎联系博主（QQ：65800270）探讨交流

　　原文地址：[使用ensp模拟双端无路由互联互通实验](http://ie.oldc.cc/article/2)

　　‍
