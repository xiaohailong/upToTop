//用闭包形式来写，前面加;是防止跟其他js压缩时报错
;(function(global){
    //开启严格模式
    "use strict";
    //默认参数
    var defaultSettings = {
       speed:1.1,//速度,越大越快，每time滑动到当前距离顶部的距离除以speed的位置
       time:16.7//时间，定时器的时间，并不是回到顶部总用时间
    };
    //构造函数定义一个类，传参数
    function upToTop(options) {
        var _this = this;
        _this.options = {};
        _this.options.speed = options.speed || defaultSettings.speed;
        _this.options.time = options.time || defaultSettings.time;
        _this.init();
    };
    //原型链上提供方法
    upToTop.prototype = {
        //定义方法
        init:function(){
          this.initUI();
          this.eventBind();
        },
        initUI:function(){
            this.btn = document.querySelector('.js-backToTop');
            var body = document.getElementsByTagName('body')[0];
            if(!this.btn){
                var div = document.createElement('div');
                div.classList.add('js-backToTop','backToTop');
                body.appendChild(div);
                this.btn = document.querySelector('.js-backToTop');
            }
        },
        eventBind:function(){
            var _this = this;
            var options = _this.options;
            _this.btn.addEventListener('click',function(){
                _this.goTop(options);
            },false);
            var timeoutFlag;
            window.onscroll = function(){
                if(timeoutFlag) {
                    window.clearTimeout(timeoutFlag);
                    timeoutFlag = null;
                }
                timeoutFlag = window.setTimeout(function(){
                    _this.showOrHide();
                }, 200);
            }
        },
        goTop:function(options){
            var _this = this;
            var speed = options.speed;
            var time = options.time;
            var x = document.documentElement.scrollLeft || document.body.scrollLeft;
            var y = document.documentElement.scrollTop || document.body.scrollTop;
            window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
            if (x > 0 || y > 0) {
                window.setTimeout(function(){
                    _this.goTop(options);
                }, time);
            }
        },
        showOrHide:function(){
            var _this = this;
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            top > 0 ? _this.btn.style.display="block":_this.btn.style.display="none";
        }

    };

    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = upToTop;
    };
    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() {
        return upToTop;
    });
    //注册全局变量，兼容直接使用script标签引入插件
    global.upToTop = upToTop;
})(this);