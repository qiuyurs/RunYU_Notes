---
title: Windows任务计划执行PowerShell脚本
description: 使用Windows任务计划程序定时执行PowerShell脚本的完整配置指南
tags: [Windows, 任务计划, PowerShell, 自动化, 定时任务]
date: 2024-05-19T20:33:21Z
lastmod: 2024-05-19T21:06:56Z
---

# windows定时任务运行PowerShell脚本

　　使用windows自带的 任务计划 程序实现定时运行指定程序

　　打开 任务计划程序 即可看到以下页面

​![image](assets/image-20240519203550-1q9bdjy.png)​

　　右键  - 创建任务

​![image](assets/image-20240519203630-j30cmf1.png)​

　　这里可以填写计划名称、运行级别等情况

　　注意：PowerShell脚本需要使用最高权限运行

​![image](assets/image-20240519203716-ldzmoon.png)​

　　触发器这里可以选择触发类型、频次等

　　这里选择 每天的20:55运行程序

​![image](assets/image-20240519203801-3o2etwl.png)​

　　同时，可以设置多个触发器，满足任一条件即可运行

​![image](assets/image-20240519203856-5gw3p08.png)​

　　操作这里选择 PowerShell程序，一般为

　　​`C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`​

​![image](assets/image-20240519203942-5qtcx1l.png)​

　　可选参数这里填写

　　​`-NoExit -WindowStyle Hidden -c 脚本路径`​

​![image](assets/image-20240519204235-47dibiw.png)​

　　点击确定 保存即可

　　右键计划任务，点击允许，将状态改为正在运行，启用该任务

​![image](assets/image-20240519204944-xsrc1fs.png)​

　　配置成功，等到时间后会自动执行你设定的脚本

　　‍
