---
title: 安全FTP服务vsftpd指南
description: 详细介绍vsftpd的三种认证模式(匿名/本地/虚拟用户)及其安全配置方法
tags: [vsftpd, FTP服务, Linux安全, 文件传输, 服务器配置]
date: 2024-05-18T23:01:46Z
lastmod: 2024-05-18T23:08:54Z
---

# vsftpd

### ftp 简介

　　一般来讲，人们将计算机联网的首要目的就是获取资料，而文件传输是一种非常重要的获取资料的方式。

　　FTP是一种在互联网中进行文件传输的协议，基于客户端/服务器模式，默认使用20、21号端口，其中端口20用于进行数据传输，端口21用于接受客户端发出的相关FTP命令与参数。

　　FTP服务器普遍部署于内网中，具有容易搭建、方便管理的特点，有些FTP客户端工具还可以支持文件的多点下载以及断点续传技术。

　　FTP服务器是按照FTP协议在互联网上提供文件存储和访问服务的主机，FTP客户端则是向服务器发送连接请求，以建立数据传输链路的主机。FTP协议有下面两种工作模式：

> **主动模式**：FTP服务器主动向客户端发起连接请求；
>
> **被动模式**：FTP服务器等待客户端发起连接请求（默认工作模式）；

　　由于FTP、HTTP、Telnet等协议的数据都是使用明文进行传输的，因此从设计上就是不可靠的。

　　为了满足以密文方式传输文件的需求，发明了vsftpd服务程序。

　　vsftpd（very secure ftp daemon，非常安全的FTP守护进程）是一款运行在Linux操作系统上的FTP服务程序，不仅完全开源而且免费。此外，它还具有很高的安全性、传输速度，以及支持虚拟用户验证等其他FTP服务程序不具备的特点。在不影响使用的前提下，管理者可以自行决定客户端是采用匿名开放、本地用户还是虚拟用户的验证方式来登录vsftpd服务器。这样即便黑客拿到了虚拟用户的账号密码，也不见得能成功登录vsftpd服务

### vsftpd 简介

　　vsftpd 的全称是 `Very Secure FTP Daemon`​ 的意思；换句话说，vsftpd 最初发展的理念就是在建构一个以安全为重的 FTP 服务器。

　　vsftpd 是为了建构一个安全为主的 FTP 服务器， vsftpd 针对操作系统的 `程序的权限 (privilege)`​ 概念来设计；

　　vsftpd 也支持 chroot 功能，chroot 顾名思义就是 `change root directory`​ 的意思，root 指的是根目录而非系统管理员；chroot可以将用户的某个特定的目录变成根目录（家目录），所以与该目录没有关系的其他目录就不会被访问了；

　　vsftpd 这个服务的启动者身份为一般用户，所以对于 Linux 系统的权限较低，对于 Linux 系统的危害就相对的减低了；

　　绝大部分 ftp 会使用到的额外指令功能 (dir, ls, cd ...) 都已经被整合到 vsftpd 主程序当中了，因此理论上 vsftpd 不需要使用到额外的系统提供的指令，所以在 chroot 的情况下，vsftpd 不但可以顺利运作，且不需要额外功能对于系统来说也比较安全；

　　**vsftpd作为更加安全的文件传输协议服务程序，允许用户以3种认证模式登录FTP服务器**。

* ​`匿名开放模式`​：是最不安全的一种认证模式，任何人都可以无须密码验证而直接登录到FTP服务器。
* ​`本地用户模式`​：是通过Linux系统本地的账户密码信息进行认证的模式，相较于匿名开放模式更安全，而且配置起来也很简单。但是如果黑客破解了账户的信息，就可以畅通无阻地登录FTP服务器，从而完全控制整台服务器。
* ​`虚拟用户模式`​：更安全的一种认证模式，它需要为FTP服务单独建立用户数据库文件，虚拟出用来进行密码验证的账户信息，而这些账户信息在服务器系统中实际上是不存在的，仅供FTP服务程序进行认证使用。这样，即使黑客破解了账户信息也无法登录服务器，从而有效降低了破坏范围和影响。

### vsftpd 安装&卸载

```shell
# 查看 vsftpd 是否已经安装
$ rpm -qa|grep vsftpd

# 通过 yum 安装 vsftpd
$ yum install vsftpd -y

# 查看 vsftpd 信息
$ rpm -qa|grep vsftpd
vsftpd-3.0.2-29.el7_9.x86_64

# 通过 rpm -e 卸载 vsftpd
$ rpm -e vsftpd-3.0.2-29.el7_9.x86_64
# 出现以下消息 则手动删除 vsftpd 配置信息
warning: /etc/vsftpd/vsftpd.conf saved as /etc/vsftpd/vsftpd.conf.rpmsave
warning: /etc/vsftpd/user_list saved as /etc/vsftpd/user_list.rpmsave
warning: /etc/vsftpd/ftpusers saved as /etc/vsftpd/ftpusers.rpmsave

# 删除 vsftpd 配置文件
$ rm -rf /etc/vsftpd
```

