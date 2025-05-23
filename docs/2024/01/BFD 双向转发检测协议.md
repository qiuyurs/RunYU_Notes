---
title: BFD协议快速故障检测指南
description: 介绍BFD双向转发检测协议的工作原理及华为设备配置方法，实现网络链路快速故障检测
tags: [BFD协议, 网络故障检测, 华为配置, 路由联动, OSPF]
date: 2023-12-04T21:27:21Z
lastmod: 2024-05-02T13:52:37Z
---
## BFD 双向转发检测协议

### 协议信息

　　BFD 双向转发检测协议，提供了一个通用的、标准的、介质无关和协议无关的快速故障检测协议，用于快速检测、监控网络链路中链路或者 IP 路由的转发连通状态。可与其他上层协议联动

　　主要用于测试直连设备

### 配置实现

#### 华为

##### 基础实例

```vim
[Huawei]bfd # 开启bfd
[Huawei-bfd]q
// 配置1：
[Huawei]bfd test bind peer-ip 10.1.12.2       # 检测对端ip，test为名称，可自定义
[Huawei-bfd-session-test]discriminator local 10     # 本端名称，与对端保持一致
[Huawei-bfd-session-test]discriminator remote 20    # 对端名称，与对端保持一致
[Huawei-bfd-session-test]commit

// 配置2，自动检测：
bfd 1 bind peer-ip 12.1.1.1 source-ip 12.1.1.2 auto // 建立邻居，目的IP为对端IP，源IP为本端发起请求的IP。1为bfd名称
display bfd session all // 查看全部bfd会话

// 单臂回声，只在一端配置接口。
原理：将对端地址也写自己。这样对端收到报文后会发给自己。
```

##### <span id="20231204224532-mswbfrh" style="display: none;"></span>BFD 与静态路由进行联动

　　​`ip route-static 10.1.1.0 24 10.1.2.1 track bfd-session test`​

##### BFD 与 OSPF 联动

　　​`bfd`​  全局开启 BFD

　　​`bfd all-interface enable`​  所有开启 ospf 的接口，自动建立 bfd 会话。

##### [BFD与VRRP联动](#20240101232423-12u1w96)
