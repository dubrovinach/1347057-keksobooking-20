'use strict';

function getRandomAmount(arr) {
  var newArray = [];
  var count = getRandomIntRange(1, arr.length);

  for (var i = 0; i < count; i++) {
    newArray.push(arr[i]);
  }
  return newArray;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

var pinsBlock = document.querySelector('.map__pins');
var pinsBlockWidth = pinsBlock.clientWidth;

var createPin = function (picCount) {
  var pin = {
    author: {
      avatar: 'img/avatars/user0' + (picCount + 1) + '.png',
    },
    offer: {
      title: titles[getRandomInt(titles.length)],
      address: address[getRandomInt(address.length)],
      price: prices[getRandomInt(prices.length)],
      type: types[getRandomInt(types.length)],
      rooms: rooms[getRandomInt(rooms.length)],
      guests: guests[getRandomInt(guests.length)],
      checkin: checkin[getRandomInt(checkin.length)],
      checkout: checkout[getRandomInt(checkout.length)],
      features: getRandomAmount(features),
      description: descriptions[getRandomInt(descriptions.length)],
      photos: getRandomAmount(photos),
    },
    location: {
      x: getRandomIntRange(0 + OFFSET_X, pinsBlockWidth - OFFSET_X),
      y: getRandomIntRange(130, 630),
    }
  };
  return pin;
};

var createPins = function () {
  var pins = [];
  for (var i = 0; i < PINS_AMOUNT; i++) {
    pins.push(createPin(i));
  }
  return pins;
};

var pins = createPins();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin');

function createPinElement(offerObject) {
  var pinElement = pinTemplate.content.cloneNode(true);
  var mapPin = pinElement.querySelector('.map__pin');
  mapPin.style.cssText = 'left: ' + (offerObject.location.x - OFFSET_X) + 'px; top: ' + (offerObject.location.y - OFFSET_Y) + 'px;';
  var mapPinImg = mapPin.querySelector('img');
  mapPinImg.alt = offerObject.offer.title;
  mapPinImg.src = offerObject.author.avatar;

  return pinElement;
}

function appendPinElements() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinElement(pins[i]));
  }
  pinsBlock.appendChild(fragment);
}
appendPinElements();
