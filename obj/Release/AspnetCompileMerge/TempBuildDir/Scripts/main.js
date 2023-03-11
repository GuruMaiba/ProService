const priceModule = (function(){
  const init = () => {
    setUpListners();
    editWidthLine("#iPhons");
  }

  let otherBtn = $('#other-device');
  let otherModal = $('#modal-other-device');

  let setUpListners = function() {

    $('.price__select-device__list').on('click', 'input', changePrice);
    otherBtn.on('click', showModalOther);

    $('#iPad').on('click', function () {
       editWidthLine("#iPads");
       $("#iPads").children('.price__list_wrapper').first().addClass('activePage');
    });

    $('.nav__link_geo').click(showGeoMenu);

     $('#iPhone').on('click', function () {
       editWidthLine("#iPhons");
       $("#iPhons").children('.price__list_wrapper').first().addClass('activePage');
    });
  }//setUpListners

function showGeoMenu () {
  $('.geo-list').toggleClass('open-geo-list ');
}

  function showModalOther() {
     $('.modal-backdrop').css('display', 'block');
    otherModal.fadeIn();
  }

  let changePrice = function(e) {
    //двигаем линию
    let target = $(e.target);
    let targetPosition = target.data('position');
    let inputs = $("#iPhons").children('input');
    let parentId = target.parent().attr('id');

    $('.highline').css('transform', `translate3d(${targetPosition}00%, 0, 0)`);

    //изменияем страницк цен
    $(`#${parentId} .price__list_wrapper`).each(function(){

      let currentPage = $(this).data('page');
      if (currentPage == targetPosition) {
          $('.price__list_wrapper').removeClass('activePage');
          $(this).addClass('activePage');
      }
    });

  }//moveLine



 function editWidthLine (type) {

     $('.highline').css('transform', `translate3d(0%, 0, 0)`);
    let widthUnderline = $(type).width() / $(type).children('input').length;
    console.log($(type).children('.device__list').length);
    $('.highline').width(widthUnderline);
  }

  return {
    init
  }
})();//priceModule
priceModule.init();


const modalModule = (function(){
  const init = () => {
    setUpListners();
    $('.price').height($('.price__list_wrapper').height() + 150);
    changeTextInLabel();
  }

  let statusOfRepairs = $('#status-repairs');
  let callCourier = $('#call-courier');
  let writeManager = $('#write-manager');
  let modals = $('.modal');
  let other = $('#other');
  let sendOrder = $('#send-order');
  let sendReviews = $('#send-reviews');

  function editWidthLine (type) {

     $('.highline').css('transform', `translate3d(0%, 0, 0)`);
    let widthUnderline = $(type).width() / $(type).children('input').length;
    $('.highline').width(widthUnderline);
  }

  let setUpListners = function() {

    $("#burger-container").on('click', showNav);//при клике на "гамбургер" открывается меню на экранах < 768

    $('.burger-nav__list').on('click', 'a', closeNav);

    $(window).resize(function() {
        $('.price').height($('.price__list_wrapper').height() + 150);
        changeTextInLabel();
    });

    $('.callback-buttons__list').on('click',  showModal);
    $('.send-order').on('click', showModal);
    $('.reviews__link').on('click', showModal);
    $('.modal__close').on('click', closeModal);

    $('#nav__status').click(() => {
       $('.modal-backdrop').css('display',  'block');
       statusOfRepairs.fadeIn();
    });

    $('.modal-backdrop').on('click', () => {

      $('.modal-backdrop').css('display',  'none');

      if ( $('body').hasClass('modal-open')) {
        $('body').removeClass('modal-open');
      }

      if ( other.prop( 'checked' ) ) {

        editWidthLine("#iPhons");
        $("#iPhons").children('.price__list_wrapper').first().addClass('activePage');
        $('#iPhone').prop("checked", true);

      }

      modals.each(function(index, elem){
        let element = $(elem);
        if (element.css('display') == 'block') { element.fadeOut(); }
      });
    });//modal-backdrop
  }//setUpListners

  function closeModal() {

    if ( other.prop( 'checked' ) ) {

      editWidthLine("#iPhons");
      $("#iPhons").children('.price__list_wrapper').first().addClass('activePage');
      $('#iPhone').prop("checked", true);

    }

    if ( $('body').hasClass('modal-open')) {
       $('body').removeClass('modal-open');
    }

    let close = $(this).parent().parent();

    $('.modal-backdrop').css('display', 'none');
    if (close.css('display') == 'block') {
      close.fadeOut();
    }
  }

  const showModal = function(e) {
    e.preventDefault();
    let target = $(e.target);
   
    $('.modal-backdrop').css('display', 'block');

    $('body').addClass('modal-open');

    if (target.attr('id') === 'status-link') {
      statusOfRepairs.fadeIn();

    } else if (target.attr('id') === 'courier-link') {
      callCourier.fadeIn();

    } else if (target.attr('id') === 'write-link') {
      writeManager.fadeIn();
    }  else if (target.data('order') === 'order') {
      sendOrder.fadeIn();sendReviews
    } else if (target.data('reviews') === 'reviews') {
      sendReviews.fadeIn();
    } 

  }

  function changeTextInLabel() {
      if ($(window).width() < 769) {

        $('#other-device').text('Др. устройства');

      } else {
  
        $('#other-device').text('Другая модель устройства');
      }
  }

  function addOverflowHidden(elem) {
    $(elem).toggleClass("modal-open");
  }

  function showNav() {
      $(this).toggleClass("open");
      $(this).parent().toggleClass("burger-overlay");
      $(".burger-nav__list").toggle();
      addOverflowHidden(body);
  }

  let closeNav = function (e) {
    //e.preventDefault();

    $('#burger-container').removeClass('open');
    $('.burger-nav').removeClass('burger-overlay');
    $('.burger-nav__list').css('display', 'none');
  }

  return {
    init
  }
})();
 modalModule.init();

