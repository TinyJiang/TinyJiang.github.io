---
layout: post
title: GitHub Pages 第一篇博客
keywords: GitHub Pages
description: "这里的第一篇，就介绍怎么搭建一个GitHub博客吧"
---

##新的开始

暂时就先把Blog挂在GitHub Pages了。以前的那些就不移过来了，重新开始。

##使用GitHub Pages搭建博客

####**Step 1: 新建Repo**

- 要使用GitHub Pages当然得先有GitHub帐号啦- -。。此处就不做介绍了。

- [GitHub Pages][1]有详细介绍,其实就是创建一个普通Repository,命名规则为 `username.github.io`

- push一个最简单的index.html之后即可通过 `http://username.github.io` 访问，够简单吧。


> **提示:** 第一次 push 之后 github 会花一段时间来生成你的站点，耐心等待即可。


####**Step 2: 使用jekyll[^jekyll]编写博客**

#####windows下安装jekyll

- 从[官网][6]下载,安装版或者解压缩版皆可，也可以从[RubyInstaller][7]下载一键安装
- 在[RubyInstaller][7]中一并下载DevKit，解压缩至任何目录,CMD下运行
```
ruby dk.rb init
```  
```
ruby dk.rb install
```

- 安装jekyll，在CMD下运行
```
gem install jekyll
```

> **提示:** 国内环境可以现将Ruby源切换至淘宝源，加快安装速度，详见： [RubyGems 镜像 - 淘宝网][8]。


#####使用jekyll模板生成一个DEMO
- CMD下运行`jekyll new path` `path`为DEMO所在目录
- `path`中的**_config.yml**为jekyll的配置文件,详细配置见:[jekyll configuration][9]
- CMD中运行`jekyll serve --watch`,其中`--watch`参数为动态修改，类似与热部署功能
- 打开localhost:4000即可访问index.html
- 在_posts目录中增加新的博客,可使用在线编辑器进行编辑:[stackedit][10]

> **提示:** GitHub也可直接使用HTML+CSS+JS进行部署，jekyll只是一个生成工具。


####**Step 3: 绑定域名**
- 在godaddy上购买你心爱的域名之后，进入**My Accounts**->**Manage My Domains**
- 对想要跳转至GitHub的域名点击**Manage DNS**->新增**CName** host：`www`,Points To:`username.github.com`
- 在你的`username.github.io`根目录下新建一个名为`CNAME`的文件，里面写入你的域名，如`www.tinyjiang.com`

> **提示:** 如不需要域名，可使用Step 1中的`http://username.github.io`进行访问。


[^jekyll]: [jekyll][5] 通过模板生成静态HTML页面，支持 [Markdown][2]，[Textile][3]，[Liquid][4] 其一以及标准HTML混合使用


[1]: https://pages.github.com/
[2]: http://daringfireball.net/projects/markdown/
[3]: http://textile.sitemonks.com/
[4]: http://wiki.shopify.com/Liquid
[5]: http://jekyllrb.com/
[6]: https://www.ruby-lang.org/zh_cn/downloads/
[7]: http://rubyinstaller.org/
[8]: http://ruby.taobao.org/
[9]: http://jekyllrb.com/docs/configuration/
[10]: https://stackedit.io/#fn:stackedit
