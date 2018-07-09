(function(){

    $.fn.is_on_screen = function(){
     
        var win = $(window);
         
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
         
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
         
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
         
    };

    var animEl = function(a, b){
        if( a.length > 0 ) { 
            if( a.is_on_screen() ) { 
                    a.addClass(b); 
            }
        }
        $(window).scroll(function(){ 
            if( a.length > 0 ) { 
                if( a.is_on_screen() ) { 
                    a.addClass(b);
                }
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function(){

        // scroll

        var headerHeight = $("nav").innerHeight();

        $(".price-list-btn, .main-btn a, .btn-intro-more, .feature2-btn, .feedback-btn, .to-top").click(function(){

            var selector = $(this).attr("href"); 
            var targetEl = $(selector);
            
            $("html, body").animate({
                scrollTop: targetEl.offset().top - headerHeight
            }, 500);
    
            return false;
    
        });

        $(".div-nav a, .div-logo a").click(function(){

            var selector = $(this).attr("href"); 
            var targetEl = $(selector);
            
            $("html, body").animate({
                scrollTop: targetEl.offset().top
            }, 500);
    
            return false;
    
        });

        // Form

        var form = document.querySelector('.main-feedback-form');

        form.addEventListener('submit', function(e){
            e.preventDefault();
            var method = this.getAttribute('method');
            var action = this.getAttribute('action');

            var name = this.querySelector("input[name='name']").value;
            var email = this.querySelector("input[name='email']").value;

            console.log(method, action, name, email);

            var ajax = new XMLHttpRequest();

           var postData ="name=" + name;
           postData +="&email=" + email;

           ajax.open(method, action, true);
           ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
           ajax.send(postData);


            ajax.onreadystatechange = function(){
                if( ajax.readyState !=4 ) return;

                var message = "";

                if( ajax.responseText === 'ok' ){
                    message = "Спасибо за вашу заявку";
                }else if(ajax.responseText === 'error'){
                    message = "Произошла ошибка";
                }

                alert(message);
            }
        });

        // 2 Form

        var form1 = document.querySelector('.feedback-order-form');

        form1.addEventListener('submit', function(e){
            e.preventDefault();
            var method = this.getAttribute('method');
            var action = this.getAttribute('action');

            var name = this.querySelector("input[name='name']").value;
            var email = this.querySelector("input[name='email']").value;
            var services = this.querySelector("textarea[name='wishes']").value;

            console.log(method, action, name, email, services);

            var ajax = new XMLHttpRequest();

           var postData ="name=" + name;
           postData +="&email=" + email;
           postData +="&wishes=" + services;

           ajax.open(method, action, true);
           ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
           ajax.send(postData);


            ajax.onreadystatechange = function(){
                if( ajax.readyState !=4 ) return;

                var message = "";

                if( ajax.responseText === 'ok' ){
                    message = "Спасибо за вашу заявку";
                }else if(ajax.responseText === 'error'){
                    message = "Произошла ошибка";
                }

                alert(message);
            }
        });

        // Wishes

        $(".price-btn-1").click(function(){
            $('textarea').html("Я хочу сайт визитку.");
        });

        $(".price-btn-2").click(function(){
            $('textarea').html("Я хочу сайт компании.");
        });

        $(".price-btn-3").click(function(){
            $('textarea').html("Я хочу интернет-магазин.");
        });

        $(".price-btn-4").click(function(){
            $('textarea').html("Я хочу интернет-портал.");
        });


        // up-arrow

        $(function() {
            $(window).scroll(function(){
                var distanceTop = $('.our-aims').offset().top;
                if  ($(window).scrollTop() > distanceTop)
                    $('.to-top').css("display", "inline-block");
                else
                    $('.to-top').css("display", "none");
            });
        });

        // открытие меню

        $(".cross").click(function(){
            $("header").toggleClass("head-active");
            // $(".div-nav").toggleClass('act');
            $(".cross").toggleClass("active");
        });

        $(".wow").click(function(){
            console.log("lalal");
        });

        // // Fixed-menu

        var h_hght = $('.black-bg').height();
        
        $(function(){

            if ($(this).scrollTop() >= h_hght){
                $('header').addClass('stickytop');
            }

            $(window).scroll(function() {
                if($(this).scrollTop() >= h_hght) {
                    $('header').addClass('stickytop');
                }
                else{
                    $('header').removeClass('stickytop');
                }   
            });
        });

        // resize, чтобы не было проблем с nav при переходах

        $(window).resize(function(){
            var h_hght = $('.black-bg').height();

            $(function(){

                if ($(this).scrollTop() >= h_hght){
                    $('header').addClass('stickytop');
                }
    
                $(window).scroll(function() {
                    if($(this).scrollTop() >= h_hght) {
                        $('header').addClass('stickytop');
                    }
                    else{
                        $('header').removeClass('stickytop');
                    }   
                });
            });
        });

        // SLIDER

        var sliderEl = $(".slider-main");
        var sliderBox = sliderEl.find(".box");
        var sliderItems = sliderBox.find(".item");
        var sliderCount = sliderItems.length;
        var oneSlideSize = sliderEl.width();
        var intervalID = -1;

        var bulletsBox = sliderEl.find(".bullets");

        var nowSlideShow = 0;

        sliderBox.css({
            'width': oneSlideSize * (sliderCount + 2) + "px",
            'height': sliderEl.height() + "px",
            'left': (nowSlideShow - 1) * oneSlideSize + "px"
        });

        sliderItems.css({
            "width": oneSlideSize + "px",
            "height": sliderEl.height() + "px",
            "background-size": "cover"
        });

        var firstEl = sliderItems.first().clone();
        sliderBox.prepend(sliderItems.last().clone());
        sliderBox.append(firstEl);

        renderBullets(0);

        function changeSlide(){
            clearInterval(intervalID);
            
            sliderEl.addClass('animated');
            sliderBox.animate({
                "left": -(nowSlideShow * oneSlideSize) - oneSlideSize + "px"
            }, 500, function(){
                if(nowSlideShow === sliderCount){
                    nowSlideShow = 0;
                }else if(nowSlideShow === -1){
                    nowSlideShow = sliderCount - 1;
                }

                sliderBox.css("left", -(nowSlideShow * oneSlideSize) - oneSlideSize + "px");       

                sliderEl.removeClass('animated');
                renderBullets(nowSlideShow);
            });
        }

        function renderBullets(nowSlide){
            if( !bulletsBox.hasClass('ready') ){
                sliderItems.each(function(index){
                    var bullet = $("<div></div>");
                    bullet.addClass("circle");
                    
                    if(nowSlide === index){
                        bullet.addClass("active");
                    }
    
                    bulletsBox.append(bullet);
                });
    
                bulletsBox.addClass("ready");
            }else{
                bulletsBox.find(".circle").removeClass("active").eq(nowSlide).addClass("active");
            }
        }
    
        $(".bullets").on("click", ".circle", function(){
            if(sliderEl.hasClass("animated")) return;
    
            nowSlideShow = $(".bullets .circle").index( $(this) );
    
            changeSlide();
        });

        // RESIZE SLIDER

        $(window).resize(function(){
            var sliderEl = $(".slider-main");
            var sliderBox = sliderEl.find(".box");
            var sliderItems = sliderBox.find(".item");
            var sliderCount = sliderItems.length;
            var oneSlideSize = sliderEl.width();
    
            sliderBox.css({
                'width': oneSlideSize * (sliderCount + 2) + "px",
                'height': sliderEl.height() + "px",
                'left': (nowSlideShow - 1) * oneSlideSize + "px"
            });
    
            sliderItems.css({
                "width": oneSlideSize + "px",
                "height": sliderEl.height() + "px",
                "background-size": "cover"
            });

            sliderBox.css("left", -(nowSlideShow * oneSlideSize) - oneSlideSize + "px"); 
        });

        // Анимация блоков

        var anim = $('.headline');
        var btn = $('.main-btn');
        var logo = $('.main-logo');
        var lendText = $('.lending-text');
        var feedback = $('.feedback-main');
        var aim1 = $('.aims-block1');
        var aim2 = $('.aims-block2');
        var imf = $('.img-feature');
        var bef = $('.notebook:before');
        var feature2_left = $('.feature2-headline');
        var feature2_right = $('.feature2-img');
        var feedback_h2 = $('.feedback-h2');
        var feedback_left = $('.feedback-left');
        var price_h2 = $('.price-list-h2');
        var price_stick = $(".price-stick");
        var client_h2 = $('.client-h2');
        var client_stick = $('.client-stick');
        var slider_h2 = $('.slider-h2');
        var slider_stick = $('.slider-stick');
        var slider_main = $('.slider-main');
        var info_block = $('.block-info');
        var input_name = $('.input-name');
        var input_email = $('.input-email');
        var textarea = $('.wishes');
        var btn_submit = $('.btn-submit');

        // First 4 blocks delay
        var i1 = $('.fa-lightbulb');
        var i2 = $('.fa-dollar-sign');
        var i3 = $('.fa-chart-line');
        var i4 = $('.fa-users-cog');

        // Second 4 blocks delay
        var b1 = $('.price-box1');
        var b2 = $('.price-box2');
        var b3 = $('.price-box3');
        var b4 = $('.price-box4');

        // Third 4 blocks delay
        var c1 = $('.finnair');
        var c2 = $('.eventworld');
        var c3 = $('.letidor');
        var c4 = $('.viking');

        // Fourth 4 blocks delay
        var s1 = $('.twi');
        var s2 = $('.fb');
        var s3 = $('.gog');
        var s4 = $('.inst');

        // Delay (first, third, fourth) 4 blocks (less)
        animEl(i1, 'animated-first-down');
        animEl(i2, 'animated-second-down');
        animEl(i3, 'animated-third-down');
        animEl(i4, 'animated-fourth-down');

        animEl(c1, 'animated-first-down');
        animEl(c2, 'animated-second-down');
        animEl(c3, 'animated-third-down');
        animEl(c4, 'animated-fourth-down');

        animEl(s1, 'animated-first-down');
        animEl(s2, 'animated-second-down');
        animEl(s3, 'animated-third-down');
        animEl(s4, 'animated-fourth-down');

        // Delay (second) 4 blocks (more)
        animEl(b1, 'animated-first-down_more');
        animEl(b2, 'animated-second-down_more');
        animEl(b3, 'animated-third-down_more');
        animEl(b4, 'animated-fourth-down_more');


        animEl(anim, 'animated-horiz');
        animEl(aim1, 'animated-horiz');
        animEl(btn, 'animated-horiz');
        animEl(imf, 'animated-horiz');
        animEl(feature2_left, 'animated-horiz');
        animEl(feedback_left, 'animated-horiz');
        animEl(price_h2, 'animated-horiz');
        animEl(client_h2, 'animated-horiz');
        animEl(slider_h2, 'animated-horiz');

        animEl(aim2, 'animated-horiz-right');
        animEl(feature2_right, 'animated-horiz-right');
        animEl(feedback_h2, 'animated-horiz-right');
        animEl(price_stick, 'animated-horiz-right');
        animEl(client_stick, 'animated-horiz-right');
        animEl(slider_stick, 'animated-horiz-right');

        animEl(logo, 'animated-vert');
        
        animEl(lendText, 'animated-vert-down');
        animEl(feedback, 'animated-vert-down');
        animEl(bef, 'animated-vert-down');
        animEl(info_block, 'animated-vert-down');
        animEl(input_name, 'animated-vert-down');
        animEl(input_email, 'animated-vert-down');
        animEl(textarea, 'animated-vert-down');
        animEl(btn_submit, 'animated-vert-down');
        animEl(slider_main, 'animated-vert-down');

    });
})();