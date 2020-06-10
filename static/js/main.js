 AOS.init({
     duration: 800,
     easing: 'slide'
 });

 // IFTTT Slottt Machine by Jen Hamon
 // jen@ifttt.com
 // github.com/jhamon
 
 var json_list;
 var json_list_num;
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

 var standart_list = true;
 var dont_shuffle = false;

 function shuffle_array(array) {
     var tmp, current, top = array.length;
     if (top)
         while (--top) {
             current = Math.floor(Math.random() * (top + 1));
             tmp = array[current];
             array[current] = array[top];
             array[top] = tmp;
         }
     return array;
 }

 function buildSlotItem(text) {
     return $('<div>').addClass('slottt-machine-recipe__item row') //
         .text(text)
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

     $("#sf_field").removeClass("acc_input_red");
     $("#sf_field").removeClass("acc_input_green");
     if ($("#gf_control").val().split(",").length == 1) {
         url = "https://www.instagram.com/" + $('.form-control').val();
         $.ajax(url, {
             statusCode: {
                 405: function () {

                 },
                 404: function () {
                     $("#got_it").text("Error!");
                     $("#followers_number").text("No such account");
                     $('#loading').text("");
                     $("#check_account").fadeTo(0, 1);
                 },
                 200: function () {
                     if ($('.form-control').val() != "") {
                         $("#got_it").text("Processing");
                         $("#followers_number").text("");
                         $('#loading').text("");
                         $("#check_account").fadeTo(0, 1);

                         api_url = 'https://4d3f9614c537.ngrok.io/api/account_info/' + $('.form-control').val();

                         $.getJSON(api_url, function (data) {
                             if (data.is_private) {
                                 $("#got_it").text("Sorry");
                                 $("#followers_number").text("You are trying to access private account!");
                                 $('#loading').text("");
                                 $("#check_account").fadeTo(0, 1);
                                 standart_list = true;
                                 $(".slottt-machine-recipe").remove();
                                 $("#sf_field").val("1");

                                 $("#winners_msg").text("Followers of this account cannot be shuffled!");
                                 $("#winners_msg").fadeTo(0, 1);

                                 dont_shuffle = false;

                             } else if (parseInt(data.num_of_foll) < 1) {
                                 $("#got_it").text("Sorry");
                                 $("#followers_number").text("Your account does not have any followers!");
                                 $('#loading').text("");
                                 $("#check_account").fadeTo(0, 1);
                                 standart_list = true;
                                 $(".slottt-machine-recipe").remove();
                                 $("#sf_field").val("1");

                                 $("#winners_msg").text("Followers of this account cannot be shuffled!");
                                 $("#winners_msg").fadeTo(0, 1);

                                 dont_shuffle = false;

                             } else if (parseInt(data.num_of_foll) > 10000) {
                                 $("#got_it").text("Error!");
                                 $("#followers_number").text("Number of followers: " + data.num_of_foll);
                                 $("#loading").text("Sorry, currently we cannot process so many followers");
                                 $("#check_account").fadeTo(0, 1);
                                 standart_list = true;
                                 $(".slottt-machine-recipe").remove();
                                 $("#sf_field").val("1");

                                 $("#winners_msg").text("We can't process this many followers");
                                 $("#winners_msg").fadeTo(0, 1);

                                 dont_shuffle = false;
                             } else {
                                 json_list_num = data.num_of_foll;
                                 $("#got_it").text("Got it!");
                                 $("#followers_number").text("Number of followers: " + data.num_of_foll);
                                 $('#loading').text("Loading...");
                                 $("#check_account").fadeTo(0, 1);

                                 api_url_2 = 'https://4d3f9614c537.ngrok.io/api/followers/' + data.user_id;


                                 $.getJSON(api_url_2, function (data) {
                                     clearInterval(interval);
                                     $('.slottt-machine-recipe__items_container').empty();
                                     $(".slottt-machine-recipe").remove();

                                     $("#sf_field").val("1");

                                     if (data.foll_list == null) {
                                         //alert("Instagram server error");
                                         $('#loading').text("Sorry, instagram server error");
                                     } else {
                                         users = data.foll_list;
                                         standart_list = false;
                                         dont_shuffle = false;
                                         // $("#winners_msg").fadeTo(1, 0);
                                         $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
                                         buildSlotContents($wordbox, data.foll_list);
                                         //interval = setInterval(animate, 2000);
                                         $('#loading').text("All followers loaded!");
                                     }
                                 });
                             }
                         });
                     }
                 }
             }
         });

     } else {

         var all_followers;
         var flag = false;
         var foll_array = $("#gf_control").tagsinput('items');
         var url_names = "";
         var j;
         for (j = 0; j < foll_array.length; j++) {
             url_names += foll_array[j] + "&";
         }


         url_names = url_names.substring(0, url_names.length - 1);

         //url = "https://instaadminback.herokuapp.com/api/get_accounts_info/" + url_names;

         url = "https://4d3f9614c537.ngrok.io/api/get_accounts_info/" + url_names;
         $("#got_it").text("Processing");
         $("#followers_number").text("");
         $('#loading').text("");
         $("#check_account").fadeTo(0, 1);


         try {

             $.getJSON(url, function (data) {
                 if (parseInt(data.number_of_all_foll) > 10000) {
                     $("#got_it").text("Error!");
                     $("#followers_number").text("Sorry, currently we cannot process so many followers");
                     $('#loading').text("");
                     $("#check_account").fadeTo(0, 1);
                     dont_shuffle = false;
                     standart_list = true;
                 } else if (data.msg == "Success") {
                     $("#got_it").text("Got it!");
                     $("#followers_number").text("Number of joint followers: ...");
                     $('#loading').text("Loading...");
                     $("#check_account").fadeTo(0, 1);

                     api_url_3 = 'https://4d3f9614c537.ngrok.io/api/multiple_followers/' + data.user_ids;


                     $.getJSON(api_url_3, function (data) {
                         clearInterval(interval);
                         $('.slottt-machine-recipe__items_container').empty();
                         $(".slottt-machine-recipe").remove();

                         $("#sf_field").val("1");

                         if (data.msg == "Error") {
                             $("#got_it").text("Error!");
                             $("#followers_number").text("Sorry, instagram server error");
                             $('#loading').text("");
                             $("#check_account").fadeTo(0, 1);
                             dont_shuffle = false;
                             standart_list = true;
                         } else {
                             if (data.len_of_cross_list == 0) {
                                 $("#got_it").text("Error!");
                                 $("#followers_number").text("Sorry, joint followers list is empty");
                                 $('#loading').text("");
                                 $("#check_account").fadeTo(0, 1);
                                 standart_list = true;
                                 dont_shuffle = false;
                             } else {
                                 users = data.cross_list;
                                 all_followers = data.len_of_cross_list;
                                 json_list_num = all_followers;
                                 standart_list = false;
                                 dont_shuffle = false;
                                 $("#winners_msg").fadeTo(1, 0);
                                 $("#followers_number").text("Number of joint followers: " + data.len_of_cross_list);
                                 $('#loading').text("All followers loaded!");
                             }
                         }
                     });
                 } else {
                     $("#got_it").text("Error!");
                     $("#followers_number").text("One or more account have issues");
                     $('#loading').text("");
                     $("#check_account").fadeTo(0, 1);
                     dont_shuffle = false;
                 }
             });
         } catch (err) {
             $("#got_it").text("Error!");
             $("#followers_number").text("One or more account have issues");
             $('#loading').text("");
             $("#check_account").fadeTo(0, 1);
             dont_shuffle = false;
         }




     }
 }



 function shuffle_click(prev_numb) {
     $("#sf_field").removeClass("acc_input_red");
     $("#sf_field").removeClass("acc_input_green");
     if (dont_shuffle) {
         $("#winners_msg").text("Followers of this account cannot be shuffled!");
         $("#winners_msg").fadeTo(0, 1);
         return;
     }

     var temp_json;
     temp_json = users;

     var array_ex_machina = [];
     var i;
     if (prev_numb == 0 || prev_numb != $("#sf_field").val()) {
         if ($("#sf_field").val() > 0 && $("#sf_field").val() <= 50) {

             if (standart_list) {

                 $("#winners_msg").fadeTo(1, 0);

                 var temp_standart_list = [

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

                 if ($("#sf_field").val() <= temp_standart_list.length) {


                     $(".slottt-machine-recipe").remove();
                     temp_standart_list = shuffle_array(temp_standart_list);

                     for (i = 1; i <= $("#sf_field").val(); i++) {

                         temp_standart_list = shuffle_array(temp_standart_list);

                         $('#shuffle_form').append('\
                                <div class="slottt-machine-recipe justify-content-center">\
                                    <div class="slottt-machine-recipe__mask" id="wordbox">\
                                        <div class="slottt-machine-recipe__items_container recipe_if">\
                                        </div>\
                                    </div>\
                                </div>\
                                             ');
                         $('.slottt-machine-recipe').each(function () {
                             var delay = $(this).index();
                             $(this).css('animation-delay', delay + 's');
                         });
                         clearInterval(interval);

                         $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
                         buildSlotContents($wordbox, temp_standart_list);
                         temp_standart_list.shift();
                     }

                     confetti({
                         particleCount: 100,
                         spread: 70,
                         angle: 60,
                         origin: {
                             x: 0.1,
                             y: 1
                         }
                     });

                     confetti({
                         particleCount: 100,
                         spread: 70,
                         angle: 120,
                         origin: {
                             x: 0.9,
                             y: 1
                         }
                     });
                 } else {
                     $("#winners_msg").text("You can choose only from 1 to " + users.length + " winners");
                     $("#winners_msg").fadeTo(0, 1);
                 }


             } else {

                 $("#winners_msg").fadeTo(1, 0);
                 $(".slottt-machine-recipe").remove();

                 var limit;
                 if (json_list_num > 50) {
                     limit = 50
                 } else {
                     limit = json_list_num;
                 }

                 if ($("#sf_field").val() > limit) {
                     $("#winners_msg").text("You can choose only from 1 to " + limit + " winners");
                     $("#winners_msg").fadeTo(0, 1);
                 } else {
                     temp_json = shuffle_array(temp_json);

                     for (i = 1; i <= $("#sf_field").val(); i++) {

                         while (array_ex_machina.includes(temp_json[0])) {
                             temp_json = shuffle_array(temp_json);
                         }




                         array_ex_machina.push(temp_json[0]);
                     }

                     for (i = 0; i < array_ex_machina.length; i++) {

                         $('#shuffle_form').append('\
                                <div class="slottt-machine-recipe justify-content-center">\
                                    <div class="slottt-machine-recipe__mask" id="wordbox">\
                                        <div class="slottt-machine-recipe__items_container recipe_if">' + array_ex_machina[i] + '\
                                        </div>\
                                    </div>\
                                </div>\
                                             ');
                         $('.slottt-machine-recipe').each(function () {
                             var delay = $(this).index();
                             $(this).css('animation-delay', delay + 's');

                         });
                     }



                     clearInterval(interval);
                     $wordbox = $('#wordbox .slottt-machine-recipe__items_container');


                     confetti({
                         particleCount: 100,
                         spread: 70,
                         angle: 60,
                         origin: {
                             x: 0.1,
                             y: 1
                         }
                     });

                     confetti({
                         particleCount: 100,
                         spread: 70,
                         angle: 120,
                         origin: {
                             x: 0.9,
                             y: 1
                         }
                     });
                 }
             }

         } else {
             $("#winners_msg").text("You can choose only from 1 to 50 winners");
             $("#winners_msg").fadeTo(0, 1);

         }

         prev_numb = $("#sf_field").val();

     }
 }


 $(document).ready(function () {
     var url = "";

     $('#gf_control').tagsinput({
         maxTags: 3,
         maxChars: 30,
         confirmKeys: [32, 44, 186],
         delimiter: ' ',
         trimValue: true
     });



     $("#logo").click(function () {
         $('html, body').animate({
             scrollTop: $($.attr(this, 'href')).offset().top - 70
         }, 500, function () {});
     })



     $('#get_followers').click(function () {
         getFollowersPress();
     });

     $('input').keyup(function () {
         $(this).val(function (_, v) {
             return v.replace(/\s+/g, '');
         });
         $(this).val(function (_, v) {
             return v.replace(/,/g, "");
         });

         url = "";
         if ($('input').val().search("instagram.com") >= 0) {
             url = $('input').val();
         } else {
             url = "https://www.instagram.com/" + $('input').val();
         }



         $.ajax(url, {
             statusCode: {
                 405: function () {},
                 404: function () {

                     $("input").removeClass("acc_input_green");
                     $("input").addClass("acc_input_red");
                     //$("#no_acc_msg").fadeIn(100);
                     $("#no_acc_msg").fadeTo(0, 1);

                 },
                 200: function () {
                     $("input").removeClass("acc_input_red");
                     $("input").addClass("acc_input_green");
                     $("#no_acc_msg").fadeTo(0, 0);
                 }
             }
         });
     });



     $wordbox = $('#wordbox .slottt-machine-recipe__items_container');
     buildSlotContents($wordbox, users);
     interval = setInterval(animate, 2000);

     var prev_numb = 0;

     $("#shuffle").click(function () {
         shuffle_click(prev_numb);
     });


     $(document).on('keypress', function (e) {
         if (e.which == 13) {
             e.preventDefault();

             var h = $(window).scrollTop();
             if (h < 200) {

                 getFollowersPress();


             } else if (h > 250) {
                 clearInterval(interval);
                 shuffle_click(prev_numb);
             }
         }
     });

 });


 document.querySelector("#sf_field").addEventListener("keypress", function (evt) {
     if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
         evt.preventDefault();
     }
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