　　‍

　　‍

　　‍

　　‍

　　‍

　　‍

　　‍

　　‍

## 配置详解

### vsftpd 文件说明

```shell
# vsftpd 配置文件
- /etc/vsftpd/vsftpd.conf
- /etc/pam.d/vsftpd
- /etc/vsftpd/ftpusers
- /etc/vsftpd/user_list
- /etc/vsftpd/chroot_list
- /usr/sbin/vsftpd
- /var/ftp/

# vsftpd 文件作用说明
- vsftpd.conf: 核心配置文件, 由此文件衍生出其它配置文件;
- pam.d/vsftpd: 是 vsftpd 使用 PAM 模块时的相关配置文件;
- ftpusers: 是 PAM 模块 (/etc/pam.d/vsftpd) 所指定的那个无法登入的用户配置文件;
- user_list: 是 vsftpd 自定义的抵挡项目;
- chroot_list: 主要功能是可以将某些账号的使用者 chroot 在制定目录下;
- /sbin/vsftpd: vsftpd 的主要执行档;
- /var/ftp/: vsftpd 的预设匿名者登入的根目录;
```

### [vsftpd.conf配置文件](https://www.cnblogs.com/LiuChang-blog/p/10491519.html "发布于 2019-03-07 18:43")

　　/etc/vsftpd/vsftpd.conf 本身就是一个挺详细的配置文件，且使用『 man 5 vsftpd.conf 』则可以得到完整的参数说明；这里依旧先对 vsftpd.conf 内的常用参数作说明。

* 与服务器环境较相关的设定值

|参数设定值|默认值|作用|
| ----------------------------------| ----------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------|
|connect_from_port_20=YES|NO|YES|
|listen_port=21|21|设置FTP服务器建立连接所监听的端口|
|dirmessage_enable=YES|NO|YES|
|message_file=.message|.message|设置目录消息文件，可将要显示的信息写入该文件。默认值为.message|
|listen=YES|NO|YES|
|pasv_enable=YES|NO|YES|
|use_localtime=YES|NO|NO|
|write_enable=YES|NO|YES|
|connect_timeout=60|60|PORT 方式下建立数据连接的超时时间，单位为秒|
|accept_timeout=60|60|建立FTP连接的超时时间，单位为秒|
|data_connection_timeout=120|300|建立FTP数据连接的超时时间，单位为秒|
|idle_session_timeout=300|300|多长时间不对FTP服务器进行任何操作，则断开该FTP连接，单位为秒|
|max_clients=0|0|vsftpd允许的最大连接数，默认值为0，表示不受限制|
|max_per_ip=0|0|设置每个IP允许与FTP服务器同时建立连接的数目，默认值为0，表示不受限制|
|pasv_min_port=0, pasv_max_port=0|pasv_min_port:0<br />pasv_max_port:0|在PASV工作模式下，数据连接可以使用的端口范围的最小端口，0 表示任意端口；<br />在PASV工作模式下，数据连接可以使用的端口范围的最大端口，0 表示任意端口；|
|ftpd_banner=文字说明|NULL|用来定义欢迎话语的字符串，而ftpd_banner 则是字符串的形式|
|banner_file=/path/file|NULL|用来定义欢迎话语的字符串，banner_file是档案的形式|

* 与实体用户较相关的设定值

|参数设定值|默认值|作用|
| ------------------------------------------| --------| ------------------------------------------------------------------------|
|guest_enable=YES|NO|NO|
|guest_username=ftp|ftp|用来映射虚拟用户|
|local_enable=YES|NO|YES|
|local_max_rate=0|0|本地用户使用的最大传输速度，单位为B/s，0 表示不限制速度|
|chroot_local_user=YES|NO|NO|
|chroot_list_enable=YES|NO|NO|
|chroot_list_file=/etc/vsftpd.chroot_list||用于指定用户列表文件, 该文件用于控制用户可以切换到用户家目录的上级目录|
|userlist_enable=YES|NO|NO|
|userlist_deny=YES|NO|YES|
|userlist_file=/etc/vsftpd/user_list|NO|控制用户访问FTP的文件，里面写着用户名称。一个用户名称一行|

* 与匿名用户登录相关的设定值

