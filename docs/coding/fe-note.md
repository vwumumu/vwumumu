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

document.all  //获取所有元素，第6个false值, IE发明的。

---12/09/2021---
---12/10/2021---

* 通过div的原型一层层看结构

div.__proto__ > HTMLDivElement > HTMLElement > Element > Node > EventTarget > Object

* EvetTarget的属性
addEventListener
dispatchEvent
removeEventListener

* Node的类型

https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType

* Node的增:
* 创建一个标签节点：
let div1 = document.createElement('div')
document.createElement('style')
document.createElement('script')
document.createElement('li')

* 创建一个文本节点：
text1 = document.createTextNode('你好')

* 标签里插入文本
div1.appendChild(text1)  //用到了前面创建的div1和text1

比较简单的方式：
div1.innerText='你好' 或者 div.textContent='你好'
但是不能用div1.appendChild('你好')

* 插入页面中

通过上面的方式创建的元素默认处于js线程中
必须把它插入到head或者body里面，才会生效
document.body.appendChild(div)  //append in body element
or
an exist element.appendChild(div)  //append in an exist element which is displaying in body

* clone element
div2 = div1.cloneNode(true)  //paramater true means deep copy
as appendChild only working for the last time. we need to use cloneNode to creat a same element if we need to append an element in more than 1 element.

* Node Delete:
* two methods
1st: parentNode.childChild(childNode)  //delete node from parent node

e.g.:
div1.parentNode.removeChild(div1)

div1 can be add again after remove, it means the element was removed from the document tree, but in memory.

2nd: childNode.remove()  //ie not support

e.g.:
div2.remove()
as 1st method, div2 can be added with appendChild(div2), it will be remove from memory if set a null to variable div2

* Node改属性:
* 写标准属性
改class: div.className = 'red blue'  //注意，使用className，不能用class，因为class是保留字

改class: div.classList.add('red')  //加一个class

改style: div.style = 'width:100px; color:blue;'

改style的一部分: div.style.width = '200px'

大小写： div.style.backgroundColor = 'white'  //对于带中划线的属性，比如：background-color，改写属性值就比较麻烦，需要通过div2.style['background-color']的方式改，比较简单的方式是：把-c变成大写C

改data-* 属性：div.dataset.x='frank' //可以给一个元素自定义属性data-x，可以通过dataset.x修改这个自定义属性。

* 读标准属性
div.classList
div.getAttribute('class')
两种方法都可以，但是getAttribute会获取到原原本本的属性，比如对于a标签，使用相对路径/，通过a.href读出来，可能会被加上站点的域名。

e.g.
console.log(test.href)  //'http://www.baidu.com/xxx'
console.log(test.getAttribute('href'))  //'/xxx'

* 改事件处理属性：
* div.onclick默认为null
点击div的时候，浏览器就会调用这个函数
并且是这样调用的fn.call(div, event)
div会被当作this传进fn
event则包含了点击时间的所有信息

* div.addEventListener
是div.onclick的升级版
onclick只可以写一个函数
addEventListener可以写很多个函数

### 改内容
* 改文本内容
div.innerText = 'xxx'
div.textContent = 'xxx'

* 改HTML内容
div.innerHTML = `<p><strong>Hi</strong></p>`

* 改标签
div.innerHTML = '' //先清空
div.appendChild(div2)  //再加内容

* 改父节点

在新节点下,把自己加进去：
newNode.appendChild(div)

---12/10/2021---
---12/11/2021---

### 查内容

* 查自己

直接输入元素名就可以，比如：
div
就会在console打出div

* 查父节点

div.parentNode
div.parentElement

* 查爷爷

div.parentNode.parentNode

* 查子代

div.childNode   //会包含换行空格等文本节点，因为是node提供的
div.children    //不包含文本节点，通常会获取到html的元素，因为是element提供的

* 查老大

div.firstChild

* 查老幺

div.lastChild

* 查前一个

div.previousSibling
div.previousElementSibling

* 查下一个

div.nextSibling
div.nextElementSibling

* 遍历div中的所有元素

travel = (node, fn) => {
    fn(node)
    if(node.children){
        for(let i = 0; i < node.children.lenght; i++ ){
            travel(node.children[i], fn)
        }
    }
}
travel(div1,(node) => console.log(node))

### DOM跨线程操作

* 插入新标签的完整过程
在div1放入页面之前：
你对div1的所有操作都属于js线程内的操作

把div放入页面之时：
浏览器会发现js的意图就会通知渲染线程在页面中渲染div1对应的元素

把div1放入页面之后：
你对div1的操作都又可能会触发重新渲染

* 属性同步：
标准属性：
对div1的标准属性的修改，会被浏览器同步到页面中，比如id/className/title等

data-*属性：
同上

非标准属性：
自己瞎写的一个属性，通过js修改后，只会停留在js线程中，不会同步到页面里。

启示：
如果有自定义属性，又想通过js同步到页面中，需要使用data-作为前缀。


## 代码规范

* 大小写

所有构造函数首字母大写

所有被构造出来的对象，首字母小写

* 词性

new后面+名次

其他函数，一般使用动词开头

