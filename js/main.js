
// 简单demo
$('.number-normal .data').rollNumber({
  number: 123456,   //必需：显示数据
  // speed: 100,    //可选：每个数字滚动时长，取值"slow"、"fast" 或毫秒，默认：500
  // interval: 100, //可选：前后两个数字间隔时长，毫秒，默认：100
  // rooms: 9,      //可选：显示总位数，需大于等于数据长度，大于数据长度时前面补0，默认：等于数据长度
  // space: 90,     //可选：每个数字宽度，默认为：高度/2
  // symbol: ',',   //可选：千分位占位符，默认：false
  fontStyle: {      //可选：数字字体样式
    'font-size': 100,    //可选：默认14
    color: '#FF0000',    //可选：默认black
    // 其他文字样式，标准css均可以设置
    // 'font-family': 'LetsgoDigital',
    // 'font-weight': 700
  }
})

/*
* 深度自定义demo
* 内部样式结构：._number > div > div > span
* 该demo在css中，自定义了内部 ._number和span的样式
*/
$diy = $('.number-diy .data');
$diy.rollNumber({
  number: $diy[0].dataset.number, 
  speed: 500, 
  interval: 200,
  rooms: 9,
  space: 110,
  symbol: ',', 
  fontStyle: {
    'font-size': 102,
    'font-family': 'LetsgoDigital',
  }
})


