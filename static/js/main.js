 AOS.init({
     duration: 800,
     easing: 'slide'
 });

 // IFTTT Slottt Machine by Jen Hamon
 // jen@ifttt.com
 // github.com/jhamon

 var user_names = [];
 var user_avatars = [];
 var $items = [];
 var users = [

    'bill_gates',
    'brad_pitt',
    'donald_trump',
    'your_mum',
    'bruh_moment',
    'some_guy',
    'juicy_pickle',
    'the_weeknd',
    'some_kardashian',
    'mark_zuckenberg',
    'stanley_kubrick',
    'chris_nolan'
 ];


 function buildSlotItem(text) {
     return $('<div>').addClass('slottt-machine-recipe__item row') //
         .text(text)
         /*.prepend($('<img>', {
                      id: 'avatars',
                      src: image
                  }))*/
 }


 function buildSlotContents($container, users) {

     $items = users.map(buildSlotItem);

     $container.append($items);
 }

 function popPushNItems($container, n) {
     $children = $container.find('.slottt-machine-recipe__item');
     $children.slice(0, n).insertAfter($children.last());

     if (n === $children.length) {
         popPushNItems($container, 1);
     }
 }

 // After the slide animation is complete, we want to pop some items off
 // the front of the container and push them onto the end. This is
 // so the animation can slide upward infinitely without adding
 // inifinte div elements inside the container.
 function rotateContents($container, n) {

     setTimeout(function () {
         popPushNItems($container, n);
         $container.css({
             top: 0
         });
     }, 300);
 }

 function randomSlotttIndex(max) {

     var randIndex = (Math.random() * max | 0);
     return (randIndex > 10) ? randIndex : randomSlotttIndex(max);
 }


 function animate() {

     var wordIndex = randomSlotttIndex(users.length);
     $wordbox.animate({
         top: -wordIndex * 150
     }, 500, 'swing', function () {
         rotateContents($wordbox, wordIndex);
     });
 }


 function urlExists(url, callback) {
     $.ajax({
         type: 'HEAD',
         url: url,
         success: function () {
             callback(true);
         },
         error: function () {
             callback(false);
         }
     });
 }


 function getFollowersPress() {

     url = "https://www.instagram.com/" + $('.form-control').val();
     $.ajax(url, {
         statusCode: {
             405: function () {

             },
             404: function () {
                 $("#got_it").text("Error!");
                 $("#followers_number").text("No such account");
                 $("#check_account").fadeTo(0, 1);
             },
             200: function () {
                 if ($('.form-control').val() != "") {
                     api_url = 'https://instaadminback.herokuapp.com/api/followers/' + $('.form-control').val();

                     $.getJSON(api_url, function (data) {
                         console.log(data);
                         $("#got_it").text("Got it!");
                         $("#followers_number").text("Number of followers : " + data.length);
                         $("#check_account").fadeTo(0, 1);
                     });
                 }
             }
         }
     });
 }


 $(document).ready(function () {
     var url = "";


     $("#logo").click(function () {
         $('html, body').animate({
             scrollTop: $($.attr(this, 'href')).offset().top - 70
         }, 500, function () {
             // window.location.hash = href;
         });
     })



     $('#get_followers').click(function () {
         getFollowersPress();
     });

     $('.form-control').keyup(function () {

         url = "";
         if ($('.form-control').val().search("instagram.com") >= 0) {
             url = $('.form-control').val();
         } else {
             url = "https://www.instagram.com/" + $('.form-control').val();
         }



         $.ajax(url, {
             statusCode: {
                 405: function () {
                     console.log("asdasd");
                 },
                 404: function () {

                     console.log("NO");
                     $(".form-control").removeClass("acc_input_green");
                     $(".form-control").addClass("acc_input_red");
                     //$("#no_acc_msg").fadeIn(100);
                     $("#no_acc_msg").fadeTo(0, 1);

                 },
                 200: function () {
                     console.log("YAY");
                     $(".form-control").removeClass("acc_input_red");
                     $(".form-control").addClass("acc_input_green");
                     $("#no_acc_msg").fadeTo(0, 0);
                 }
             }
         });
     });



     $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
     buildSlotContents($wordbox, users);
     interval = setInterval(animate, 2000);


     $("#shuffle").click(function () {
         console.log(interval);
         clearInterval(interval);
         setTimeout(function () {
             animate();
         }, 100);
     });


     $(document).on('keypress', function (e) {
         if (e.which == 13) {
             e.preventDefault();

             var h = $(window).scrollTop();
             if (h < 200) {

                 getFollowersPress();


             } else if (h > 250) {
                 clearInterval(interval);
                 setTimeout(function () {
                     animate();
                     // Do something after 5 seconds
                 }, 100);
             }
         }
     });

 });





 (function ($) {

     "use strict";


     $(window).stellar({
         responsive: true,
         parallaxBackgrounds: true,
         parallaxElements: true,
         horizontalScrolling: false,
         hideDistantElements: false,
         scrollProperty: 'scroll'
     });


     var fullHeight = function () {

         $('.js-fullheight').css('height', $(window).height());
         $(window).resize(function () {
             $('.js-fullheight').css('height', $(window).height());
         });

     };
     fullHeight();

     // loader
     var loader = function () {
         setTimeout(function () {
             if ($('#ftco-loader').length > 0) {
                 $('#ftco-loader').removeClass('show');
             }
         }, 1);
     };
     loader();

     // Scrollax
     $.Scrollax();

     var onePageClick = function () {


         $(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
             event.preventDefault();

             var href = $.attr(this, 'href');

             $('html, body').animate({
                 scrollTop: $($.attr(this, 'href')).offset().top - 70
             }, 500, function () {
                 // window.location.hash = href;
             });
         });

     };

     onePageClick();


     // scroll
     var scrollWindow = function () {
         $(window).scroll(function () {
             var $w = $(this),
                 st = $w.scrollTop(),
                 navbar = $('.ftco_navbar'),
                 sd = $('.js-scroll-wrap');

             if (st > 150) {
                 if (!navbar.hasClass('scrolled')) {
                     navbar.addClass('scrolled');
                 }
             }
             if (st < 150) {
                 if (navbar.hasClass('scrolled')) {
                     navbar.removeClass('scrolled sleep');
                 }
             }
             if (st > 250) {
                 if (!navbar.hasClass('awake')) {
                     navbar.addClass('awake');
                 }

                 if (sd.length > 0) {
                     sd.addClass('sleep');
                 }
             }
             if (st < 250) {
                 if (navbar.hasClass('awake')) {
                     navbar.removeClass('awake');
                     navbar.addClass('sleep');
                 }
                 if (sd.length > 0) {
                     sd.removeClass('sleep');
                 }
             }
         });
     };
     scrollWindow();


     var contentWayPoint = function () {
         var i = 0;
         $('.ftco-animate').waypoint(function (direction) {

             if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

                 i++;

                 $(this.element).addClass('item-animate');
                 setTimeout(function () {

                     $('body .ftco-animate.item-animate').each(function (k) {
                         var el = $(this);
                         setTimeout(function () {
                             var effect = el.data('animate-effect');
                             if (effect === 'fadeIn') {
                                 el.addClass('fadeIn ftco-animated');
                             } else if (effect === 'fadeInLeft') {
                                 el.addClass('fadeInLeft ftco-animated');
                             } else if (effect === 'fadeInRight') {
                                 el.addClass('fadeInRight ftco-animated');
                             } else {
                                 el.addClass('fadeInUp ftco-animated');
                             }
                             el.removeClass('item-animate');
                         }, k * 50, 'easeInOutExpo');
                     });

                 }, 100);

             }

         }, {
             offset: '95%'
         });
     };
     contentWayPoint();


 })(jQuery);
