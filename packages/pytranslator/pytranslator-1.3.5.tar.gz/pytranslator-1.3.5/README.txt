项目名称 : 
```
pytranslator
```
示例 :
```
import pytranslator

youdao = pytranslator.youdao("YOUR_KEY","YOU_KEY_FROM")
youdao.trans("Help")
```
更新日志 : 
```
==============
时间 : 2017/02/20
作者 : 王一航
描述 : 开源到 pypi
版本 : 1.3.5
==============
```
原理说明 : 
```
利用有道翻译开放API进行中英互译
将有道服务器返回的 JSON 数据解析后包装成函数以供调用
```
环境要求 : 
```
python 2.x
requests
```
下载安装 :
1. install with pip
```
sudo pip install pytranslator
```
2. install with source code
```
git clone https://git.coding,net/yihangwang/PyTranslator.git
cd ./PyTranslator
sudo python setup.py install
```
使用方法 : 
```
1. [申请有道翻译Key](http://fanyi.youdao.com/openapi?path=data-mode)
	需要填写一下邮箱和应用名称 , 然后邮箱中会收到 KEY 和 KEY_FROM
2. 引入包 pytranslator
3. 根据第 1 步邮件中收到的 KEY 和 KEY_FROM 调用 youdao 类的构造函数
4. 调用成功后 , 就可以调 youdao 类的函数 trans 来进行返回
	入口参数为需要被翻译的字符串 , 会自动识别中英文
```
TODO : 
```
1. 开放更多的接口(更加接近有道API提供的各种功能)
2. 将结果保存在本地 , 当用户多次查找的时候减轻服务器的压力
3. 汉译英功能
4. 自动补全功能
5. 短语查询功能
6. 整句翻译功能
```