|参数设定值|默认值|作用|
| ---------------------------------------------| ---------------------------| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|anonymous_enable=YES|NO|YES|
|anon_world_readable_only=YES|NO|YES|
|anon_other_write_enable=YES|NO|NO|
|anon_mkdir_write_enable=YES|NO|NO|
|anon_upload_enable=YES|NO|NO|
|deny_email_enable=YES|NO|NO|
|banned_email_file=/etc/vsftpd/banned_emails|/etc/vsftpd.banned_emails|用来输入email address，只有在deny_email_enable=YES时，才会使用到此文件；<br />若是使用匿名登入，则会要求输入email address，若输入的email address 在此档案内，则不允许进入；|
|no_anon_password=YES|NO|NO|
|anon_max_rate=0|0|设置匿名登入者使用的最大传输速度，单位为B/s，0 表示不限制速度|
|anon_umask=077|077|设置匿名登入者新增或上传档案时的umask 值|

* 与 vsftpd 系统安全相关的设定值

|参数设定值|默认值|作用|
| -------------------------------| -----------------------------------------| ----------------------------------------------------------------------------|
|ascii_download_enable=YES|NO|NO|
|ascii_upload_enable=YES|NO|NO|
|one_process_model=YES|NO|YES|
|tcp_wrappers=YES|NO|YES|
|xferlog_enable=YES|NO|YES|
|xferlog_file=/var/log/xferlog|/var/log/vsftpd.log|设置日志文件名和路径|
|xferlog_std_format=YES|NO|NO|
|dual_log_enable=YES|NO, vsftpd_log_file=/var/log/vsftpd.log|/var/log/vsftpd.log|
|nopriv_user=nobody||vsftpd在完全没有特权的情况下使用的用户名；<br />这应该是专用用户，而不是任何人|
|pam_service_name=vsftpd|/etc/pam.d/vsftpd|设置PAM使用的名称|

　　上面这些是常见的 vsftpd 的设定参数，还有很多参数没有列出来，可以使用 `man 5 vsftpd.conf`​ 查阅。

### vsftpd 认证模式

　　vsftpd作为更加安全的文件传输协议服务程序，允许用户以3种认证模式登录FTP服务器。

　　​`匿名开放模式`​：是最不安全的一种认证模式，任何人都可以无须密码验证而直接登录到FTP服务器。

　　​`本地用户模式`​：是通过Linux系统本地的账户密码信息进行认证的模式，相较于匿名开放模式更安全，而且配置起来也很简单。但是如果黑客破解了账户的信息，就可以畅通无阻地登录FTP服务器，从而完全控制整台服务器。

　　​`虚拟用户模式`​：更安全的一种认证模式，它需要为FTP服务单独建立用户数据库文件，虚拟出用来进行密码验证的账户信息，而这些账户信息在服务器系统中实际上是不存在的，仅供FTP服务程序进行认证使用。这样，即使黑客破解了账户信息也无法登录服务器，从而有效降低了破坏范围和影响。

　　匿名开放、本地用户、虚拟用户模式，具体使用哪一种模式直接到以下对应的过程部分配置即可；

|文件路径|作用|
| -------------------------| ------------------------------------------------------------------------------|
|/etc/vsftpd/vsftpd.conf|vsftpd的核心配置文件；|
|/etc/vsftpd/ftpusers|黑名单文件，此文件中的用户不允许访问FTP服务器；|
|/etc/vsftpd/user_list|是黑、白名单文件，具体作为黑名单文件还是白名单文件由 `vsftpd.conf`​ 中 `userlist_enable、serlist_deny`​ 两个参数决定。|

#### 匿名开放模式

　　vsftpd服务程序默认关闭了匿名开放模式，匿名开放模式常用的权限参数以及作用如下所示：

|参数设定值|作用|
| ------------------------------| ----------------------------------------------|
|anonymous_enable=YES|允许匿名访问模式|
|anon_umask=022|匿名用户上传文件的umask值|
|anon_upload_enable=YES|允许匿名用户上传文件|
|anon_mkdir_write_enable=YES|允许匿名用户创建目录|
|anon_other_write_enable=YES|允许匿名用户修改目录名称或删除目录|
|anon_world_readable_only=YES|文件的其他人必须有读的权限才允许下载|
|anon_root=/var/ftp|匿名用户的FTP根目录|
|anon_max_rate=0|匿名用户的最大传输速率（字节/秒），0为不限制|

* 备份 `vsftp.conf`​ 文件

```sh
$ mv /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf_bak
$ grep -v "#" /etc/vsftpd/vsftpd.conf_bak > /etc/vsftpd/vsftpd.conf
$ cat /etc/vsftpd/vsftpd.conf
```

* 配置 `vsftpd.conf`​ 文件

