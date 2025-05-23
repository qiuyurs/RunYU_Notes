---
title: NQA协议ICMP测试指南
description: 华为设备上配置NQA协议进行ICMP网络质量测试的方法，包含测试实例创建和静态路由联动配置
tags: [NQA, 网络测试, ICMP, 华为设备, 路由联动]
date: 2023-12-04T21:27:21Z
lastmod: 2024-05-02T13:52:37Z
---
## NQA 网络质量分析协议

### 协议信息

　　网络质量分析协议，支持 icmp 等协议测试

### 配置实现

#### 华为

##### 创建 ICMP 测试实例

```vim
[Huawei]nqa test-instance admin test1 # admin为实例的管理者名称，test1为实例名称
[Huawei-nqa-admin-test1]test-type icmp # 测试方式为icmp
[Huawei-nqa-admin-test1]destination-address ipv4 10.1.12.1 # 测试对端的地址
[Huawei-nqa-admin-test1]frequency 6 # 每一轮的测试间隔
[Huawei-nqa-admin-test1]probe-count 2 # 每一轮的测试次数
[Huawei-nqa-admin-test1]interval seconds 2 # 每一轮的报文发送间隔
[Huawei-nqa-admin-test1]timeout 2 # 每一次探测的超时时间
[Huawei-nqa-admin-test1]start now # 开始执行探测
```

##### <span id="20231204221236-nu1g1w7" style="display: none;"></span>NQA 与静态路由联动

　　​`ip route-static 10.1.1.0 24 10.1.2.1 track nqa admin test1`​​

　　‍
