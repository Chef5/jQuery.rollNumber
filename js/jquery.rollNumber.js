(function($) {
  $.fn.rollNumber = function(options) {
    let $self = this;
    if(options.number === undefined) return;
    let number = options.number,
        speed = options.speed || 500,
        interval = options.interval || 100,
        fontStyle = options.fontStyle,
        rooms = options.rooms || String(options.number).split('').length,
        _fillZero = !!options.rooms;
    fontStyle.color = fontStyle.color || '#000'; 
    fontStyle['font-size'] = fontStyle['font-size'] || 14;
    // 计算单个数字宽度
    $self.css({
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'font-size': fontStyle['font-size'],
      color: 'rgba(0,0,0,0)'
    }).text(number);
    let _height = $self.height();
    let space = options.space || _height/2;
    $self.empty(options);

    // 添加滚动元素
    let numberHtml = '';
    for (let i = 0; i < 10; i++) numberHtml += `<span style="display: block; width: ${ space }px; height: ${ _height }px; line-height: ${ _height }px; text-align: center; ${ Object.keys(fontStyle).join(': inherit; ') + ': inherit;' }">${ i }</span>`;
    numberHtml = `<div class="_number" style="width: ${ space }px; height: ${ _height }px; line-height: ${ _height }px; display: flex; justify-content: center; align-items: center;"><div style="position: relative; width: ${ space }px; height: ${ _height }px; overflow: hidden;"><div style="position: absolute; width: 100%;">${ numberHtml }</div></div></div>`
    if (!!options.symbol) { // 含千分位
      let appendHtml = [];
      let symbolHtml = `<span style="display: block; width: ${ space }px; height: ${ _height }px; line-height: ${ _height }px; text-align: center; ${ Object.keys(fontStyle).join(': inherit; ') + ': inherit;' }">${ options.symbol }</span>`;
      symbolHtml = `<div class="_number" style="width: ${ space }px; height: ${ _height }px; line-height: ${ _height }px; display: flex; justify-content: center; align-items: center;"><div style="position: relative; width: ${ space }px; height: ${ _height }px; overflow: hidden;"><div style="position: absolute; width: 100%;">${ symbolHtml }</div></div></div>`;
      for (let i = 0; i < rooms; i++) {
        appendHtml.push(numberHtml);
        if(rooms > 3 && i != 0 && (rooms - i) != 1 && (rooms - i)%3 == 1) {
          appendHtml.push(symbolHtml);
        }
      }
      $self.append(appendHtml.join('')).css(fontStyle);
    }else {
      $self.append(numberHtml.repeat(rooms)).css(fontStyle);
    }
    // 处理数字
    let numArr = (number+'').split('');
    if (_fillZero) { // 前置补0
      for (let i = numArr.length; i < rooms; i++) {
        numArr.unshift(0);
      }
    }
    let domArr = $self.find('._number');
    if(!!options.symbol) { // 含千分位：重新处理数字，增加千分位占位
      numArr = numArr.reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + options.symbol)) + prev;
      })
      numArr = numArr.split('');
    }

    for (let i = 0; i < domArr.length; i++) {
      setTimeout(function(dom, n) {
        $(dom.children[0].children[0]).animate({
          'top': -_height * n + 'px' // 千分位*number = NaN px
        }, speed);
      }, interval*(domArr.length - i), domArr[i], numArr[i]);
    }
  }
})(jQuery);
