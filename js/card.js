'use strict';

// Карточка объявления

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

    cardElement.querySelector('.popup__title').textContent = value.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = value.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = value.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typesOfOffers[value.offer.type].ru;
    cardElement.querySelector('.popup__text--capacity').textContent = window.main.getNoun(value.offer.rooms, ' комната', ' комнаты', ' комнат') + ' для ' + window.main.getNoun(value.offer.guests, ' гостя', ' гостей', ' гостей');
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
    map.insertBefore(getCard(window.pins[id]), mapFiltersContainer);

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
