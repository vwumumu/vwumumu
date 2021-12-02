---
id: 'fe-note'
title: '前端学习笔记'
---

# 需要重复看的视频



# HTML重点标签

---11/28/2021---

# JS
## 数据类型
### 七种数据类型
string, number, bool, symbol, undefined, null, object
### 五个Falsy值
undefined, null, '', NaN, 0

## 对象
* 定义

无序的键值对

* 写法
```js
let obj = {'name': 'frank', 'age': '18'}
let obj = new Object({'name': 'frank'})  //正规写法
console.log({'name': 'frank', 'age': '18'})  //匿名对象，直接console.log，没有给对象一个名字
```

* 细节

键名是字符串，无论是否加引号

* 查看对象的键名
```js
Object.keys(obj)
```

* 使用一个变量的值作为键名
```js
let a = xxx
let obj = {
    [a]: 1111
}
/*
obj
{xxx:111}
*/
```

* symbol也能做属性名
```js
let a =Symbol() 
let obj = {[a]: 'hello'}
```

* 对象的隐藏属性

每一个对象都有一个隐藏属性__proto__，用于存储原型的地址。

* js共有属性引发的思考

如果有多个对象有共有属性，可以把共有属性抽象出来，python的类和实例就是这样的。

比如小红，小蓝，颜色一个是红，一个是蓝，但是他们可以有一个共有属性都是颜料。

* js读共有属性走原型，写共有属性不走原型

比如：toString是obj的共有属性，给obj.toString赋值为xxx，则obj.toString的值为xxx，但obj2.toString还是从原型取值，除非修改原型对象的toString。

* 删
```js
obj.name = undefined //obj对象的name key的值将被设为undefined，但是name这个键名还在
delete obj.name  //直接删除obj对象name这个键值对
delete obj.['name'] //等于delete obj.name
```

* 查
```js
'name' in obj  //查询name是不是obj对象的属性名
Object.keys(obj)  //查属性名
Object.values(obj)  //查属性值
Object.entries(ojb)  //返回一个给定对象自身可枚举属性的键值对数组
console.dir(obj)  //可以查看对象的自身+共有属性
obj.hasOwnProperty('toString')  //判断一个属性是不是自身属性
obj['key']  //查看属性
obj.key  //查看属性
obj[key]  //查看属性名为变量key的值的属性
```
注意，['name']内容是name字符串，[name]的内容是名为name的变量的值。

* 写
```js
obj.name = 'frank'  //直接赋值，属性存在就是修改，属性不存在就是增加
Ojbect.assign(obj,{p1:1,p2:2,p3:3})  //批量赋值
```

---11/28/2021---

---11/29/2021---

* 如何修改原型属性值

一般不要修改原型的属性，会引起很多很多的问题。

例：不要通过__proto__.toString,而是通过windows.Object.prototype.toString修改。


* 修改某个对象的原型

```js
obj.__proto__ = null  //这样，obj就会失去共有属性。
```

* 指定原型创建对象

```js
let common = {'国籍': '中国', haircolor: black}
let person = Object.create(common)
```

* 函数与原型结合

```js
function createSquare(width){
    let obj = Object.create(createSquare.squarePrototype)  //指定原型创建函数
    obj.width = width
    return obj
}

createSquare.squarePrototype = {
    getArea{
        return this.width * this.width
    },
    getLength{
        return this.width * 4
    }
    constructor: createSquare  //指定引用此原型的函数
}
```

重写：
```js
let squareList = []
let widthList = [5,6,5,6,5,6,5,6]

function Square(width) {
    this.width = width
}

Square.prototype.getArea = function(){
    return this.width * this.width
}

Square.prototype.getLength = function(){
    return this.width * 4
}

for(let i = 0; i < 12; i++){
    squareList[i] = new Square(widthList[i])
    console.log(squareList[i].constructor)
}
```
这就是构造函数的逻辑。

Squrare函数本身负责给对象本身添加属性。
Squrare.prototype对象负责保存对象的共有属性。
```js
function Dog(name){
    this.name = name
    this.color = '白'
    this.kind = '萨摩耶'
}

Dog.prototype.wangwang = function(){
    console.log('wangwang')
}

Dog.prototype.run = function(){
    console.log('run')
}

let dog1 = new Dog('xiaobai')
```

---11/29/2021---
---11/30/2021---

* 原型公式

对象的原型等于其构造函数的prototype

```js
a.__proto__ === A.prototype
```

* 构造函数最终版

```js
function Circle(r){
    this.r = r
}

Circle.prototype.getArea = function(){
    return Math.PI * 
}

Circle.prototype.getLength = function(){
    return Math.PI * this.r * 2
}

let circle = new Circle(5)

circle.r
circle.getArea()
circle.getLength()
```
---11/30/2021---
---12/01/2021---



---12/01/2021---
## 数组

## 函数

## 代码规范

* 大小写

所有构造函数首字母大写

所有被构造出来的对象，首字母小写

* 词性

new后面+名次

其他函数，一般使用动词开头