```sh
$ vi vsftpd.conf
# 与匿名者有关的信息
## 支持匿名者的登入使用 FTP 功能
anonymous_enable=YES

# 与实体用户有关的设定
## 支持本地端的实体用户登入
local_enable=YES
## 允许用户上传数据 (包括文件与目录)
write_enable=YES
## 建立新目录 (755) 与文件 (644) 的权限
local_umask=022

# 与服务器环境有关的设定
## 若目录下有 .message 则会显示该文件的内容
dirmessage_enable=YES
## 启动登录文件记录，记录于 /var/log/xferlog
xferlog_enable=YES
## 支持主动式联机功能
connect_from_port_20=YES
## 支持 WuFTP 的登录档格式
xferlog_std_format=YES
## 使用 stand alone 方式启动 vsftpd
listen=YES
## 支持 PAM 模块的管理
pam_service_name=vsftpd
## 支持 /etc/vsftpd/user_list 档案内的账号登入管控
userlist_enable=YES
## 支持 TCP Wrappers 的防火墙机制
tcp_wrappers=YES
```

> 通过以上各项配置，该 vsftpd 可以达到的功能如下：
>
> * 可以使用 anonymous 这个匿名账号或其他实体账号 (/etc/passwd) 登入；
> * anonymous 的家目录在 /var/ftp ，且无上传权限，亦已经被 chroot 了；
> * 实体用户的家目录参考 /etc/passwd，并没有被 chroot，可前往任何有权限可进入的目录中；
> * 任何于 /etc/vsftpd/ftpusers 内存在的账号均无法使用 vsftpd (PAM)；
> * 可利用 /etc/hosts.{allow|deny} 来作为基础防火墙；
> * 当客户端有任何上传/下载信息时，该信息会被纪录到 /var/log/xferlog 中；
> * 主动式联机的埠口为 port 20；
> * 使用格林威治时间 (GMT)。

#### 本地用户模式

　　Linux系统本地的账户密码信息进行认证的模式，相较于匿名开放模式更安全，而且配置起来也很简单；本地用户模式常用的权限参数以及作用如下所示：

|参数设定值|作用|
| -----------------------| -----------------------------------------------------|
|local_enable=YES|允许本地用户登录FTP|
|local_umask=022|本地用户上传文件的umask值|
|local_root=/var/ftp|本地用户的FTP根目录|
|local_max_rate=0|本地用户最大传输速率（字节/秒），0为不限制|
|write_enable=YES|设置可写权限|
|chroot_local_user=YES|将用户权限禁锢在FTP目录，以确保安全|
|userlist_deny=YES|启用“禁止用户名单”，名单文件为ftpusers和user_list|
|userlist_enable=YES|开启作用名单user_list文件功能|

* 备份vsftp配置文件

```sh
$ mv /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf_bak
$ grep -v "#" /etc/vsftpd/vsftpd.conf_bak > /etc/vsftpd/vsftpd.conf
$ cat /etc/vsftpd/vsftpd.conf
```

* 设置SELinux域允许策略

```sh
$ getsebool -a | grep ftp
ftpd_anon_write --> off
ftpd_connect_all_unreserved --> off
ftpd_connect_db --> off
ftpd_full_access --> off
ftpd_use_cifs --> off
ftpd_use_fusefs --> off
ftpd_use_nfs --> off
ftpd_use_passive_mode --> off
httpd_can_connect_ftp --> off
httpd_enable_ftp_server --> off
tftp_anon_write --> off
tftp_home_dir --> off
# 使vsftpd 具有访问ftp根目录,以及文件传输等权限
$ setsebool -P ftpd_full_access=on
```

* 创建 `banner.txt`​ 文件&配置 `vsftpd.conf`​ 文件

```sh
$ touch banner.txt

$ vi vsftpd.conf
# 与匿名者有关的信息
## 取消匿名者的登入功能
anonymous_enable=NO

# 与实体用户有关的设定
## 支持本地端的实体用户登入
local_enable=YES
## 允许用户上传数据 (包括文件与目录)
write_enable=YES
## 建立新目录 (755) 与文件 (644) 的权限
local_umask=022
userlist_enable=YES
userlist_deny=YES
## 该文件必须存在 vsftpd 默认就存在该文件
userlist_file=/etc/vsftpd/user_list

# 与服务器环境有关的设定
## 使用服务器本地时间
use_localtime=YES
## 若目录下有 .message 则会显示该文件的内容
dirmessage_enable=YES
## 启动登录文件记录，记录于 /var/log/xferlog
xferlog_enable=YES
## 支持主动式联机功能
connect_from_port_20=YES
## 支持 WuFTP 的登录档格式
xferlog_std_format=YES
## 使用 stand alone 方式启动 vsftpd
listen=YES
## 支持 PAM 模块的管理
pam_service_name=vsftpd
## 支持 TCP Wrappers 的防火墙机制
tcp_wrappers=YES
## ftp登录界面的 banner 标识 该文件需存在,否则会出错
banner_file=/etc/vsftpd/banner.txt
```