## 路线图

基础：html css http

js > dom > 封装api > mvc > vue2 > react > vue3 > 小程序 > flutter


## 封装DOM

### 以类的形式写
// index.html引入
<script src='dom.js'></script>
<script src='main.js'></script>

//  main.js
dom.create //通过dom.调用

// dom.js
window.dom = {
    create(){},
    after(){},
}

### 重载

同一个api，根据参数数量的不同，提供不同的功能：
attr(node, name, value){
    if(arguments.length === 3){
        node.setAttribute(name, value)
    }else if(arguments.length === 2){
        node.getAttribute(name)
    }
}

### 适配

针对不同的浏览器，执行不同的代码
text(node, string){
    if('innerText' in node){
        node.innerText = string
    }else{
        node.textContent = string
    }
}

### 做带二级分类命令的api

比如：dom.class.add

class:{
    add(){

    }
}

### ||

在scope中查找，如果scope没有，到document中查找。

find(){
    return (scope || document).querySelectorAll(selector)
}

### 获取siblings

siblings(node){
    return Array.from(node.parentNode.children).filter(n=>n!==node)
}

### 跳过文本节点

next(node){
    let x = node.nextSibling
    while(x && x.nodeType === 3){
        x = x.nextSibling
    }
    return x
}


---12/11/2021---
---12/21/2021---

### 链式操作

```js
window.jQuery = function(selector){
    const elements = document.querySelectorAll(selector)
    const api = {
        addClass(className){
            for(let i = 0; i < elements.length; i++){
                elements[i].classList.add(className)
            }
            return api
        }
    }
    return api
}
```

在addClass中return api，以实现链式引用。

最终简化的代码为：

```js
window.jQuery = function(selector){
    const elements = document.querySelectorAll(selector)
    return {
        addClass(className){
            for(let i = 0; i < elements.length; i++){
                elements[i].classList.add(className)
            }
            return this
        }
    }
}
```

### jQuery对象代指jQuery函数构造出来的对象

### DOM事件模型

```js
<div class='ye'>
    <div class='ba'>
        <div class='er'>
        wenzi
        </div>
    </div>
</div>
```

点击wenzi，算不算点击er？ba？ye？，都算。

点击wenzi，最先调用ye？ba？er？，都行。ie5先调er，其他先调ye。

从外向内找监听函数叫事件捕获；
从内向外找监听函数叫事件冒泡。

### addEventListener

事件绑定api
ie5: baba.attachEvent('onclick',fn)  //冒泡
网景：baba.addEventListener('click',fn)  //捕获
W3C： baba.addEventListener('click',fn,bool)

不指定bool，则默认冒泡，如果填true，则为捕获。

### 取消冒泡

e.stopPropagation()可中断冒泡，浏览器不再向上走。

所有冒泡皆可取消，默认动作有的可以取消有的不能取消。
Cancelable是用来取消默认动作的。

### 阻止滚动

x.addEventListener('wheel',(e)=>{
    e.preventDefault()
})

x.addEventListener('touchstart',(e)=>{
    e.preventDefault()
})

通过阻止wheel和touchstart阻止滚动。注意，需要找到滚动条所在的元素。
但是滚动条还能用，用css让滚动条的宽度变为0
::-webkit-scrollbar {
    width:0 !important
}

### target和currentTarget

一个是用户点击的，一个是开发者监听的。

### 自定义事件

const event = new CustomerEvent('frank',{
    detail: (name:'frank', age:18)
    bubbles: true,
    cancelable: false
})
button1.dispatchEvent(event)

## AJAX

Async JavaScript And XML.
AJAX的全部就是：用JS发请求和收响应

### nodejs中读取html，js等

```js
var fs = require('fs')  //需要用到fs模块

if(path === '/index.html'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(fs.readFileSync('public/index.html'))  //通过fs.readFileSync('文件路径')使nodejs读取独立的文件
    response.end()
```

### 使用AJAX请求CSS

4步：
1.创建XMLHttpRequest对象
2.调用对象的open方法
3.监听对象的onload & onerror事件
    1）专业前端会改用onreadystatechange事件
    2）在事件处理函数里操作CSS文件内容
4.调用对象的send方法（发送请求）
    1）具体代码请打开MDN用CRM大法搞定

index.html
```js
<body>
    <h1>AJAX demo2</h1>
    <p>
        <button id="getCSS">请求CSS</button>
    </p>
    <script src='main.js'></script>
</body>
```

main.js:
```js
getCSS.onclick = () => {
    const request = new XMLHttpRequest()

    request.open('GET', '/style.css');

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) { //状态吗200-300为成功
                const style = document.createElement('style')
                style.innerHTML = request.response
                document.head.appendChild(style)
            } else {
                alert('加载失败')
            }
        }
    };

    request.send()
}
```

### 使用AJAX请求JS

```js
getJS.onclick = () => {
    const request = new XMLHttpRequest()

    request.open('GET', '/2.js');

    request.onload = () => {
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
    };
    request.onerror = () => {};

    request.send()
}
```

### 使用AJAX请求HTML

