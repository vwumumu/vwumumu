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
    return Math.PI * Math.pow(this.r,2)
}

Circle.prototype.getLength = function(){
    return Math.PI * this.r * 2
}

let circle = new Circle(5)

circle.r
circle.getArea()
circle.getLength()
```

* 构造函数ES6版
```js
class Circle{
    constructor(r){
        this.r = r
    }
    getArea(){
        return Math.PI * Math.pow(this.r,2)
    }

    getLength(){
        return Math.PI * this.r * 2
    }
}

```


---11/30/2021---
---12/02/2021---

## 数组

* 定义一个数组

```js
let arr = [1, 2, 3]
let arr = new Array(1, 2, 3)  //元素为1, 2, 3
let arr = new Array(3)  //长度为3的空数组
```

* 数组对象的自身属性

```js
// '0'/'1'/'2'/'length'
```

属性名没有数字，只有字符串

* 数组对象的共有属性

push，在最后加元素
pop，把最后元素弹出
shift，把开头元素弹出
unshift，在开头加元素
join，用什么连接arr中的每一个元素，比如arr = [1,2,3],arr.join(a)则返回[1a2a3],即用a代替逗号，
contact，连接两个数组arr1 = [1,2,3] arr2 = [4,5,6] , arr1.contact(arr2),返回[1,2,3,4,5,6]
slice，截取数组的一部分，arr.slice(1) //从第二个元素开始截取

---12/02/2021---
## 函数

在js中，函数也是一个对象

* 定义一个函数

```js
function fn(x,y){return x+y}
let fn2 = function fn(x,y){return x+y}
let fn = (x,y) => x+y
let fn = new Function('x','y','return x+y')
```


* 函数对象的重要自身属性

name
length

* 函数对象的重要共有属性

all
apply
bind

* js终极一问

window是由其构造函数构造，即Window；
window.Ojbect由window.Function构造；
window.Function是由浏览器构造Function，然后指定它的构造者是自己，即windows.Function.constructor === window.Function 

## 数组2

* 新建

```js
let arr = [1, 2, 3]
let arr = new Array(1,2,3)
let arr = new Array(3)
```

* 转化

```js
let arr = '1,2,3'.split(',')
let arr = '123'.split('')
Array.from('123')
```

* 伪数组

长得像数组的数组，但不是基于数组的原型构造的，意味着不能使用数据的method。

* 删

删的方式跟删对象一样，delete arr[0],但是删完后，数组的长度不变，这是对象的删法，不太适合数组。

只有长度，没有内容，叫稀疏数组。

正确的删除数组元素的方法应该使用数组的相关方法去删：

```js
arr.shift() //删开头
arr.pop()  //删结尾
arr.splice(index,1)  //删除index的一个元素
arr.splice(index,1,'x')  //删除index的一个元素，并在同一个位置添加'x'
arr.splice(index,1,'x','y')  //同上，添加'x','y'
```

* 查

对象的方法对数组都可以用，但是很多时候不适用，比如伪数组，即数组里面有个属性的名不是数字，比如是x

```js
for(let key in arr){console.log(`${key}:${arr[key]}`)} //这种方式，会把x也便利出来。
```

可以通过限制便利数字，达到输出数组的目的：

```js
for(let i = 0; i < arr.length; i++){
    console.log(`${i}:${[i]}`)
}
```

也可以直接使用数组的forEach方法：
```js
arr.forEach(function(xxx){console.log(xxx)})  //只打印数组的值
arr.forEach(function(xxx,yyy){console.log(`${yyy}:${xxx}`)})  //遍历数组
```

---12/02/2021---
---12/03/2021---

* 索引越界

```js
arr[arr.length] === undefined
```

举例：
```js
for(let i = 0 ; i <= arr.length; i++){
    console.log(arr[i].toString())
}
```

因为i=arr.length时，数组的对象不存在，所以会取不到，就意味着索引超过了范围，索引越界。

* 查：

arr.indexOf(13), 判断13在不在数组arr中，如果返回-1，就表示不在，如果在，返回第一个该元素的位置下标。

arr.find(x => x%5===0),返回符合条件的第一个元素

arr.findIndex(x => x%5===0),返回符合条件的一个元素的下标

* 增

arr.shift() //删开头
arr.pop()  //删结尾
arr.splice(index,1)  //删除index的一个元素
arr.splice(index,1,'x')  //删除index的一个元素，并在同一个位置添加'x'
arr.splice(index,1,'x','y')  //同上，添加'x','y'

* 排序：

```js
arr.sort((a,b) => a.score - b.score) //从小到大
```

* 数组变换

* map n变n

```js
let arr = [1,2,3,4,5,6]
arr.map(item => item*item)  //告诉map，怎么变arr中的item
```

* filter n变少

```js
let arr = [1,2,3,4,5,6]
arr.filter(item => item%2 === 0 ? true : false)
```
可以简写成：
```js
arr.filter(item => item%2 === 0) 即，返回结果为true的元素
```

* reduce n变1

```js
let arr = [1,2,3,4,5,6]
arr.reduce((sum, item)=>{return sum + item},0)
```

* reduce 实现map

```js
let arr = [1,2,3,4,5,6]
arr.reduce((bucket,item)=>{return bucket.concat(item*item)},[])
```

* reduce 实现filter

```js
let arr = [1,2,3,4,5,6]
arr.reduce((result,item)=> item % 2 === 1 ? result: result.concat(item),[])
arr.reduce((result,item)=> result.concat(item%2===1?[]:item),[])  //更简洁优美的上一行的美化
```
---12/03/2021---
---12/05/2021---

## 函数

* 具名函数

标准，最常用的函数：
```js
function 函数名（形式参数1，形式参数2）{
    语句
    return 返回值
}
```

* 匿名函数
具名函数，去掉函数名就是匿名函数

通常
```js
let a = function(x,y){return x + y}
```

=等号右边也叫函数表达式

=号右边的函数的作用域只在=右边，不是全局变量，比如：
```js
let a = function fn(x,y)(return x + y)
```
fn(a,b),就会报错。

* 箭头函数

如果想直接返回一个对象，需要在对象的两端加括号：

```js
let f4 = x => ({name:x})
```

* 构造函数

基本没人用
```js
let fn1 = new Function('x','y','console.log(\'hi\');return x+y')
```

* 函数的要素：
* 调用时机：
例1:
```js
let a = 1
function fn(){
    console.log(a)
}

