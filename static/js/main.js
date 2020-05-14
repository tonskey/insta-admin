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
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/37899041_224036628308916_4160375562247864320_n.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=xdjBGB6EPr0AX-8Qkeu&oh=cd06cb270256481e6a1b9cfe57bd0c15&oe=5ED3BFA8',
   'bill_gates'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/91562059_2048846118592713_8898328701440098304_n.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=B9aIBOAqsNcAX-gP8KV&oh=c562918f5a9413f8e038e26cb17df472&oe=5ED33110',
   'brad_pitt'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/20184891_597176314003189_5042749071060631552_a.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=gcpIiqz-cuQAX9Hc2cG&oh=c430d36f1bdfc5c0c48d8ff17266323b&oe=5ED3A798',
   'donald_trump'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/81896426_2718179911571808_8276748815181021184_n.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=yjuhKCc01ZUAX-hNyl6&oh=2bd1893e406f2f4fc25684bb98dfc941&oe=5ED0A927',
   'your_mum'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/12142396_1652894534995275_1391547252_a.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=yfsDBRAto4sAX9PPo54&oh=863f65ecdb2b3fe1db137e69487598dc&oe=5ED3762B',
   'bruh_moment'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/94894700_926165264464157_4522416836871979008_n.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=MQ2hqGyQIY8AX8aqpS4&oh=30638b1f304c448ab3f2243a092db820&oe=5ED0765E',
   'some_guy'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/72288978_1230823113770382_6398467382217539584_n.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=eDT2rLSe3t0AX9HE1y8&oh=89d2c71510aadff857d2f365003a032a&oe=5ED11136',
   'juicy_pickle'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/87511117_183410122964264_7092631850706796544_n.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=B4eemPMKmucAX-CU8OA&oh=bf814f216789bc1d157d0150dbdcf7a4&oe=5ED27F8E',
   'the_weeknd'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/38813888_2142070842705216_1686853091313319936_n.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=b-hYuAr_qdUAX_E5NdT&oh=8634a8f42138060c8c4cb952ce5fa269&oe=5ED26145',
   'some_kardashian'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/10747904_564690676996485_459751565_a.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=ZrgTmV5BKqsAX9BqHDU&oh=6cff2603b031640ac2c2e8d457a7b080&oe=5ED23FF6', 'mark_zuckenberg'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/s150x150/17125563_126752104517672_3684588731693531136_a.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=qoa1LiQWjmAAX8HSUTs&oh=79524e454130faf0f63ff6790ca6313e&oe=5ED37280', 'stanley_kubrick'],
  ['https://instagram.fiev25-1.fna.fbcdn.net/v/t51.2885-19/11326689_436628169842894_802958519_a.jpg?_nc_ht=instagram.fiev25-1.fna.fbcdn.net&_nc_ohc=dBjO78d-0WIAX_Np562&oh=e70139f2db11713265b299d7d8871d6f&oe=5ED02EB5', 'chris_nolan']
];


 function buildSlotItem(text, image) {
     return $('<div>').addClass('slottt-machine-recipe__item row') //
         .text(text)
         /*.prepend($('<img>', {
                      id: 'avatars',
                      src: image
                  }))*/
 }

 function buildSlotContents($container, users) {
     for (var i = 0; i < users.length; i++) {
         user_names.push(users[i][1]);
         user_avatars.push(users[i][0]);
     }

     for (var i = 0; i < user_names.length; i++) {
         $items.push(buildSlotItem(user_names[i], user_avatars[i]))
     }
     //$items = user_names.map(buildSlotItem);

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
     /*
     url = "";
     if ($('.form-control').val().search("instagram.com") >= 0) {
         url = $('.form-control').val();
     } else {
         url = "https://www.instagram.com/" + $('.form-control').val();
     }
     $('.form-control').val("");
     */
     url = "https://www.instagram.com/" + $('.form-control').val();
     $.ajax(url, {
         statusCode: {
             405: function () {

             },
             404: function () {
                 //alert("No such account!");
                 $("#got_it").text("Error!");
                 $("#followers_number").text("No such account");
                 $("#check_account").fadeTo(0, 1);
                 //console.log('Oh no!');
             },
             200: function () {
                 //getFollowersNumber(url);
                 if ($('.form-control').val() != "") {
                     $("#got_it").text("Got it!");
                     $("#followers_number").text("Number of followers : some");
                     $("#check_account").fadeTo(0, 1);
                 }
                 //console.log('Yay!');
             }
         }
     });
 }

 /*)
  function getFollowersNumber(link) {
      $.ajax({
          url: link,
          dataType: 'text',
          success: function (data) {
              console.log(data);
              var elements = $("<span>").html(data)[0].getElementsByClassName("g47SY");
              console.log(elements.firstChild.nodeValue);
              for (var i = 0; i < elements.length; i++) {
                  var theText = elements[i].firstChild.nodeValue;
                  console.log(theText);
                  // Do something here
              }
          }
      });

  }*/

 $(document).ready(function () {
     var url = "";

     /*
     $("input").blur(function () {
         console.log("ASD");
         $("input").removeClass("acc_input_green");
         $("input").removeClass("acc_input_red");
         $("#no_acc_msg").fadeTo(0, 0);
         $("input").val('');
     });*/

     $("#logo").click(function () {
         $('html, body').animate({
             scrollTop: $($.attr(this, 'href')).offset().top - 70
         }, 500, function () {
             // window.location.hash = href;
         });
     })


     $(".form-control").keypress(function (e) {
         if (e.which === 13) {
             e.preventDefault();
             $(".form-control").submit(function () {
                 return false;
             });
             getFollowersPress();
         }
     });

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

     //animate.clearQueue().stop();
     //animate.stop(true, true );

     $("#shuffle").click(function () {
         clearInterval(interval);
         setTimeout(function () {
             animate();
             // Do something after 5 seconds
         }, 100);
         //buildSlotContents($wordbox, users);
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
