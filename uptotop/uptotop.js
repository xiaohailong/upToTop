var uptotop = {
    init:function(){
        this.initUI();
        this.initEvent();
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
    initEvent:function(){
        this.eventBind();
    },
    eventBind:function(){
        var _this = this;
        _this.btn.addEventListener('click',function(){
            _this.goTop();
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
    goTop:function(speed,time){
        var _this = this;
        speed = speed || 1.1;
        time = time || 16.7;
        var x = document.documentElement.scrollLeft || document.body.scrollLeft;
        var y = document.documentElement.scrollTop || document.body.scrollTop;
        window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
        if (x > 0 || y > 0) {
            window.setTimeout(function(){
                _this.goTop(speed,time);
            }, time);
        }
    },
    showOrHide:function(){
        var _this = this;
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        top > 0 ? _this.btn.style.display="block":_this.btn.style.display="none";
    }
}
uptotop.init();