> 通过以上各项配置，该 vsftpd 可以达到的功能如下：
>
> * 希望使用本地时间取代 GMT 时间；
> * 用户登入时显示一些欢迎讯息的信息；
> * 系统账号不可登入主机 (亦即 UID 小于 500 以下的账号)；
> * 一般实体用户可以进行上传、下载、建立目录及修改档案等动作；
> * 用户新增的档案、目录之 umask 希望设定为 002；
> * 存在 user_list 和 ftpusers 文件中的用户 `不可登录`​ FTP；
> * 其他主机设定值保留默认值即可。

* 在以上基础再建立限制系统账号登入

> 针对系统账号来给予阻拦的机制，其实有两个文件；一个是 PAM 模块，另一个是 vsftpd 主动提供的， 在预设的情况下这两个文件分别是：
>
> * /etc/vsftpd/ftpusers: 是 /etc/pam.d/vsftpd 这个文件的参数设置所影响；
> * /etc/vsftpd/user_list: 由 vsftpd.conf 的 userlist_file 所设置；

```sh
$ vi /etc/vsftpd/user_list
root
......

$ ftp 192.168.188.68
Trying 192.168.188.68...
Connected to localhost (192.168.188.68).
hosystem FTP-banner test;
220
Name (localhost:root): student
331 Please specify the password.
Password:  <==输入密码啰在这里！
500 OOPS: cannot change directory:/home/student  # 出现该错误到问题汇总中寻找答案
Login failed.
ftp> bye
221 Goodbye.
```

#### 虚拟用户模式

　　虚拟用户模式是这3种模式中最安全的一种认证模式，是专门创建出一个账号来登录FTP传输服务的，而且这个账号不能用于以SSH方式登录服务器；

|参数设定值|作用|
| ----------------------------| -------------------------------------------------------------|
|anonymous_enable=NO|禁止匿名开放模式|
|local_enable=YES|允许本地用户模式|
|guest_enable=YES|开启虚拟用户模式|
|guest_username=virtual|指定虚拟用户账户|
|pam_service_name=vsftpd.vu|指定PAM文件|
|allow_writeable_chroot=YES|允许对禁锢的FTP根目录执行写入操作，而且不拒绝用户的登录请求|

* 备份vsftp配置文件

```sh
$ mv /etc/vsftpd/vsftpd.conf /etc/vsftpd/vsftpd.conf_bak
$ grep -v "#" /etc/vsftpd/vsftpd.conf_bak > /etc/vsftpd/vsftpd.conf
$ cat /etc/vsftpd/vsftpd.conf
```

* 创建用于进行FTP认证的用户数据库文件

```sh
# 创建用于进行FTP认证的用户数据库文件
# 奇数行为账户名, 偶数行为密码
# 该用户不需要
$ vi /etc/vsftpd/vuser.list
ftpuser
ftpuser123.
test
test
```

* 原始的明文信息文件转换成数据库文件

　　由于明文信息既不安全，也不符合让vsftpd服务程序直接加载的格式，因此需要使用db_load命令用哈希（hash）算法将原始的明文信息文件转换成数据库文件，并且降低数据库文件的权限（避免其他人看到数据库文件的内容），然后再把原始的明文信息文件删除。

```sh
# 明文转密文
$ db_load -T -t hash -f /etc/vsftpd/vuser.list /etc/vsftpd/vuser.db

# 赋予密文文件权限
$ chmod 600 vuser.db

# 删除明文文件 不强制要求,但推荐删除
$ rm -rf vuser.list
```

* 创建vsftpd服务程序用于存储文件的根目录以及用于虚拟用户映射的系统本地用户

> vsftpd服务用于存储文件的根目录指的是，当虚拟用户登录后所访问的默认位置；
>
> 由于Linux系统中的每一个文件都有所有者、所属组属性，例如使用虚拟账户“张三”新建了一个文件，但是系统中找不到账户“张三”，就会导致这个文件的权限出现错误；为此，让虚拟用户默认登录到与之有映射关系的这个系统本地用户的家目录中；
>
> 虚拟用户创建的文件的属性也都归属于这个系统本地用户，从而避免Linux系统无法处理虚拟用户所创建文件的属性权限
>
> 创建vsftpd服务程序用于存储文件的根目录以及用于虚拟用户映射的系统本地用户；
>
> 把这个系统本地用户的家目录设置为/var目录（该目录用来存放经常发生改变的数据）；并且为了安全起见，将这个系统本地用户设置为不允许登录FTP服务器，这不会影响虚拟用户登录，而且还能够避免黑客通过这个系统本地用户进行登录；

