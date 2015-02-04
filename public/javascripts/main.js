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

    preloadimages(['/public/images/fangkuai.png','/public/images/heitao.png',
        '/public/images/hongtao.png','/public/images/meihua.png'
    ]).done(function() {
        $('#loading').remove();
        $('.time').addClass('timesOut');
        $('.item').addClass('zoomInDown');

        $('#pokers').on('click',function(){
            $(this).toggleClass('open');
        })
    });




})