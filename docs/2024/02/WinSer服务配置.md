---
title: Windows服务器配置指南
description: 详细记录Windows服务器各项服务配置过程，包括ICMP回显、DFS服务、WSUS更新、DHCP服务等
tags: [Windows服务器, 服务配置, 系统管理, 网络服务]
date: 2024-04-17T00:00:55Z
lastmod: 2024-04-21T22:47:03Z
---

# WinSer服务配置

## 基础配置

​![image](assets/image-20240421222115-6qlbq8a.png)​

### ICMP回显

　　刚安装时，主机间的互相ping是不通的。此时可以打开icmp回显请求，解决此问题

​![image](assets/image-20240417000328-z75nxlu.png)​

　　图形化：

　　高级安全防火墙 - 入站规则 - 文件和打印机共享(回显请求ICMPv4) - 启用

​![image](assets/image-20240417000442-gq2brg2.png)​

​![image](assets/image-20240417000550-d7tvtwq.png)​

　　命令配置：

　　​` netsh firewall set icmpsetting 8 enable`​

​![image](assets/image-20240417000627-8xt8mds.png)​

### DFS服务

　　在AppSrv上安装及配置 DFS 服务。

　　目录设置在F：\DFSsharedir。

　　配置DFS复制，使用DC1作为次要服务器，复制方式配置为交错拓扑。

　　在F：\DFSsharedir 文件夹内新建所有部门的文件夹。

　　所有部门的用户之可以访问部门内的文件，不可以跨部门访问别的部门文件夹内容。

　　Management用户组用户可以访问全局的文件夹。

　　‍

　　服务器管理-添加角色

​![image](assets/image-20240421151441-cpgjvom.png)​

　　服务器管理-工具-DFS

​![image](assets/image-20240421151532-n3jcozj.png)​

　　设置文件权限

​![image](assets/image-20240421151611-fwf19a7.png)​

​![image](assets/image-20240421151628-qrxiz01.png)​

### WSUS服务

　　WSUS更新服务

　　安装WSUS更新服务，更新补丁目录设置为“c: \wsusbackup" ;

　　创建更新组名称为“CHINASKILLS-WSUS" ;

　　每天凌晨03:00下发自动更新;

　　更新服务 器地址为“http://wsus.chinaskills.com:8530”。

#### 安装服务

​![image](assets/image-20240421152245-femrk6x.png)​

​![image](assets/image-20240421152258-p75zj4p.png)​

​![image](assets/image-20240421152308-hopbiem.png)​

​![image](assets/image-20240421152323-3j8o0ei.png)​

​![image](assets/image-20240421152329-st2o2uy.png)​

​![image](assets/image-20240421152336-vjcsvn7.png)​

​![image](assets/image-20240421152423-ooxdb6r.png)​

​![image](assets/image-20240421152431-85f14jq.png)​

#### 创建更新组

​![image](assets/image-20240421152501-j7amvs5.png)​

​![image](assets/image-20240421152710-e8m7i28.png)​

​![image](assets/image-20240421152719-vyd8qms.png)​

​![image](assets/image-20240421152727-pjylsky.png)​

#### 配置策略并更新

​![image](assets/image-20240421152747-wfjcivv.png)​

​![image](assets/image-20240421152754-iumwgi5.png)​

​![image](assets/image-20240421152754-iumwgi5.png)![image](assets/image-20240421152816-c335j7o.png)​

​![image](assets/image-20240421152850-8neylms.png)​

​![image](assets/image-20240421152905-40fnr8m.png)​

​![image](assets/image-20240421152911-y724vg1.png)​

​![image](assets/image-20240421152933-dnbdw7z.png)​

### DHCP

　　动态地址分配服务

　　安装和配置dhcp服务，为办公区域提供网络地址上网

　　地址池范围：192.168.0.100-192.168.0.200

#### 安装服务

​![image](assets/image-20240421153531-keglh2d.png)​

​![image](assets/image-20240421153541-ljzzmx5.png)​

#### 配置作用域

​![image](assets/image-20240421153614-5858tvi.png)​

​![image](assets/image-20240421153621-clm4wpx.png)​

​![image](assets/image-20240421153626-b2348o5.png)​

​![image](assets/image-20240421153632-vb5o7o7.png)​

### 万维网服务

　　在RouterSrv1上搭建网站服务器。

　　将访问http://www.chinaskills.com的http的请求重定向到https://www.chinaskills.com站点。

