
(function($){

    var methods = {

        isOpen:false,
        open:function(){
            //set max-height for the alert content
            //var alertMaxHValue = 300;
            //get target
            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;
            //get the current screen height
            var screenHeightValue = window.screen.height;
            var screenHeight = screenHeightValue + 'px';
            console.log("--screenHeight--" + screenHeight);
            //set 0
            $(elementIdString + ' .custom_alert_div').css("height","0");
            //set the height of the mask layer equal to the current screen height
            $(elementIdString + ' .custom_alert_mask_layer').css("height",screenHeight);
            $(elementIdString + ' .custom_alert_mask_layer').show();
            //set max-height
            $(elementIdString + ' .custom_alert_div').css("max-height",screenHeightValue/2+'px');
            $(elementIdString + ' .custome_alert_content').css("max-height",screenHeightValue/2+'px');
            //show custom_alert_div first
            $(elementIdString + ' .custom_alert_div').show();
            //if you want to get the height of the appending content,it must be displayed first
            var appendH = $(elementIdString + ' .custome_alert_content').children().css("height");
            console.log("---appendH---" + appendH);
            //set height;automatically adapt to height
            $(elementIdString + ' .custom_alert_div').animate({"height":appendH},200);
            $(elementIdString + ' .custome_alert_content').css("height",appendH);
            //fixed current page
            var currentPage = $.mobile.pageContainer.pagecontainer("getActivePage");
            //fiexd position for android
            var x=window.scrollX;
            var y=window.scrollY;
            window.onscroll=function(){
                window.scrollTo(x, y);
            };

            $.smartScroll($(currentPage), elementIdString + ' .custome_alert_content');

            //bing close event
            $(elementIdString + ' .custom_alert_mask_layer').off("click").on("click",function(){
                target.createAlert('close');
            });
            methods.isOpen = true;
        },

        close:function(){

            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;
            $(elementIdString + ' .custom_alert_mask_layer').hide();
            $(elementIdString + ' .custom_alert_div').animate({"height":"0"},200);

            var currentPage = $.mobile.pageContainer.pagecontainer("getActivePage");

            setTimeout(function(){
                $(elementIdString +' .custom_alert_div').hide();
            },200);

            //关闭时候解除绑定
            $(currentPage).unbind("touchmove");

            window.onscroll=function(){};
            methods.isOpen = false;
        },

        //fix the height of alert ,when the alert content changed
        fixAlertHeight:function(){

            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;
            var appendH = $(elementIdString + ' .custome_alert_content').children().css("height");
            $(elementIdString + ' .custom_alert_div').css("height",appendH);
            $(elementIdString + ' .custome_alert_content').css("height",appendH);
        },

        changeColor:function(color){

            var target = $(this);
            var elementId = target.attr("id");
            var elementIdString = '#'+elementId;

            $(elementIdString + ' .custom_alert_div').css("background-color",color);
        },

        isOpenAlert:function(){

            if(methods.isOpen == true){
                return true;
            }else{
                return false;
            }
        }
    };

    function buildAlert(options,target){

        var elementId = target.attr("id");
        var elementIdString = '#'+elementId;

        var inputContent = target.html();
        target.html("");
        var maskLayerDiv = '<div class="custom_alert_mask_layer"></div>';
        var alertDiv = '<div class="custom_alert_div">'+
            '<div class="custome_alert_content">'+
            '</div>'+
            '</div>';
        target.append(maskLayerDiv+alertDiv);
        $(elementIdString + ' .custome_alert_content').append(inputContent);

        target.createAlert('open');
    }

    //自定义插件
    $.fn.createAlert = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.createTableHtml');
        }
    };

    $.smartScroll = function(container, selectorScrollable) {
        // 如果没有滚动容器选择器，或者已经绑定了滚动事件，忽略
        if (!selectorScrollable || container.data('isBindScroll')) {
            return;
        }

        // 是否是搓浏览器
        // 自己在这里添加判断和筛选
        var isSBBrowser;

        var data = {
            posY: 0,
            maxscroll: 0
        };

        //handle event
        container.on({
            touchstart: function (event) {
                //var events = event.touches[0] || event;

                // 先求得是不是滚动元素或者滚动元素的子元素
                var elTarget = $(event.target);

                if (!elTarget.length) {
                    return;
                }

                var elScroll;

                // 获取标记的滚动元素，自身或子元素皆可
                if (elTarget.is(selectorScrollable)) {
                    elScroll = elTarget;
                } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
                    elScroll = null;
                }

                if (!elScroll) {
                    return;
                }

                // 当前滚动元素标记
                data.elScroll = elScroll;

                // 垂直位置标记
                data.posY = event.originalEvent.changedTouches[0].pageY;
                data.scrollY = elScroll.scrollTop();
                // 是否可以滚动
                data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
            },
            touchmove: function (event) {
                // 如果不足于滚动，则禁止触发整个窗体元素的滚动
                if (data.maxscroll <= 0 || isSBBrowser) {
                    // 禁止滚动
                    event.preventDefault();
                }
                // 滚动元素
                var elScroll = data.elScroll;

                //该部分是我自己加上的,点击遮罩层,elScroll为undefined
                if(!elScroll){
                    elScroll = $(event.target);
                    //return;
                }
                // 当前的滚动高度
                var scrollTop = elScroll.scrollTop();

                // 现在移动的垂直位置，用来判断是往上移动还是往下
                //var events = event.touches[0] || event;
                // 移动距离
                var distanceY = event.originalEvent.changedTouches[0].pageY - data.posY;

                if (isSBBrowser) {
                    elScroll.scrollTop(data.scrollY - distanceY);
                    elScroll.trigger('scroll');
                    return;
                }

                // 上下边缘检测
                if (distanceY > 0 && scrollTop == 0) {
                    // 往上滑，并且到头
                    // 禁止滚动的默认行为
                    event.preventDefault();
                    return;
                }

                // 下边缘检测
                if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                    // 往下滑，并且到头
                    // 禁止滚动的默认行为
                    event.preventDefault();
                    return;
                }

            },
            touchend: function () {
                data.maxscroll = 0;
                return true;
            }
        });

        //这里popup每一次关闭,touchmove都被解绑,所以需要每次open popup都要绑定
        //// 防止多次重复绑定
        //container.data('isBindScroll', true);
    };

})(jQuery);
