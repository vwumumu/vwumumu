---
id: 'useful-js'
title: '有用的JS代码段'
---

# 有用的JS代码段

//实现点击分类标签显示相应内容
```javascript
import $ from "jquery";

const $tabBar = $("#app2 .tab-bar");
const $tabContent = $('#app2 .tab-content')

$tabBar.on("click", "li", e => {
    const $li = $(e.currentTarget);
    const index = $li.index()
    console.log(index)
    $tabContent.children()
        .eq(index).addClass('active')
        .siblings().removeClass('active')
});
```

# 从Binance获取BTC价格
fetch('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT')
.then(r => r.json()
.then(j => console.log(parseFloat(j.price).toFixed(2))));