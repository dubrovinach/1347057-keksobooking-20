'use strict';

// Активация страницы
(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var inputAddress = form.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var fieldsets = form.querySelectorAll('fieldset');

  var MAP_PIN_MAIN_ARROW_HEIGHT = 16;

  var selectCapacity = document.querySelector('#capacity');

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

      window.backend.getData(window.pin.appendPinElements, alert);
      enableForm();
      window.form.guestsValidation(selectCapacity);
      defaultAddress(evt.currentTarget, true);
    }
  }

  function disableSite() {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    disableForm();

    mapPinMain.addEventListener('mousedown', enableSite);
    mapPinMain.addEventListener('keydown', enableSite);
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

  window.map = {
    enableSite: enableSite,
    disableSite: disableSite,
    defaultAddress: defaultAddress,
  };
})();