　　网站内容设置为“该页面为www.chinaskills.com测试页！”。

　　将当前web根目录的设置为d:\wwwroot目录。

　　启用windows身份验证，只有通过身份验证的用户才能访问到该站点，manager用户组成员使用IE浏览

　　器打开不提示认证，直接访问。

　　设置“http://www.chinaskills.com/”网站的最大连接数为1000，网站连接超时为60sl；

　　使用W3C记录日志；每天创建一个新的日志文件，文件名格式:

　　日志只允许记录日期、时间、客户端IP地址、用户名、服务器IP地址、服务器端口号；

　　日志文件存储到“C:\WWWLogFile”目录中；

　　IIS（FTP）：

　　匿名用户上传的文件都将映射为ftp2用户

　　ftp在登录前显示Banner消息：

　　“Hello, unauthorized login is prohibited!”

#### 配置IIS

　　添加角色

​![image](assets/image-20240421154554-scv08pv.png)​

​![image](assets/image-20240421154601-qu7wxm8.png)​

​![image](assets/image-20240421154615-p9uyq6o.png)​

#### 证书配置

​![image](assets/image-20240421154628-o0odtm3.png)​

​![image](assets/image-20240421154642-l2nio4q.png)​

#### 添加站点

​![image](assets/image-20240421154658-7r787t3.png)​

​![image](assets/image-20240421154704-8krmrug.png)​

#### 配置重定向及认证

​![image](assets/image-20240421154721-fygnlbw.png)​

​![image](assets/image-20240421154726-4lau65y.png)​

​![image](assets/image-20240421155340-l5yjnzb.png)​

​![image](assets/image-20240421155359-koyhyfg.png)![image](assets/image-20240421155412-39rbcnv.png)​

​![image](assets/image-20240421155427-vhi8o99.png)​

　　刷新策略

​![image](assets/image-20240421155438-1h34uv0.png)​

​![image](assets/image-20240421155443-dyhpi68.png)​

#### IIS安全选项配置及日志配置用户日志

​![image](assets/image-20240421155456-rxhtxiz.png)​

​![image](assets/image-20240421155502-nh6afws.png)​

​![image](assets/image-20240421155507-15y7m0p.png)​

​![image](assets/image-20240421155516-jib5lca.png)​

#### IIS（FTP）

​![image](assets/image-20240421155532-mj0zylp.png)![image](assets/image-20240421155549-cwi3yfm.png)​

​![image](assets/image-20240421155558-7c5j2c3.png)​

​![image](assets/image-20240421155606-d3y777h.png)​

#### ftp用户映射

​![image](assets/image-20240421155618-jjv4mjj.png)​

​![image](assets/image-20240421155623-rtwwqla.png)​

​![image](assets/image-20240421155630-dfzzdx2.png)​

​![image](assets/image-20240421155641-b9ejbbv.png)​

### Raid 磁盘管理

　　安装及配置软 RAID5。

　　在安装好的AppSrv虚拟机中添加三块10G虚拟磁盘。

　　组成RAID5，磁盘分区命名为卷标H盘: Raid5。 禁用raid5的写入

　　缓存;

　　手动测试破坏一块磁盘，做RAID磁盘修复；确认RAID5配置完毕。

#### 添加磁盘

​![image](assets/image-20240421155756-2wcydvr.png)​

#### 创建RAID

​![image](assets/image-20240421155809-n0ont02.png)​

#### RAID磁盘修复

　　我们模拟一块硬盘损害，移除一块盘。

​![image](assets/image-20240421155832-7223kqm.png)​

　　然后就会出现这样

​![image](assets/image-20240421155843-fs5isv6.png)​

　　在添加一块10G盘

​![image](assets/image-20240421155854-fapl7fy.png)​

​![image](assets/image-20240421155901-zw9cnxk.png)​

​![image](assets/image-20240421155905-am157oy.png)​

### DC证书颁发机构

　　在DC1服务器上安装证书办法机构。

　　定义名称：CSK2023-ROOTCA。

　　证书颁发机构有效期：3 years。

　　为chinaskills.com域内的web站点颁发web证书。

　　当前拓扑内所有机器必须信任该证书颁发机构。

　　所域内所有计算机自动颁发一张计算机证书。

#### 安装及创建根证书

​![image](assets/image-20240421162038-ta2qsk7.png)​

​![image](assets/image-20240421162045-d3uq68g.png)​

​![image](assets/image-20240421162051-xxytmt0.png)​

