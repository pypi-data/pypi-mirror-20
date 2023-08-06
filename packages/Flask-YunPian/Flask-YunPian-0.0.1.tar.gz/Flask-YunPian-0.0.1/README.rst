Flask-YunPian
=============

云片_发送短信的Flask扩展

使用
----

.. code-block::

    from flask_yunpin import YunPian

    yunpian = YunPian()
    yunpian.init_app(app)


发送短信
--------

.. code::

    yunpian.send(phones, content, sign=None)

phones可以传单个手机号或者手机号列表，分别调用单条发送接口和批量发送接口


配置项
------

======================  ====================================
YUNPIAN_APIKEY          apikey
YUNPIAN_DEFAULT_SIGN    默认签名, 例如: 招商银行， 不包含【】
======================  ====================================


.. 云片： https://www.yunpian.com/

