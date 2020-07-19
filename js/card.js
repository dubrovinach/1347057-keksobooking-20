'use strict';

(function () {
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

  var card = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var pinsBlock = document.querySelector('.map__pins');

  function getCard(value) {
    var cardElement = card.cloneNode(true);
    var photoElement = cardElement.querySelector('.popup__photos');

    var title = cardElement.querySelector('.popup__title');
    var textAddress = cardElement.querySelector('.popup__text--address');
    var textPrice = cardElement.querySelector('.popup__text--price');
    var type = cardElement.querySelector('.popup__type');
    var capacity = cardElement.querySelector('.popup__text--capacity');
    var textTime = cardElement.querySelector('.popup__text--time');
    var features = cardElement.querySelector('.popup__features');
    var description = cardElement.querySelector('.popup__description');
    var avatar = cardElement.querySelector('.popup__avatar');

    window.main.checkContent(title, value.offer.title, value.offer.title);
    window.main.checkContent(textAddress, value.offer.address, value.offer.address);
    window.main.checkContent(textPrice, value.offer.price, value.offer.price + ' ₽/ночь');
    window.main.checkContent(type, value.offer.type, typesOfOffers[value.offer.type].ru);
    window.main.checkContent(capacity, value.offer.rooms, window.main.getNoun(value.offer.rooms, ' комната', ' комнаты', ' комнат') + ' для ' + window.main.getNoun(value.offer.guests, ' гостя', ' гостей', ' гостей'));
    window.main.checkContent(textTime, value.offer.checkin, 'Заезд после ' + value.offer.checkin + ', выезд до ' + value.offer.checkout);
    window.main.checkContent(description, value.offer.description, value.offer.description);
    sortFeatures(features, value.offer.features);
    createPhotos(photoElement, value.offer.photos);
    if (value.author.avatar) {
      avatar.setAttribute('src', value.author.avatar);
    } else {
      avatar.remove();
    }
    return cardElement;
  }

  function createPhotos(element, arr) {
    var img = element.querySelector('img');
    if (arr.length === 0) {
      element.remove();
    }
    if (arr.length === 1) {
      img.src = arr[0];
    } else {
      var imgCopy;
      for (var i = 0; i < arr.length - 1; i++) {
        imgCopy = img.cloneNode(true);
        imgCopy.src = arr[i];
        element.appendChild(imgCopy);
      }
      img.src = arr[arr.length - 1];
    }
  }

  function sortFeatures(element, arr) {
    if (arr.length === 0) {
      element.remove();
    }
    for (var i = 0; i < element.children.length; i++) {
      var hasFeature = false;
      for (var j = 0; j < arr.length; j++) {
        if (element.children[i].classList.contains('popup__feature--' + arr[j])) {
          hasFeature = true;
          break;
        }
      }
      if (!hasFeature) {
        element.children[i].remove();
        i--;
      }
    }
  }

  function onPopupEscPress(evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closeCard();
    }
  }

  function openCard(id) {
    map.insertBefore(getCard(window.filteredPins[id]), mapFiltersContainer);

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

  window.card = {
    removeCard: removeCard,
  };
})();