a = 2

fn()
```
答案是2

例2:
```js
let a = 1
function fn(){
    console.log(a)
}

fn()

a = 2
```
答案是1

例3:
```js
let a = 1
function fn(){
    setTimeout(()=>{
        console.log(a)
    },0)
}

fn()
a = 2
```
答案是2

例4:
```js
let i = 0 
for(i = 0; i < 6; i++>){
    setTimeout(()=>{
        console.log(i)
    },0)
}
```
答案是6个6

例5:
```js
for(let i = 0; i < 6; i++>){
    setTimeout(()=>{
        console.log(i)
    },0)
}
```
答案是0/1/2/3/4/5
因为js在for和let一起用的时候会加东西
每次循环会多创建一个i


---12/05/2021---

---12/08/2021---

* 全局变量 vs 局部变量

在函数里声明的变量是局部变量
全局变量有两种：
1.在顶级作用域声明的变量，就是在一开始，最外面声明的变量
2.window.c = 1, 通过window声明的变量，通过window声明的变量，不需要在最外面声明，在函数里也可以。

* 作用域规则

如果多个作用域有同名变量a
那么查找a的声明时，就向上取最近的作用域
简称就近原则
查找a的过程与函数执行无关
但a的值与函数执行有关

* 闭包

```js
function f1(){
    let a = 1
    function f2(){
        let a = 2
        function f3(){
            console.log(a)
        }
        a = 22
        f3()
    } 
    console.log(a)
    a = 100
    f2()
}
```
f3函数用了外部变量a = 2，这就叫闭包。 a=2和f3组成了闭包。

* 调用栈

js引擎在调用一个函数前，需要把函数所在的环境push到一个数组里，这个数组叫做调用栈。
因为每次计算到内部的时候，拿到结果后需要返回给上一步运算，这就需要知道该返回到什么地方，调用栈就是用来保存该回到哪个环境的地方。

* 递归 爆栈

先递进，再回归。

爆栈就是超过程序提供的最大压栈量。

* 函数提升

function fn(){}
不管把具名函数声明在哪里，都会跑到第一行。
比如：
```js
add(1,2)
function add(x, y){
    return x + y
}
```
运行不会报错，因为add是一个具名函数，会被提升到add(1, 2)的前面。

* 什么不是函数提升

let fn = function(){}
这是赋值，右边的匿名函数声明不会提升。

* js三座大山

搞定就可以搞vue,react,anjula了

* arguments（除了箭头函数）

每个函数都有，除了箭头函数。
arguments是一个包含所有参数的伪数组，通过array.from()，可以将其变成数组。
为什么说arguments是一个伪数组，因为其有0，1，2...这样的下标，还有length。

* this（除了箭头函数）

```js
function fn(){
    console.log(this)
}