```js
getHTML.onclick = () => {
    const request = new XMLHttpRequest()

    request.open('GET', '/3.html');

    request.onload = () => {
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
    };
    request.onerror = () => {};

    request.send();
}
```

### http请求的过程状态，readystate

创建：const req = new ....  // 0
打开：req.open()  // 1
发送：req.send()  // 2
第一个信息出现在浏览器：  3
下载完成：   4

### 使用AJAX请求XML

```js
getXML.onclick = () => {
    const request = new XMLHttpRequest()

    request.open('GET', '/4.xml');

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const dom = request.responseXML;
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim())
            } else {
                alert('加载失败')
            }
        }
    }   
    request.send()
}
```


### 使用AJAX请求JSON
JSON官网说明：json.org

JSON支持的数据类型：
string - 只支持双引号，不支持单引号无引号
number - 支持科学记数法
bool - true和false
null - 没有undefined
object
array

```js
getJSON.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open('GET', '/5.json');
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            console.log(request.response)
            const object = JSON.parse(request.response)
            myName.textContent = object.name
        }
    }
    request.send()
}
```

JSON.parse():
将符合JSON语法的字符串转换成JS对应类型的数据

JSON.stringify():
JSON.parse()的逆运算,将符合JSON语法的JS数据转换成JSON格式


### AJAX综合应用：加载分页







### AJAX总结

解析方法：
得到CSS之后，生成style标签
得到JS之后，生成script
得到HTML之后，使用innerHTML和DOM API
得到XML之后，使用responseXML和DOM API

## 异步与Promise

如果能直接拿到结果就是同步。

如果不能直接拿到结果就是异步，比如餐厅等位，拿到号就可以走了。
每10分钟去餐厅问一下是轮询；
扫码用微信接收通知是回调。

### 回调

你写给自己用的函数，不是回调
你写给别人用的函数，就是回调

回调举例：

```js
function f1(){}
function f2(fn){
    fn()
}
f2(f1)
```
我调用了f2,f1是写了给f2调用的，所以f1是回调，f2不是回调。

### 判断同步异步

如果一个函数的返回值处于：
* setTimeout
* AJAX（即XMLHttpRequest）
* AddEventListener
这三个东西内部，那么这个函数就是异步函数。

### 异步+回调

* 异步任务不能拿到结果
* 于是我们传一个回调给异步任务
* 异步任务完成时调用回调，比如回调是console.log
* 调用的时候把结果作为参数传给回调

### 如何让一个回调的异步函数变成Promise的异步函数

* 第一步

return new Promise((resolve,reject)=>{...})
任务成功则调用resolve(result)
任务失败则调用reject(error)
resolve和reject会再去调用成功和失败函数

* 第二步

使用.then(success, fail)传入成功和失败函数

## 动态服务器

从数据库拿数据就叫动态服务器

### 以JSON文件作为数据库读写

```js
const fs = require("fs");

// 读数据库
const usersString = fs.readFileSync("./db/users.json").toString();
const usersArray = JSON.parse(usersString);

// 写数据库
const user3 = {id:3, name:'tom', password:'yyy'}
usersArray.push(user3)
const string = JSON.stringify(usersArray)
fs.writeFileSync('./db/users.json',string)

```

### 实现用户注册功能
用户提交用户名密码
users.json里就新增了一行数据

思路：
前端写一个form，让用户填写name和password
前端坚挺submit事件
前端发送post请求，数据位于请求体
后端接收post请求
后端获取请求体中的name和password
后端存储数据

## MVC

### 抽象思维1

将html/css/js拆分，各自模块化
每一个具体的功能为独立的js，相应的html和css在js中引入。

### 抽象思维2

以不变应万变的mvc套路：


## WebPack

### 目标1
用webpack转译js

途径：
* 进入webpack官网
* crm学习法

### 目标2
理解文件名中的hash的用途

附加知识：
http响应头中的cache-control

## VUE

### 插值语法

```js
{{name}}

new Vue({
    data:{
        name:'frank'
    }
})
```

### 元素属性绑定

v-bind:value用于单向绑定，简写为`:value`
v-moudel:value用于双向绑定，并不是所有元素都支持双向绑定，表单、输入类元素才支持，因为可以交互，简写为`v-model`

标准写法：
```js
<div id="demo">
        单向数据绑定：<input type="text" v-bind:value="value"><br/>
        双向数据绑定：<input type="text" v-model:value="value">
</div>
```
简写：
```js
<div id="demo">
        单向数据绑定：<input type="text" :value="value"><br/>
        双向数据绑定：<input type="text" v-model="value">
</div>
```

### el与data的两种写法

el：或者 vm.$mount
data:{}对象式 或者 data(){return{}}函数式

Vue管理的函数不要用箭头函数，因为箭头函数中的this会指代window，而不是vue这个实例。

### MVVM模型

M是模型model，data中的数据
V是视图view，html，template代码
VM就是ViewModel，Vue实例

mvvm模型的工作机制：
dom=>domlistener=>model
dom<=binder<=model

最终{{}}中，实际引用了通过vm创建的实例的属性，无论是自己在data中定义的还是vue原型带的都能用。