​![image](assets/image-20240421162057-4ylf4qu.png)​

​![image](assets/image-20240421162112-sjfbaaf.png)​

​![image](assets/image-20240421164504-h2phkqn.png)​

​![image](assets/image-20240421164519-cfgslag.png)​

#### 所域内所有计算机自动颁发一张计算机证书。

```shell
计算机配置-->策略-->Windows设置-->安全设置-->公钥策略-->证书服务客户端-证书注册策略
计算机配置-->策略-->Windows设置-->安全设置-->公钥策略-->证书服务客户端-自动注册
```

​![image](assets/image-20240421164542-pftcmt5.png)​

​![image](assets/image-20240421164549-fvphret.png)​

​![image](assets/image-20240421164600-icei7xi.png)​

​![image](assets/image-20240421164609-dx6v9zv.png)​

​![image](assets/image-20240421164615-au1bcsh.png)​

### 活动目录域服务

　　在DCSERVER和SDCSERVER服务器上安装活动目录域服务，DCSERVER作为主域控，SDCSERVER作为备份域控，活动目录域名为：chinaskills.com。

　　域用户能够使用[username]@csk.cn进行登录。

　　创建一个名为“CSK”的OU，并新建以下域用户和组：

　　sa01-sa20，请将该用户添加到sales用户组。

　　it01-it20，请将该用户添加到IT用户组。

　　ma01-ma10，请将该用户添加到manager用户组。

　　许除manager 组和IT组，所有用户隐藏C盘。

　　除manager 组和IT组，所有普通给用户禁止使用cmd。

　　禁止客户端电脑显示用户首次登录动画。

　　所有用户的IE浏览器首页设置为“https://www.chinaskills.com”。

　　域内的所有计算机（除dc外），当dc服务器不可用时，禁止使用缓存登录。

#### 安装配置活动目录

　　DC

​![image](assets/image-20240421214110-3nywe8b.png)​

​![image](assets/image-20240421214116-8w7l78c.png)​

​![image](assets/image-20240421214133-a4neq8j.png)​

​![image](assets/image-20240421214140-ug1yqak.png)​

​![image](assets/image-20240421214147-hiyzsnv.png)​

​![image](assets/image-20240421214153-aolkrl1.png)​

　　SDC加入域再安装服务配置

​![image](assets/image-20240421214222-33tqvch.png)​

​![image](assets/image-20240421214228-3fn9glf.png)​

​![image](assets/image-20240421214234-igtqu5v.png)​

​![image](assets/image-20240421214240-wk976g4.png)​

​![image](assets/image-20240421214245-yxzgmtm.png)​

​![image](assets/image-20240421214250-93kejh2.png)​

​![image](assets/image-20240421214256-kljxd3h.png)​

#### 配置后缀和创建用户组及批量建立用户并加入组

​![image](assets/image-20240421214316-x3at5n1.png)​

​![image](assets/image-20240421214321-j4c5hxn.png)​

​![image](assets/image-20240421214329-cx9xjj2.png)​

​![image](assets/image-20240421214334-u13ku5k.png)​

​![image](assets/image-20240421214338-jhgh57t.png)​

​![image](assets/image-20240421214342-irmj916.png)​

​![image](assets/image-20240421214347-vozuztf.png)​

​![image](assets/image-20240421214352-yykgmhq.png)​

​![image](assets/image-20240421214357-cbhksvh.png)​

​![image](assets/image-20240421214402-ue2mbs0.png)​

```shell
for /l %a in (1,1,9) do dsadd user "cn=sa0%a,ou=CSK,dc=chinaskills,dc=com" -pwd ChinaSkill23! -memberof "cn=sales,ou=CSK,dc=chinaskills,dc=com" -upn sa0%a@csk.cn

for /l %a in (10,1,20) do dsadd user "cn=sa0%a,ou=CSK,dc=chinaskills,dc=com" -pwd ChinaSkill23! -memberof "cn=sales,ou=CSK,dc=chinaskills,dc=com" -upn sa0%a@csk.cn

for /l %a in (1,1,9) do dsadd user "cn=it0%a,ou=CSK,dc=chinaskills,dc=com" -pwd ChinaSkill23! -memberof "cn=IT,ou=CSK,dc=chinaskills,dc=com" -upn it0%a@csk.cn

for /l %a in (10,1,20) do dsadd user "cn=it0%a,ou=CSK,dc=chinaskills,dc=com" -pwd ChinaSkill23! -memberof "cn=IT,ou=CSK,dc=chinaskills,dc=com" -upn it0%a@csk.cn

for /l %a in (1,1,9) do dsadd user "cn=ma0%a,ou=CSK,dc=chinaskills,dc=com" -pwd ChinaSkill23! -memberof "cn=manager,ou=CSK,dc=chinaskills,dc=com" -upn ma0%a@csk.cn

dsadd user "cn=ma10,ou=CSK,dc=chinaskills,dc=com" -pwd ChinaSkills23! -memberof "cn=manager,ou=CSK,dc=chinaskills,dc=com" -upn ma10@csk.cn
```

