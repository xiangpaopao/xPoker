/**
 * Created by xiangpaopao on 2015/1/21.<xiangpaopao@gmail.com>
 */
var root = document.getElementsByTagName('html')[0],
    NATIVE_W = 640,
    NATIVE_H = 900;

function htmlSize() {
    var cw = 50,
        w = window.innerWidth,
        h = window.innerHeight;
    if ((w / h) > (NATIVE_W / NATIVE_H)) {
        cw = h / (NATIVE_H / 100);
    } else {
        cw = w / (NATIVE_W / 100);
    }
    root.style.fontSize = cw + 'px';
}
window.onload = htmlSize;
window.onresize = htmlSize;
Zepto(function($){

    var pokers = [];

    if (!isWeixinBrowser()) {
        $('#wp').html('<h2>请使用微信打开</h2>');
        $('#loading').remove();
        return
    }
    
    if ((location.search=="") || !localStorage) {
        $('#wp').html('<h2>非法操作或浏览器不支持</h2>');
        $('#loading').remove();
        return
    };


    var key = location.search.replace(/\?/, "")
    if (store.get(key)) {
        pokers = store.get(key);
    }else{
        for(var i=0;i<3;i++){
           var poker = {
               num: Math.ceil(Math.random()*13),
               type:Math.ceil(Math.random()*4)
           };
           pokers.push(poker);
        }

        pokers = _.sortBy(pokers, function (n) {
            return n.num;
        });
        store.set(key,pokers);
    }
    

    var htmlStr = '';
    $.each(pokers, function(index, item){
        var cl = '';
        if (index < 2) cl = 'nullClass';
        htmlStr = htmlStr + '<div class="item '+cl+'">'+
         '<div class="poker type'+item.type+' num'+item.num+'">'+
         '<div class="shape"></div><div class="shape"></div><div class="shape"></div>'+
         '<div class="no">?</div></div></div>';
    })


    $('#pokers').html(htmlStr)

    function isWeixinBrowser(){
        var ua = navigator.userAgent.toLowerCase();
        return (/micromessenger/.test(ua)) ? true : false ;
    }
    function preloadimages(arr) {
        var newimages = [],
            loadedimages = 0;
        var postaction = function() {};
        var arr = (typeof arr != "object") ? [arr] : arr;

        function imageloadpost() {
            loadedimages++;
            if (loadedimages == arr.length) {
                postaction(newimages)
            }
        }
        for (var i = 0; i < arr.length; i++) {
            newimages[i] = new Image();
            newimages[i].src = arr[i];
            newimages[i].onload = function() {
                imageloadpost()
            };
            newimages[i].onerror = function() {
                imageloadpost()
            }
        }
        return {
            done: function(f) {
                postaction = f || postaction
            }
        }
    }

    preloadimages(['images/fangkuai.png','images/heitao.png',
        'images/hongtao.png','images/meihua.png'
    ]).done(function() {
        $('#loading').remove();
        $('body').addClass('ready');
        $('#inputBox').show();
    });

    $('#start').on('click',function(){
        $('#inputBox').hide();
        $('.time').addClass('timesOut');
        $('.item').addClass('zoomInDown');

        $('#pokers').on('click',function(){
            $('.item').removeClass('nullClass');
            $(this).toggleClass('open');
        })
    })

})