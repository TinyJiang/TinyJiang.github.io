---
layout: post
title: ES6-Map对比原生Object性能测试
keywords: JavaScript Map Object
description: "关于es6规范定义的map，在各种环境中和Object对比测试"
---

---------

ES6规范中定义了Map类，咋一看跟我们自已以前用Object模拟过的Map差不多嘛,所以比较了一下两者的执行速度，结果真是令人大为不解。下面展示一下我的测试。

## ROUND 1

### Object


{% highlight js %}
var o = {}, i = 100;

for (i; i > 0; i--) {
  o[i] = i;
}

for (i; i < 100; i++) {
  o[i];
}
{% endhighlight %}

### Map

{% highlight js %}
var m = new Map(),
  i = 100;

for (i; i > 0; i--) {
  m.set(i, i);
}

for (i; i < 100; i++) {
  m.get(i);
}
{% endhighlight %}

###测试结果

####safari
![safari](http://tinyjiang.qiniudn.com/2014-11-04-safari-100.png){: width="800"}

####chrome
![chrome](http://tinyjiang.qiniudn.com/2014-11-04-chrome-100.png){: width="800"}

####firefox
![firefox](http://tinyjiang.qiniudn.com/2014-11-04-firefox-100.png){: width="800"}

## AFTER ROUND 1
原本以为两者效率差距应该差不多，居然是这样的结果。推测ES6中Map实现的方式跟Object有所区别。上MDN和ECMA查了一下，结果如下

###MDN
[Map - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

	Objects and maps compared

	Objects are similar to Maps in that both let you set keys to values,
    retrieve those values, delete keys, and detect whether something 
    is stored at a key. Because of this, Objects have been used as Maps
    historically; however, there are important differences between
    Objects and Maps that make using a Map better.

	An Object has a prototype, so there are default keys in the map. 
    However, this can be bypassed using map = Object.create(null).
	The keys of an Object are Strings, where they can be any value for a Map.
	You can get the size of a Map easily while you have to manually 
    keep track of size for an Object.
	Use maps over objects when keys are unknown until run time, 
    and when all keys are the same type and all values are the same type.

	Use objects when there is logic that operates on individual elements.
	

这上面提了几点,总结一下

1. Object会从原型中继承默认的一些属性，但是可以避免

2. Object只能用String类型的key而Map可以用任意类型的key(经本人在最新版的safari，chrome，firefox中检测，Object也可以使用任意类型为key)

3. 可以轻松的获取Map的大小，但是我们使用Object的时候必须手动追踪大小（这个倒是）

4. 在runtime中才确定key的使用Map(obj[]也可以实现),在所有key为同一类型以及所有value为同一类型时使用Map(为什么?)

5. 在每个元素上都有逻辑操作时使用Object

MDN中还是没有我们想要的执行效率差距的原因，倒是多了几个问题。

### ECMA-262（Draft October 14, 2014）

	23.1.3.9 Map.prototype.set ( key , value )

	The following steps are taken:

	.....
	Repeat for each Record {[[key]], [[value]]} p that is an element of entries,
	If p.[[key]] is not empty and SameValueZero(p.[[key]], key) is true, then
	Set p.[[value]] to value.
	Return M.
	.....
	
	
	23.1.3.6 Map.prototype.get ( key )

	The following steps are taken:

	.....
	Repeat for each Record {[[key]], [[value]]} p that is an element of entries,
	If p.[[key]] is not empty and SameValueZero(p.[[key]], key) is true, 
    then return p.[[value]].
	.....

可见Map的set和get方法当中有明显的循环逻辑(不知道为什么要这样规定)，这导致了Map的效率比原始Object的效率低了不止一个数量级
为了验证Map中确实做了循环，我们增大Map中容量试试

## ROUND 2

增加大小为10000

####safari
![safari](http://tinyjiang.qiniudn.com/2014-11-04-safari-10000.png){: width="800"}

####chrome
![chrome](http://tinyjiang.qiniudn.com/2014-11-04-chrome-10000.png){: width="800"}

####firefox
![firefox](http://tinyjiang.qiniudn.com/2014-11-04-firefox-10000.png){: width="800"}

## AFTER ROUND 2
由于循环次数过多，时间基本上都被循环占据了，但还是可以看到性能急剧下降。
但是在这个数量级上相同的循环时间在firefox下Object的效率急剧下降甚至比Map的效率还低，这又出现了新问题，这是为什么？

本篇留下的几个问题就在下一篇分析吧.😄