​![image](assets/image-20240421214431-yv9lef8.png)​

​![image](assets/image-20240421214544-fwzo6lp.png)​

​![image](assets/image-20240421214549-a9zv8u1.png)​

​![image](assets/image-20240421214553-mj1wgbn.png)​

​![image](assets/image-20240421214557-1xqesct.png)​

​![image](assets/image-20240421214602-hxddagh.png)​

　　Manager组也是一样操作

​![image](assets/image-20240421214613-bh1ybfx.png)​

　　用户配置-->策略-->管理模板-->Windows组件-->文件资源管理器-->隐藏“我的电脑”中的这些指定驱动器

​![image](assets/image-20240421214632-l9vrlch.png)​

　　用户配置-->策略-->管理模板-->系统-->阻止访问命令提示符

​![image](assets/image-20240421214640-rtux921.png)​

　　刷新策略

​![image](assets/image-20240421214647-iaak021.png)​

### DNS域名解析服务

　　安装DNS服务器，根据题目要求创建必要的正向区域和反向区域的DNS解析

　　把当前机器作为互联网根域服务器，创建test1.com-test100.com，并在所有正向区域中创建一条A记录，解析到本地址

#### 安装dns并添加记录

　　ispsrv

​![image](assets/image-20240421214927-i90v66y.png)​

#### 批量创建

​![image](assets/image-20240421214938-ntcr55b.png)​

```shell
for /L %q in (1,1,100) do dnscmd /zoneadd test%q.com /Primary /file test%q.com.zone

for /L %a in (1,1,100) do dnscmd /recordadd test%a.com test%a.com. A 100.100.100.100
```

### 互联网访问检测

　　为了模拟Internet 访问测试，请搭建网卡互联网检测服务。

#### 搭建服务

​![image](assets/image-20240421220158-jflt38k.png)​

　　首先参考regedit 注册表，要知道怎么修改​`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet`​

​![image](assets/image-20240421220225-n6fyow6.png)​

​![image](assets/image-20240421220230-yyjxst1.png)​

#### 配置DNS服务

​![image](assets/image-20240421220302-ejd92f6.png)​

​![image](assets/image-20240421220307-gvslyx2.png)​

​![image](assets/image-20240421220314-13zr1nn.png)​

​![image](assets/image-20240421220319-74q42kj.png)​

​![image](assets/image-20240421220327-ljo0knu.png)​

​![image](assets/image-20240421220333-brotzqq.png)​

#### 配置IIS

​![image](assets/image-20240421220345-46axjc2.png)​

​![image](assets/image-20240421220354-rncqzf1.png)​

​![image](assets/image-20240421220400-sy11fky.png)​

​![image](assets/image-20240421220405-mp0093y.png)​

### 路由转发功能及DHCP中继

　　路由功能

　　安装Remote Access 服务开启路由转发，为当前实验环境提供路由功能。

　　启用网络地址转换功能，实现内部客户端访问互联网资源。

　　配置网络地址转换，允许互联网区域客户端访问AppSrv上的HTTP资源。

　　动态地址分配中继服务

　　安装和配置dhcp relay服务，为办公区域网络提供地址上网。

　　DHCP服务器位于AppSrv服务器上。

#### 安装Remote Access

​![image](assets/image-20240421220500-vqhzc4z.png)​

​![image](assets/image-20240421220505-d6i4860.png)​

#### 配置转发以及NAT转换

​![image](assets/image-20240421220516-ti1ncdt.png)​

​![image](assets/image-20240421220523-a1p4wm3.png)​

​![image](assets/image-20240421220547-nuj3ov8.png)​

​![image](assets/image-20240421220552-vbd5grq.png)​

　　.![image](assets/image-20240421220558-77u686c.png)​

​![image](assets/image-20240421220605-ony43rt.png)​

