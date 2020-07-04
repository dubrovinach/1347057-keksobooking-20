'use strict';

(function () {
  var titles = [
    'Квартира с видом на море',
    'Просторные апартаменты',
    'Уютное место для всей семьи',
    'Для вашего бизнеса',
  ];

  var address = [
    '250, 700',
    '480, 560',
    '320, 500',
    '650, 300',
  ];

  var prices = [
    '5000',
    '15000',
    '13000',
    '20000',
  ];

  var types = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];

  var rooms = [
    '1',
    '2',
    '3',
    '4',
  ];

  var guests = [
    '3',
    '7',
    '1',
    '5',
  ];

  var checkin = [
    '12:00',
    '13:00',
    '14:00',
  ];

  var checkout = checkin;

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];

  var descriptions = [
    'Небольшая, но уютная квартира в центре  Токио',
    'Подходит как туристам, так и бизнесменам',
    'Апартаменты в самом зеленом районе Токио',
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var PINS_AMOUNT = 8;

  var OFFSET_Y = 70;
  var OFFSET_X = 25;

  var Y_PIN_MIN = 130;
  var Y_PIN_MAX = 630;

  var pinsBlock = document.querySelector('.map__pins');
  var pinsBlockWidth = pinsBlock.clientWidth;

  var pinTemplate = document.querySelector('#pin');

  var mapPinMain = document.querySelector('.map__pin--main');

  function createPin(picCount) {
    var pin = {
      author: {
        avatar: 'img/avatars/user0' + (picCount + 1) + '.png',
      },
      offer: {
        title: titles[window.main.getRandomInt(titles.length)],
        address: address[window.main.getRandomInt(address.length)],
        price: prices[window.main.getRandomInt(prices.length)],
        type: types[window.main.getRandomInt(types.length)],
        rooms: rooms[window.main.getRandomInt(rooms.length)],
        guests: guests[window.main.getRandomInt(guests.length)],
        checkin: checkin[window.main.getRandomInt(checkin.length)],
        checkout: checkout[window.main.getRandomInt(checkout.length)],
        features: window.main.getRandomAmount(features),
        description: descriptions[window.main.getRandomInt(descriptions.length)],
        photos: window.main.getRandomAmount(photos),
      },
      location: {
        x: window.main.getRandomIntRange(0 + OFFSET_X, pinsBlockWidth - OFFSET_X),
        y: window.main.getRandomIntRange(Y_PIN_MIN, Y_PIN_MAX),
      }
    };
    return pin;
  }

  var createPins = function () {
    var pins = [];
    for (var i = 0; i < PINS_AMOUNT; i++) {
      pins.push(createPin(i));
    }
    return pins;
  };

  var pins = createPins();

  function createPinElement(offerObject, i) {
    var pinElement = pinTemplate.content.cloneNode(true);
    var mapPin = pinElement.querySelector('.map__pin');
    mapPin.style.cssText = 'left: ' + (offerObject.location.x - OFFSET_X) + 'px; top: ' + (offerObject.location.y - OFFSET_Y) + 'px;';
    var mapPinImg = mapPin.querySelector('img');
    mapPinImg.alt = offerObject.offer.title;
    mapPinImg.src = offerObject.author.avatar;

    mapPin.dataset.id = i;

    return pinElement;
  }

  function appendPinElements() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPinElement(pins[i], i));
    }
    pinsBlock.appendChild(fragment);

    mapPinMain.removeEventListener('mousedown', window.map.enableSite);
    mapPinMain.removeEventListener('keydown', window.map.enableSite);
  }

  window.pin = {
    createPins: createPins,
    appendPinElements: appendPinElements,
  };
})();
