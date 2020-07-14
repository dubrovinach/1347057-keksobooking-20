'use strict';

// Валидация инпутов типа жилья и цены за ночь
(function () {
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

  // отправка данных

  var form = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var resetButton = form.querySelector('.ad-form__reset');

  function deleteData() {
    window.map.disableSite();
    window.pin.removePins();
    window.pin.clearMapPinMain();
    window.map.defaultAddress(mapPinMain, false);
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    form.reset();
  }

  function onFormSubmit(evt) {
    window.backend.sendData(new FormData(form), window.message.onSuccess, window.message.onError);
    form.reset();
    deleteData();

    evt.preventDefault();
  }

  form.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);

  window.form = {
    guestsValidation: guestsValidation,
  };
})();