```sh
# -s /sbin/nologin: 表示virtual禁止通过ssh登录
$ useradd -d /var/ftproot -s /sbin/nologin virtual
$ ls -ld /var/ftproot/
$ chmod -Rf 755 /var/ftproot/
```

* 建立用于支持虚拟用户的PAM文件

　　新建一个用于虚拟用户认证的PAM文件vsftpd.vu，其中PAM文件内的“db=”参数为使用db_load命令生成的账户密码数据库文件的路径，但不用写数据库文件的后缀。

```sh
$ vi /etc/pam.d/vsftpd.vu
auth       required     pam_userdb.so db=/etc/vsftpd/vuser
account    required     pam_userdb.so db=/etc/vsftpd/vuser
```

* 在vsftpd服务程序的主配置文件中通过pam_service_name参数将PAM认证文件的名称修改为vsftpd.vu

> 配置文件 `vsftpd.conf`​ 中默认就带有参数pam_service_name=vsftpd，表示登录FTP服务器时是根据/etc/pam.d/vsftpd文件进行安全认证的；

```sh
$ vi /etc/vsftpd/vsftpd.conf
# 重要!!!!!!
## 禁止匿名开放模式
anonymous_enable=NO
## 允许本地用户模式
local_enable=YES
## 设置可写权限
write_enable=YES
## 开启虚拟用户模式
guest_enable=YES
## 指定虚拟用户账户
guest_username=virtual
## 允许对禁锢的FTP根目录执行写入操作，而且不拒绝用户的登录请求
allow_writeable_chroot=YES
## 指定PAM文件
pam_service_name=vsftpd.vu

# 本地用户模式创建文件的umask值
local_umask=022
dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
xferlog_std_format=YES
listen=YES
listen_ipv6=NO
userlist_enable=YES

# user_config_dir参数来定义这两个虚拟用户不同权限的配置文件所存放的路径
user_config_dir=/etc/vsftpd/vusers_dir
```

* 为虚拟用户设置不同的权限

> 创建 `ftpuser`​ 和 `test`​ 两个账户；
>
> * ftpuser权限：上传、创建、修改、查看、删除文件；
> * test权限：只允许查看文件；

```sh
# 创建 vusers_dir 目录
$ mkdir /etc/vsftpd/vusers_dir/

# 创建 ftpuser 用户
$ vi /etc/vsftpd/vusers_dir/ftpuser
anon_upload_enable=YES
anon_mkdir_write_enable=YES
anon_other_write_enable=YES

# 创建 test 用户
$ touch /etc/vsftpd/vusers_dir/test
```

* 设置SELinux域允许策略，然后使用虚拟用户模式登录FTP服务器

```sh
$ getsebool -a | grep ftp
ftpd_anon_write --> off
ftpd_connect_all_unreserved --> off
ftpd_connect_db --> off
ftpd_full_access --> off
ftpd_use_cifs --> off
ftpd_use_fusefs --> off
ftpd_use_nfs --> off
ftpd_use_passive_mode --> off
httpd_can_connect_ftp --> off
httpd_enable_ftp_server --> off
tftp_anon_write --> off
tftp_home_dir --> off

# 使vsftpd 具有访问ftp根目录,以及文件传输等权限
$ setsebool -P ftpd_full_access=on
```

* 登录

```sh
$ ftp ip
连接到 192.168.188.68。
220 (vsFTPd 3.0.2)
200 Always in UTF8 mode.
用户(192.168.188.118:(none)): test
331 Please specify the password.
密码: test
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> 
```

### vsftpd 配置模板

#### vsftpd 基础模板

　　该配置模板，可实现 vsftpd 以下功能：

```markdown
- 可以使用 anonymous 这个匿名账号或其他实体账号 (/etc/passwd) 登入;
- anonymous 的家目录在 /var/ftp ，且无上传权限，亦已经被 chroot 了;
- 实体用户的家目录参考 /etc/passwd，并没有被 chroot，可前往任何有权限可进入的目录中;
- 任何于 /etc/vsftpd/ftpusers 内存在的账号均无法使用 vsftpd (PAM);
- 可利用 /etc/hosts.{allow|deny} 来作为基础防火墙;
- 当客户端有任何上传/下载信息时，该信息会被纪录到 /var/log/xferlog 中;
- 主动式联机的埠口为 port 20;
- 使用格林威治时间 (GMT)。
```

　　配置 `vsftpd.conf`​ 文件

