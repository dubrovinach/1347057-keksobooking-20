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

var yPinMin = 130;
var yPinMax = 630;

var pinsBlock = document.querySelector('.map__pins');
var pinsBlockWidth = pinsBlock.clientWidth;

function createPin(picCount) {
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
      y: getRandomIntRange(yPinMin, yPinMax),
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

var mapPinMain = document.querySelector('.map__pin--main');

function appendPinElements() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinElement(pins[i]));
  }
  pinsBlock.appendChild(fragment);

  mapPinMain.removeEventListener('mousedown', enableSite);
  mapPinMain.removeEventListener('keydown', enableSite);
}

// Активация страницы

var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var inputAddress = form.querySelector('#address');

var MAP_PIN_MAIN_ARROW_HEIGHT = 16;

function defaultAddress(element, isActive) {
  var buttonWidth = element.clientWidth;
  var buttonHeight = element.clientHeight;
  var buttonLeft = element.offsetLeft;
  var buttonTop = element.offsetTop;
  var X = Math.round(buttonLeft + buttonWidth / 2);
  var Y = isActive ? Math.round(buttonTop + buttonHeight + MAP_PIN_MAIN_ARROW_HEIGHT) : Math.round(buttonTop + buttonHeight / 2);

  inputAddress.setAttribute('value', X + ', ' + Y);
}
defaultAddress(mapPinMain, false);

var fieldsets = form.querySelectorAll('fieldset');

function disableForm() {

  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
}
disableForm();

function enableForm() {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
}

mapPinMain.addEventListener('mousedown', enableSite);

function enableSite(evt) {
  if (evt.key === 'Enter' || evt.button === 0) {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    appendPinElements();
    enableForm();
    defaultAddress(evt.currentTarget, true);
  }
}

mapPinMain.addEventListener('keydown', enableSite);

var inputTitle = form.querySelector('#title');
inputTitle.setAttribute('required', 'required');
inputTitle.setAttribute('minlength', '30');
inputTitle.setAttribute('maxlength', '100');

var inputPrice = form.querySelector('#price');
inputPrice.setAttribute('required', 'required');
inputPrice.setAttribute('max', '1000000');

var inputImages = form.querySelector('#images');
inputImages.setAttribute('accept', ['image/png', 'image/jpeg']);

inputTitle.addEventListener('invalid', function () {
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Минимум 30 символов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Максимум 100 символов');
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Обязательно к заполнению');
  } else {
    inputTitle.setCustomValidity('');
  }
});

inputPrice.addEventListener('invalid', function (evt) {
  if (evt.target.validity.valueMissing) {
    inputPrice.setCustomValidity('Обязательно к заполнению');
  } else if (evt.target.value > 1000000) {
    inputPrice.setCustomValidity('Максимальная стоимость - 1000000');
  } else {
    inputPrice.setCustomValidity('');
  }
});

form.addEventListener('input', function (evt) {
  if (evt.target === inputPrice || evt.target === inputTitle) {
    evt.target.reportValidity();
  }
});

// Валидация инпутов

var selectedCapacity = document.querySelector('#capacity');

var selectRoomNumber = document.querySelector('#room_number');

selectRoomNumber.addEventListener('change', function (evt) {
  selectedCapacity.removeEventListener('change', oneRoomValidity);
  selectedCapacity.removeEventListener('change', twoRoomsValidity);
  selectedCapacity.removeEventListener('change', threeRoomsValidity);
  selectedCapacity.removeEventListener('change', onehundredRoomsValidity);
  switch (evt.target.value) {
    case '1':
      oneRoomValidity();
      selectedCapacity.addEventListener('change', oneRoomValidity);
      break;
    case '2':
      twoRoomsValidity();
      selectedCapacity.addEventListener('change', twoRoomsValidity);
      break;
    case '3':
      threeRoomsValidity();
      selectedCapacity.addEventListener('change', threeRoomsValidity);
      break;
    case '100':
      onehundredRoomsValidity();
      selectedCapacity.addEventListener('change', onehundredRoomsValidity);
      break;
  }
});

function oneRoomValidity() {
  if (selectedCapacity.value !== '1') {
    selectedCapacity.setCustomValidity('Только для 1 гостя');
  } else {
    selectedCapacity.setCustomValidity('');
  }
  selectedCapacity.reportValidity();
}

function twoRoomsValidity() {
  if (selectedCapacity.value !== '1' && selectedCapacity.value !== '2') {
    selectedCapacity.setCustomValidity('Только для 1 гостя или 2 гостей');
  } else {
    selectedCapacity.setCustomValidity('');
  }
  selectedCapacity.reportValidity();
}

function threeRoomsValidity() {
  if (selectedCapacity.value === '0') {
    selectedCapacity.setCustomValidity('Только для 1 гостя, 2 гостей или 3 гостей');
  } else {
    selectedCapacity.setCustomValidity('');
  }
  selectedCapacity.reportValidity();
}

function onehundredRoomsValidity() {
  if (selectedCapacity.value !== '0') {
    selectedCapacity.setCustomValidity('Только не для гостей');
  } else {
    selectedCapacity.setCustomValidity('');
  }
  selectedCapacity.reportValidity();
}

// Карточка объявления

var typesOfOffers = {
  palace: {
    ru: 'Дворец'
  },
  flat: {
    ru: 'Квартира'
  },
  house: {
    ru: 'Дом'
  },
  bungalo: {
    ru: 'Бунгало'
  },
};

var getNoun = function (number, one, two, five) {
  number = Math.abs(number);
  number %= 100;
  if (number >= 5 && number <= 20) {
    return number + five;
  }
  number %= 10;
  if (number === 1) {
    return number + one;
  }
  if (number >= 2 && number <= 4) {
    return number + two;
  }
  return number + five;
};

var card = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

function getCard(value) {
  var cardElement = card.cloneNode(true);
  var photoElement = cardElement.querySelector('.popup__photos');

  cardElement.querySelector('.popup__title').textContent = value.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = value.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = value.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesOfOffers[value.offer.type].ru;
  cardElement.querySelector('.popup__text--capacity').textContent = getNoun(value.offer.rooms, ' комната', ' комнаты', ' комнат') + ' для ' + getNoun(value.offer.guests, ' гостя', ' гостей', ' гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + value.offer.checkin + ', выезд до ' + value.offer.checkout;
  cardElement.querySelectorAll('.popup__features').textContent = value.offer.features;
  cardElement.querySelector('.popup__description').textContent = value.offer.description;
  photoElement.querySelector('img').src = value.offer.photos[0];
  cardElement.querySelector('.popup__avatar').setAttribute('src', value.author.avatar);

  return cardElement;
}
map.insertBefore(getCard(pins[0]), mapFiltersContainer);
