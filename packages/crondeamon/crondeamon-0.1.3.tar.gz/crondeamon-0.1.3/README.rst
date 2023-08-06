============
crondeamon
============
***************
1.介绍
***************
crondeamon是用来管理计划任务及后台任务的项目， 其功能相当于supervisor+crontab，  基于twisted   django 框架。通过crondeamon可以在web页面中完成计划任务或后台任务的管理。

.. image:: docs/image/main.png

***************
2.依赖
***************
python版本要求：

python>=2.6.x 

pip   svn   git


***************
3.安装
***************
本项目已提交到python官方源，可以直接通过pip或easy_install进行安装

pip install crondeamon 或 easy_install crondeamon

***************
4.配置详解
***************

配置文件：  /etc/crondeamon.ini
::

  [crondeamon]
  mysqlhost=192.168.15.34        ; mysql IP
  mysqlport=3306                 ; mysql 端口
  mysqldb=mycrondeamon           ; mysql 数据库名
  user=root                      ; mysql 用户名
  passwd=123456                  ; mysql 密码
  charset=utf8                   ; mysql 编码 ，最好设为为utf8
  host=192.168.8.137             ; 服务绑定的IP
  datadir=/data/test/crondeamon  ; 服务data目录
  slaveport=8023                 ; 服务中slave模块绑定端口
  uiport=8024                    ; 服务中ui模块绑定端口, 安装完成后可通过192.168.8.137:8024打开web管理页面

注： web管理页面的默认账户是root，密码123456

***************
5.运行和停止
***************

运行：python -m crondeamon.sbin.main -c start

停止：python -m crondeamon.sbin.main -c stop

重启：python -m crondeamon.sbin.main -c restart

***************
6.例子
***************

以192.168.8.137机器为例：
 ::

  [root@bogon ~]# pip install crondeamon
  DEPRECATION: Python 2.6 is no longer supported by the Python core team, please upgrade your Python. A future version of pip will drop support for Python 2.6
  Collecting crondeamon
  Installing collected packages: crondeamon
  Running setup.py install for crondeamon ... done
  Successfully installed crondeamon-0.1.2

  [root@bogon ~]# vim /etc/crondeamon.ini
  [crondeamon]
  mysqlhost=192.168.15.34
  mysqlport=3306
  mysqldb=mycrondeamon
  user=root
  passwd=123456
  charset=utf8
  host=192.168.8.137
  datadir=/data/test/crondeamon
  slaveport=8023
  uiport=8024

  [root@bogon ~]# python -m crondeamon.sbin.main -c start
  start success!
安装成功，打开http://192.168.8.137:8024

.. image:: docs/image/ex1.png
用默认账号密码 root    123456 进行登陆，并新建一个计划任务

.. image:: docs/image/ex2.png

创建完成

.. image:: docs/image/ex3.png