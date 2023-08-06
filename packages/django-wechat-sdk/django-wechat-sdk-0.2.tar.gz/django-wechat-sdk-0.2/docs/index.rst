.. django-wechat documentation master file, created by
   sphinx-quickstart on Wed Oct 23 16:34:24 2013.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to django-wechat's documentation!
==================================

微信公众号 django 开发库

`wechat-python-sdk`是一个微信sdk库，负责和微信的api通信。
但是在多进程环境中，每个进程都会维护自己的一份`Access Token`（同理`JsApi Ticket`）,
并且会导致其他进程的`Access Token`失效，所以我们需要一种持久化的方式，让多个进程统一获取和更新一份`Access Token`。

`django-wechat`通过数据库持久化解决了这个问题，并且支持同时使用多个公众号。

Quick start
-----------

1. 添加 "djwechat" 到 INSTALLED_APPS中

    INSTALLED_APPS = (
        ...
        'djwechat',
    )

2. 运行 `python manage.py migrate`，以创建 django-wechat models.

3. 在admin后台，添加对应微信号的账号认证信息 和 JsApiList

1）账号认证信息的值为：

    {
      "WEIXIN_TOKEN": "6G9IH7EF4D83C5AB",
      "WEIXIN_APP_ID": "wx67fb1f4877bfd511",
      "WEIXIN_APP_SECRET": "646332665dcd63f9e8b83a474f2dbe38",
      "WEIXIN_ENCODING_AES_KEY": "ZvhDvkQ8QpRUvNZUQgDRvrU3ICQEBVEdLvEsmsXTscA"
    }

2）已申请的JsApiList权限，以空格隔开，如下所示：

    scanQRCode getLocation getNetworkType onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo chooseWXPay

4. 在 `django` 中使用

    from djwechat.util import get_wechat
    appid = 'XXXXXXXXXXXXXXXXXX'
    wechat = get_wechat(appid)
    ....

djwechat会自动在数据库中保存和更新 access_token、jsapi_ticket, 用户只需负责调用就行。


.. toctree::
   :maxdepth: 2



Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