```markdown
# 与匿名者有关的信息
anonymous_enable=YES

# 与实体用户有关的设定
local_enable=YES
write_enable=YES
local_umask=022

# 与服务器环境有关的设定
dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
xferlog_std_format=YES
listen=YES
pam_service_name=vsftpd
userlist_enable=YES
tcp_wrappers=YES
```

#### vsftpd 实体限制模板

　　该配置模板，可实现 vsftpd 以下功能：

```markdown
- 希望使用本地时间取代 GMT 时间；
- 用户登入时显示一些欢迎讯息的信息；
- 系统账号不可登入主机 (亦即 UID 小于 500 以下的账号)；
- 一般实体用户可以进行上传、下载、建立目录及修改档案等动作；
- 用户新增的档案、目录之 umask 希望设定为 002；
- 存在 user_list 和 ftpusers 文件中的用户 `不可登录` FTP；
- 其他主机设定值保留默认值即可。
```

　　配置 `vsftpd.conf`​ 文件

```markdown
# 与匿名者有关的信息
## 取消匿名者的登入功能
anonymous_enable=NO

# 与实体用户有关的设定
## 支持本地端的实体用户登入
local_enable=YES
## 允许用户上传数据 (包括文件与目录)
write_enable=YES
## 建立新目录 (755) 与文件 (644) 的权限
local_umask=022
userlist_enable=YES
userlist_deny=YES
## 该文件必须存在 vsftpd 默认就存在该文件
userlist_file=/etc/vsftpd/user_list

# 与服务器环境有关的设定
## 使用服务器本地时间
use_localtime=YES
## 若目录下有 .message 则会显示该文件的内容
dirmessage_enable=YES
## 启动登录文件记录，记录于 /var/log/xferlog
xferlog_enable=YES
## 支持主动式联机功能
connect_from_port_20=YES
## 支持 WuFTP 的登录档格式
xferlog_std_format=YES
## 使用 stand alone 方式启动 vsftpd
listen=YES
## 支持 PAM 模块的管理
pam_service_name=vsftpd
## 支持 TCP Wrappers 的防火墙机制
tcp_wrappers=YES
```

#### vsftpd 仅匿名登录相关设定

　　该配置模板，可实现 vsftpd 以下功能：

```markdown
- 使用本地的时间, 而非 GMT 时间;
- 提供欢迎讯息, 说明可提供下载的信息;
- 仅开放 anonymous 的登入, 且不需要输入密码;
- 文件传输的速限为 1 Mbytes/second;
- 数据连接的过程 (不是命令通道！) 只要超过 60 秒没有响应, 就强制 Client 断线！
- 只要 anonymous 超过十分钟没有动作, 就予以断线;
- 最大同时上线人数限制为 50 人, 且同一 IP 来源最大联机数量为 5 人;
- 预设的 FTP 匿名者的根目录所在: ftp 账号的家目录。
```

　　配置 `vsftpd.conf`​ 文件

```markdown
# 与匿名者有关的信息
## 支持匿名者的登入使用 FTP 功能
anonymous_enable=YES

# 与实体用户有关的设定
## 支持本地端的实体用户登入
local_enable=YES
## 允许用户上传数据 (包括文件与目录)
write_enable=YES
## 建立新目录 (755) 与文件 (644) 的权限
local_umask=022

# 与服务器环境有关的设定
## 若目录下有 .message 则会显示该文件的内容
dirmessage_enable=YES
## 启动登录文件记录，记录于 /var/log/xferlog
xferlog_enable=YES
## 支持主动式联机功能
connect_from_port_20=YES
## 支持 WuFTP 的登录档格式
xferlog_std_format=YES
## 使用 stand alone 方式启动 vsftpd
listen=YES
## 支持 PAM 模块的管理
pam_service_name=vsftpd
## 支持 /etc/vsftpd/user_list 档案内的账号登入管控
userlist_enable=YES
## 支持 TCP Wrappers 的防火墙机制
tcp_wrappers=YES
```

## 问题汇总

### 问题一：

　　**问题描述：**

　　vsftpd搭建完成后，通过cmd可以连接；通过xftp软件连接就出现`无法显示远程文件夹`​。

　　**问题原因：**

　　FTP协议有两种工作模式，一种是`主动模式`​、另外一种是`被动模式`​。搭建过程中，工作模式和xftp连接模式不一致导致。

　　**问题解决：**

* 方式一：

```markdown
将配置改成相反模式;如，主动模式就改为被动模式;被动模式就改为主动模式 
```

* 方式二：

```sh
再xftp属性中选项，将连接的方式勾选项去掉
```

### 问题二：

　　**问题描述：**