​![image](assets/image-20240421220610-i9y746q.png)​

​![image](assets/image-20240421220615-4h2ds1r.png)​

#### 允许互联网区域客户端访问AppSrv上的HTTP资源

​![image](assets/image-20240421220634-3forj12.png)​

​![image](assets/image-20240421220645-xoapm4k.png)​

​![image](assets/image-20240421220659-72cx7jq.png)​

#### 安装和配置dhcp relay

​![image](assets/image-20240421220713-iaepfcn.png)​

​![image](assets/image-20240421220721-91tz02i.png)​

​![image](assets/image-20240421220728-c3wzb75.png)![image](assets/image-20240421220735-ns4zizo.png)​

​![image](assets/image-20240421220740-lvgpcn2.png)![image](assets/image-20240421220745-cezkfcs.png)​

​![image](assets/image-20240421220749-3rlah7m.png)​

### RDS远程桌面服务

　　在AppSrv安装和配置RDS服务，用户通过

　　“https:// app. chinaski1ls. com/rdweb"进行访问;

　　该页面无证书警告;

　　用户可以获取以下应用: Notepad.

#### 安装证书服务

　　DC上配置证书模板

​![image](assets/image-20240421220948-q894vql.png)​

​![image](assets/image-20240421220953-y5qrj92.png)​

​![image](assets/image-20240421220959-tqtb4ch.png)​

​![image](assets/image-20240421221005-iyz31gm.png)​

​![image](assets/image-20240421221012-4opry3f.png)​

​![image](assets/image-20240421221027-gnpedo3.png)​

​![image](assets/image-20240421221034-4oz14ze.png)​

​![image](assets/image-20240421221040-x19dy1l.png)​

​![image](assets/image-20240421221052-1jzx0d6.png)​

#### 安装远程桌面服务

　　APPSRV

​![image](assets/image-20240421221105-5qetq17.png)​

​![image](assets/image-20240421221111-564gmtr.png)​

​![image](assets/image-20240421221115-552m8w3.png)​

​![image](assets/image-20240421221120-de4j0bd.png)​

​![image](assets/image-20240421221128-9jse6zu.png)​

​![image](assets/image-20240421221132-vdfd13v.png)​

​![image](assets/image-20240421221137-1ytawkw.png)​

​![image](assets/image-20240421221141-bonyv5n.png)​

​![image](assets/image-20240421221147-kvykltk.png)​

　　等待重启

​![image](assets/image-20240421221154-m74qx88.png)​

​![image](assets/image-20240421221218-1cest2v.png)​

​![image](assets/image-20240421221222-bx4xt3m.png)​

​![image](assets/image-20240421221226-97549x8.png)​

​![image](assets/image-20240421221230-5kctl37.png)​

​![image](assets/image-20240421221236-01par4u.png)​

​![image](assets/image-20240421221242-6j4z914.png)​

​![image](assets/image-20240421221248-ex2f9bc.png)​

​![image](assets/image-20240421221254-ly5vpkb.png)​

​![image](assets/image-20240421221259-tbtgwig.png)​

　　上面2个绑定证书步骤一样

​![image](assets/image-20240421221307-mjxysix.png)​

　　发布notepad

​![image](assets/image-20240421221316-jzzng48.png)​

​![image](assets/image-20240421221321-57k75ro.png)​

　　位置在C盘windows下面

​![image](assets/image-20240421221329-nqa5k9q.png)​

​![image](assets/image-20240421221335-qzx7yxl.png)​

#### 测试

　　去主域DC创建一条A记录

​![image](assets/image-20240421221348-bywe6la.png)​

​![image](assets/image-20240421221355-6fywd0m.png)​

　　客户端打开浏览器

　　输入https://app.chinaskills.com/rdweb

​![image](assets/image-20240421221407-qcek4d5.png)​

​![image](assets/image-20240421221412-oly8b55.png)​

​![image](assets/image-20240421221418-pyko2ly.png)​

### L2TP/IPsec VPN

　　虚拟专用网络

　　设置L2Tp/IPSe， IKE通道采用证书进行验证;

　　L2TP通道使用chinaskills. com域内用户进行身份验证，仅允许manager组内用户通过身份证验证;

　　对于VPN客户端，请使用IP范围192. 168. 1.200-192. 168.1. 220/24.

　　NPS (网络策略服务)

　　在DCServer.上安装网络策略服务作为VP用户登录验证;

　　仅允许L2TP/IPSE VPN 进行VPN连接访问验证;