//этот модуль для плавного скрола при нажатии на элемент навигации

//отключена

/*const smoothScrol = (function() {
  const init = function() {
    setUpListners();
  }


  const setUpListners = function() {
    $('.nav__list').on('click', 'li a', smoothScrolToElem);
  }

  function smoothScrolToElem() {
    const scrollEl = $(this).attr('href');// возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scrollEl).length != 0) { // проверим существование элемента чтобы избежать ошибки
       $('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  }

  return {
    init
  }
})();
smoothScrol.init();*/


// const getGeoModule = (function() {

//   const init = function() {
//     setUpListners();
//   }

//   const surgut = {
//     adress     : 'г. Сургут, пр-кт Мира 5.', 
//     firstPhone : '+7 (3462) 700-599',
//     secPhone   : '+7 (952) 718 05 99',
//     time       : 'С 10:00 до 20:30'
//   }//surgut

//   const moscow = {
//      adress     : 'г. Москва, пр-кт Арбат 5.', 
//      firstPhone : '+7 (800) 2000-600',
//      secPhone   : '+7 (800) 4000-600',
//      time       : 'С 09:00 до 21:00'
//   }//moscow

//   let headerAdress = $('#geo-pos');
//   let headerFirstPhone =$('#first-num');
//   let headerSecondPhone =$('#sec-num');
//   let headerTime =$('#time');  

//   const setUpListners = function() {
//     $('.geo-list').on('click', 'li a', getSity);
//   }

//   function changeContent(city) {
  
//     headerAdress.text(city.adress);
//     headerFirstPhone.text(city.firstPhone);
//     headerSecondPhone.text(city.secPhone);
//     headerTime.text(city.time);

//   }
 
//   function getSity() {

//     let target = $(this).html();

//     if (target == 'Сургут') {

//       changeContent(surgut);

//     } else if (target == 'Москва') {
       
//       changeContent(moscow);

//     }
//   }

//   var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
//   };

//   function success(pos) {
//     var crd = pos.coords;

//     let coords = Math.round(crd.latitude);

//     console.log(coords == '61');
//     // console.log('Your current position is:');
//     // console.log(`Latitude : ${crd.latitude}`);
//     // console.log(`Longitude: ${crd.longitude}`);
//     // console.log(`More or less ${crd.accuracy} meters.`);
//   };

//   function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   };
//   navigator.geolocation.getCurrentPosition(success, error, options);

//   return {
//     init
//   }

// })();
// getGeoModule.init();


const carouselModule = (function(){
  const init = () => {
    setUpListners();

    $('.js-carousel').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  }

  let childrenLength = $('.js-employees-carousel').children().length;

  if ( childrenLength > 3 || $(window).width() < 769) {
    $('.js-employees-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [

        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },

        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },

        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  }

  let setUpListners = function() {

  }

  return {
    init
  }
})();
carouselModule.init();
 //карусель отзывов
 