　　在 `vsftpd.conf`​ 配置完成后，通过 `systemctl start vsftpd`​ 启动 vsftpd 服务，出现以下错误信息：

```sh
Job for vsftpd.service failed because the control process exited with error code. See "systemctl status vsftpd.service" and "journalctl -xe" for details.
```

　　通过 `systemctl status vsftpd`​ 查看错误信息：

```sh
$ systemctl status vsftpd
● vsftpd.service - Vsftpd ftp daemon
   Loaded: loaded (/usr/lib/systemd/system/vsftpd.service; disabled; vendor preset: disabled)
   Active: failed (Result: exit-code) since Wed 2022-08-24 23:35:16 CST; 20s ago
  Process: 21696 ExecStart=/usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf (code=exited, status=1/FAILURE)

Aug 24 23:35:13 node1.hos.cn systemd[1]: Starting Vsftpd ftp daemon...
Aug 24 23:35:16 node1.hos.cn systemd[1]: vsftpd.service: control process exited, code=exited status=1
Aug 24 23:35:16 node1.hos.cn systemd[1]: Failed to start Vsftpd ftp daemon.
Aug 24 23:35:16 node1.hos.cn systemd[1]: Unit vsftpd.service entered failed state.
Aug 24 23:35:16 node1.hos.cn systemd[1]: vsftpd.service failed.
```

　　**问题原因：**

　　通过 `netstat -natp|grep 21`​ 检查端口情况，发现端口可能被占用了；

　　**问题解决：**

　　通过 `netstat -natp|grep 21`​ 查询进程pid，通过 `kill -9 pid`​ 进行关闭；

```sh
$ netstat -natp|grep 21
tcp6       0      0 :::21                   :::*                    LISTEN      21158/vsftpd

$ kill -9 21158
```

### 问题三：

　　**问题描述：**

　　vsftpd搭建完成后，通过ftp连接；发现上传文件的时间都会比本地时间慢八个小时。

　　**问题原因：**

　　在 `vsftpd.conf`​ 文件中，没有配置使用本地时间；`vsftpd.conf`​ 默认使用格林威治时间（GMT）。

　　**问题解决：**

　　在 `vsftpd.conf`​文件中，加入参数 `use_localtime=YES`​ 使用本地时间即可；

```sh
$ vi /etc/vsftpd/vsftpd.conf
......
use_localtime=YES

$ systemctl restart vsftpd
```

### 问题四：

　　**问题描述：**

　　在 vsftpd 搭建完成后，通过ftp命令方式连接；发现ftp连接失败，且出现以下错误信息：

```sh
$ ftp 192.168.188.68
连接到 192.168.188.68。
500 OOPS: cannot read banner file:/etc/vsftpd/welcome.txt
远程主机关闭连接。
```

　　**问题原因：**

　　在配置 `vsftpd.conf`​ 时，使用了 `banner_file=/etc/vsftpd/banner.txt`​ 参数，但是 `banner.txt`​ 文件并不存在；导致通过命令方式连接ftp时出现错误；

　　**问题解决：**

　　在 `banner_file=/etc/vsftpd/banner.txt`​ 指定路径下创建 `banner.txt`​ 并重启 vsftpd 服务；

```sh
$ vi /etc/vsftpd/banner.txt
hosystem FTP-banner test;

$ systemctl restart vsftpd

$ ftp 192.168.188.68
连接到 192.168.188.68;
220-hosystem FTP-banner test;
220
200 Always in UTF8 mode.
```

### 问题五：

　　**问题描述：**

　　在 `vsftpd.conf`​ 配置中，使用本地用户模式；发现登录FTP时，出现以下错误信息：

```sh
Connected to 192.168.188.68 (192.168.188.68).
220 (vsFTPd 3.0.2)
Name (192.168.188.68:root): root
530 Permission denied.
Login failed.
ftp> 
```

　　**问题原因：**

* 原因一：user_list 和 ftpuser 共同作用限制了登录账户；
* 原因二：登录FTP账户的 shell 被定向为/sbin/nologin

```sh
$ cat /etc/passwd
test:x:1003:1003::/var/ftproot/:/sbin/nologin
```

　　**问题解决：**

* 方法一：添加 `/sbin/nologin`​ 到 `/etc/shells`​ 文件中

```sh
$ echo "/sbin/nologin" >> /etc/shells
```

* 方法二：修改 `/etc/pam.d/vsftpd`​ 文件

```sh
$ vi /etc/pam.d/vsftpd
...
# 方式一: 将 auth required pam_shells.so 注释掉
#auth required pam_shells.so

# 方式二: 将 auth required pam_shells.so 修改为 auth required pam_nologin.so
auth required pam_nologin.so
...
```