fn()
```
如果不给fn这个函数任何参数，则this默认为小写的window全局变量。

可以通过call的方式给this传参数：
fn.call(1)
如果给this传的不是一个对象，js会自动帮忙封装成一个对象。

如果想不让js帮忙封装，而是传什么就是什么：
需要加：'use strict'
```js
function fn(){
    'use strict'
    console.log(this)
}

fn()
```
* this 和 arguments

对于函数，通过call的方式传参数，传入的第一个参数就是this，其他的参数是arguments：
```js
function fn(){
    console.log(this)
    console.log(arguments)
}


fn.call(1,2,3,4)
  Number {1}
  Arguments(3) [2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

* 为什么要有this?

```JS
class Person{
    constructor(name){
        this.name = name
    }
    sayHi(){
        console.log(???)
    }
}
```
我在写Person这个类的时候，有一个method叫sayHi()，我还不知道通过Person类创建的对象叫什么，所以，我就不知道该对谁sayHi

这就是为什么要有this，来解决对未知函数的引用问题。


* this如何解决引用未知参数的问题
```js
let person = {
    name:'frank'
    sayHi(/*this*/){
        console.log('Hi, may name is' + this.name)
    }
}
```
person.sayHi()
相当于：
person.sayHi(person)
然后，person传给了sayHi()中的this
于是最后，console.log打印了person.name即frank。

* js调用this的两种方式

小白：
person.sayHi()
自动把person传给this

大师：
person.sayHi.call(person)
通过call，指定把谁传给this

* 绑定this

使用.bind可以让this不被改变
```JS
使用.bind可以让this不被改变
function f1(p1,p2){
    console.log(this,p1,p2)
}
let f2 = f1.bind({name:'frank'}) //那么f2就是f1绑定了this之后的新函数
f2()  //等价于f1.call({name:'frank'})

.bind还可以绑定其他参数
let f3 = f1.bind({name:'frank'}, 'hi')
f3() //等价于f1.call({name:'frank'},hi)
```
使用f1时，需要提供3个参数，this，p1和p2，即：
f1.call(this,p1,p2)
这时，用f3实现f1就可以:
f3(p2),因为this，p1已经提前绑定


---12/08/2021---
---12/09/2021---

* 只要一个局部变量的方法，立即执行函数

!function(){
    var a = 2
    console.log(a)
}()

定义一个函数，然后在后面直接用一个括号()调用，在function前面加个！

{
    let a = 2
    console.log(a)
}

新版的语法，直接使用{}+let就可以得到一个局部变量。


## js运算符

* 短路逻辑

console && console.log && console.log('hi')
从前向后依次检查满足才执行console.log('hi')

这称为防御性编程，防止报错。

最新的语法，可以简写成：
console?.log?('hi')
这叫做，可选链语法。

用||链接，可以起到设定保底值的作用：
a = a || 100
a保底为100


## DOM编程

网页上的元素就像一棵树，js如何操作这棵树？

浏览器在window上加了一个document，以此衍生出整棵树。

window.document就可以看到这棵树。

这就是Document Object Model（DOM）文档对象模型

### 获取页面上的元素

* 直接通过id获取元素
如果一个元素有id，可以直接通过window.id获取，甚至直接输入id获取到该元素。
比如：baidu的搜索框，在console中输入window.kw或者直接kw就能获取到搜索框这个元素。

* document.getElementById('idxxx') 比如：
```js
document.getElementById('kw')
```

* document.getElemenetsByTagName('div')[0]
获取所有的Tag为div的元素，取第一个，因为直接得到的结果是一个伪数组，通过[0]拿到第一个。

* document.getElementsByClassName('red')[0]
获取所有的类为red的元素，取第一个。

> 上面的3个永远不要用，只有在需要兼容ie的时候才需要用。
> 工作中用：querySelector和querySelectorAll

* document.querySelector('#idxxx')
获取id为xxx的元素。

* document.querySelectorAll('red')[0]
选择class为red的所有元素，并选择第一个元素。

* 获取特定的页面元素

document.documentElement  //获取html标签

document.head  //获取head

document.body  //获取body

window  //获取当前窗口，窗口不是元素，但是会有用，比如监听当前窗口的onclick事件
比如：window.onclick = ()=>{console.log('hi')}






## 代码规范

* 大小写

所有构造函数首字母大写

所有被构造出来的对象，首字母小写

* 词性

new后面+名次

其他函数，一般使用动词开头
