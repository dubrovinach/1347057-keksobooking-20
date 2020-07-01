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

var Y_PIN_MIN = 130;
var Y_PIN_MAX = 630;

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
      y: getRandomIntRange(Y_PIN_MIN, Y_PIN_MAX),
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

var mapPinMain = document.querySelector('.map__pin--main');

function appendPinElements() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPinElement(pins[i], i));
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

var inputAvatar = form.querySelector('#avatar');
inputAvatar.setAttribute('accept', ['image/png', 'image/jpeg']);

inputAddress.setAttribute('readonly', 'readonly');

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

form.addEventListener('input', function (evt) {
  if (evt.target === inputPrice || evt.target === inputTitle) {
    evt.target.reportValidity();
  }
});

// Валидация инпутов типа жилья и цены за ночь

var selectTypeOfHousing = document.querySelector('#type');

var selectPrice = document.querySelector('#price');

var housePrices = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalo: 0,
};

var houseValue = 'flat';

selectTypeOfHousing.addEventListener('change', function (evt) {
  houseValue = evt.target.value;
  checkPriceValidity(selectPrice);
});

selectPrice.addEventListener('input', function (evt) {
  checkPriceValidity(evt.target);
});

function checkPriceValidity(target) {
  if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательно к заполнению');
  } else if (housePrices[houseValue] > target.value) {
    target.setCustomValidity('Минимальная цена ' + housePrices[houseValue]);
  } else if (target.value > 1000000) {
    target.setCustomValidity('Максимальная цена 1000000');
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
}

// Валидация инпутов времени заезда и выезда

var inputTimeIn = document.querySelector('#timein');

var inputTimeOut = document.querySelector('#timeout');

inputTimeIn.addEventListener('change', function (evt) {
  inputTimeOut.value = evt.target.value;
});

inputTimeOut.addEventListener('change', function (evt) {
  inputTimeIn.value = evt.target.value;
});

// Валидация инпутов количества комнат и гостей

var selectCapacity = document.querySelector('#capacity');

var selectRoomNumber = document.querySelector('#room_number');

var guestCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

var guestValidity = {
  1: 'Только для 1 гостя',
  2: 'Только для 1 или 2 гостей',
  3: 'Только для 1, 2 или 3 гостей',
  100: 'Не для гостей',
};

var typeOfRoom = '1';

selectRoomNumber.addEventListener('change', function (evt) {
  typeOfRoom = evt.target.value;
  guestsValidation(selectCapacity);
});

selectCapacity.addEventListener('change', function (evt) {
  var target = evt.target;
  guestsValidation(target);
});

function guestsValidation(target) {
  var isValid = guestCapacity[typeOfRoom].some(function (element) {
    return element === target.value;
  });

  if (!isValid) {
    target.setCustomValidity(guestValidity[typeOfRoom]);
  } else {
    target.setCustomValidity('');
  }
  target.reportValidity();
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

// открытие/закрытие карточки

function onPopupEscPress(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeCard();
  }
}

function openCard(id) {
  map.insertBefore(getCard(pins[id]), mapFiltersContainer);

  var popupClose = document.querySelector('.popup__close');
  document.addEventListener('keydown', onPopupEscPress);

  popupClose.addEventListener('click', function () {
    closeCard();
  });
}

function closeCard() {
  var mapPinActive = document.querySelector('.map__pin--active');
  removeCard();
  document.removeEventListener('keydown', onPopupEscPress);
  if (mapPinActive) {
    mapPinActive.classList.remove('map__pin--active');
  }
}

function removeCard() {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }
}

pinsBlock.addEventListener('click', function (evt) {
  var mapPinActive = document.querySelector('.map__pin--active');
  if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
    removeCard();
    openCard(evt.target.dataset.id);
    evt.target.classList.add('map__pin--active');
  } else if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
    removeCard();
    openCard(evt.target.parentElement.dataset.id);
    evt.target.parentElement.classList.add('map__pin--active');
  }
});