#### 安装证书服务和nps配置

​![image](assets/image-20240421221523-g2oeobn.png)​

​![image](assets/image-20240421221529-gows7an.png)​

​![image](assets/image-20240421221533-jyq7olh.png)​

​![image](assets/image-20240421221541-we27l5s.png)​

​![image](assets/image-20240421221546-ifsewvi.png)​

​![image](assets/image-20240421221551-m3pp4vu.png)​

​![image](assets/image-20240421221556-hzk4qd7.png)​

​![image](assets/image-20240421221601-xvjkbfz.png)​

​![image](assets/image-20240421221608-7q5fd0y.png)​

　　NPS

​![image](assets/image-20240421221622-aysdbws.png)​

​![image](assets/image-20240421221627-y8nsig6.png)​

​![image](assets/image-20240421221634-q4q3ljo.png)​

​![image](assets/image-20240421221639-qnuztjk.png)​

​![image](assets/image-20240421221644-hdwz719.png)​

​![image](assets/image-20240421221649-xxpp4m2.png)![image](assets/image-20240421221659-6cvyu3j.png)​

​![image](assets/image-20240421221706-j10jysu.png)​

​![image](assets/image-20240421221714-g2fzsib.png)​

​![image](assets/image-20240421221722-stneko0.png)​

​![image](assets/image-20240421221726-ww98qcd.png)​

​![image](assets/image-20240421221733-ulykhxb.png)​

#### 安装路由远程访问服务和配置证书

​![image](assets/image-20240421221744-6ztkd0t.png)​

​![image](assets/image-20240421221748-a7fhcrg.png)​

​![image](assets/image-20240421221753-s53jwhk.png)​

​![image](assets/image-20240421221757-aq3xjid.png)​

​![image](assets/image-20240421221803-68hx14v.png)​

​![image](assets/image-20240421221808-hmxjeog.png)​

​![image](assets/image-20240421221813-0muxgcb.png)​

​![image](assets/image-20240421221820-858lwzq.png)​

​![image](assets/image-20240421221825-gq3jz0h.png)​

​![image](assets/image-20240421221830-gmfnkfu.png)​

​![image](assets/image-20240421221837-u3gxqdi.png)​

​![image](assets/image-20240421221846-fh34uxx.png)​

​![image](assets/image-20240421221852-tjye110.png)​

​![image](assets/image-20240421221857-3th6p0z.png)​

​![image](assets/image-20240421221902-a8my0hc.png)​

​![image](assets/image-20240421221908-199285q.png)​

​![image](assets/image-20240421221915-p7j7y6t.png)​

​![image](assets/image-20240421221920-9swnxuj.png)​

​![image](assets/image-20240421221925-2ryti5t.png)​

​![image](assets/image-20240421221930-8c6z6iu.png)​

​![image](assets/image-20240421221937-p48mmg6.png)​

​![image](assets/image-20240421221942-0uqy9oa.png)​

#### 测试

　　把证书导出到客户端

​![image](assets/image-20240421221957-n9061s2.png)​

​![image](assets/image-20240421222018-fnonv6v.png)​

​![image](assets/image-20240421222023-7wyeh4k.png)​

​![image](assets/image-20240421222031-xmkraaz.png)​

​![image](assets/image-20240421222035-5518whu.png)​

​![image](assets/image-20240421222040-41rh34g.png)​

​![image](assets/image-20240421222046-gjgroh0.png)​

　　windows + R"调出运行窗口，输入"c:\WINDOWS\system32\drivers\etc"

​![image](assets/image-20240421222102-y0mwoll.png)​

​![image](assets/image-20240421222107-pwlyztb.png)​

​![image](assets/image-20240421222111-4mavfab.png)​

​![image](assets/image-20240421222115-6qlbq8a.png)​

​![image](assets/image-20240421222123-nij3szs.png)​

​![image](assets/image-20240421222127-ynem32u.png)​

​![image](assets/image-20240421222132-udd5heg.png)​

​![image](assets/image-20240421222140-khabak9.png)​

​![image](assets/image-20240421222145-petl4jk.png)​

​![image](assets/image-20240421222149-70sn4b6.png)![image](assets/image-20240421222205-eru1hyo.png)![image](assets/image-20240421222214-s6kzhxw.png)​

​![image](assets/image-20240421222220-tdktfe4.png)​

​![image](assets/image-20240421222225-pkgmrlt.png)​

　　‍
