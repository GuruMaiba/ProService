 //яндекс карта на сайте

 (function () {
     ymaps.ready(init);
     var myMap,
         myPlacemark;

     function init() {
         myMap = new ymaps.Map("map", {
             center: [61.26220531048235, 73.38054670534885],
             zoom: 15,
             controls: []
         });

         myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
             hintContent: 'Pro Service!'
             //balloonContent: 'Столица России' 
         }, {
             // Опции.
             // Необходимо указать данный тип макета.
             iconLayout: 'default#image',
             // Своё изображение иконки метки.
             iconImageHref: '../img/map-marker.png',
             // Размеры метки.
             iconImageSize: [88, 116],
             // Смещение левого верхнего угла иконки относительно
             // её "ножки" (точки привязки).
             iconImageOffset: [-5, -38]
         });

         myMap.geoObjects.add(myPlacemark);
     }
 })();