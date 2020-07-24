'use strict';

(function () {
  var MAX_PRICE = 1000000;

  var selectTypeOfHousing = document.querySelector('#type');
  var selectPrice = document.querySelector('#price');
  var HousePrices = {
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

  selectTypeOfHousing.addEventListener('change', onTypeChange);

  function checkPriceValidity(target) {
    if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательно к заполнению');
    } else if (HousePrices[houseValue] > target.value) {
      target.setCustomValidity('Минимальная цена ' + HousePrices[houseValue]);
    } else if (target.value > MAX_PRICE) {
      target.setCustomValidity('Максимальная цена 1000000');
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  }

  function onTypeChange(evt) {
    selectPrice.placeholder = HousePrices[evt.target.value];
    selectPrice.min = HousePrices[evt.target.value];
    checkPriceValidity(selectPrice);
  }

  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');

  inputTimeIn.addEventListener('change', function (evt) {
    inputTimeOut.value = evt.target.value;
  });

  inputTimeOut.addEventListener('change', function (evt) {
    inputTimeIn.value = evt.target.value;
  });

  var selectCapacity = document.querySelector('#capacity');
  var selectRoomNumber = document.querySelector('#room_number');

  var GuestCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0'],
  };

  var GuestValidity = {
    1: 'Только для 1 гостя',
    2: 'Только для 1 или 2 гостей',
    3: 'Только для 1, 2 или 3 гостей',
    100: 'Не для гостей',
  };
  var typeOfRoom = '1';

  selectRoomNumber.addEventListener('change', function (evt) {
    typeOfRoom = evt.target.value;
    checkGuestsValidation(selectCapacity);
  });

  selectCapacity.addEventListener('change', function (evt) {
    var target = evt.target;
    checkGuestsValidation(target);
  });

  function checkGuestsValidation(target) {
    var isValid = GuestCapacity[typeOfRoom].some(function (element) {
      return element === target.value;
    });

    if (!isValid) {
      target.setCustomValidity(GuestValidity[typeOfRoom]);
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  }

  var form = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var resetButton = form.querySelector('.ad-form__reset');

  function deleteData() {
    window.map.disableSite();
    window.pin.remove();
    window.pin.clearMapPinMain();
    window.map.defaultAddress(mapPinMain, false);
  }

  function onResetButtonClick(evt) {
    window.preview.reset();
    evt.preventDefault();
    form.reset();
    deleteData();
    window.card.remove();
  }

  function onFormSubmit(evt) {
    window.backend.sendData(new FormData(form), window.message.onSuccess, window.message.onError);
    form.reset();
    deleteData();
    window.preview.reset();
    window.card.remove();

    evt.preventDefault();
  }

  form.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);

  window.form = {
    checkGuestsValidation: checkGuestsValidation,
  };
})();
