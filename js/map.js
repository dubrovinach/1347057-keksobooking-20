'use strict';

(function () {
  var MAIN_PIN_TIP = 16;

  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var selectCapacity = document.querySelector('#capacity');

  var fieldsets = form.querySelectorAll('fieldset');
  var inputAddress = form.querySelector('#address');
  var inputTitle = form.querySelector('#title');
  var inputPrice = form.querySelector('#price');
  var inputImages = form.querySelector('#images');
  var inputAvatar = form.querySelector('#avatar');

  function defaultAddress(element, isActive) {
    var buttonWidth = element.clientWidth;
    var buttonHeight = element.clientHeight;
    var buttonLeft = element.offsetLeft;
    var buttonTop = element.offsetTop;
    var X = Math.round(buttonLeft + buttonWidth / 2);
    var Y = isActive ? Math.round(buttonTop + buttonHeight + MAIN_PIN_TIP) : Math.round(buttonTop + buttonHeight / 2);

    inputAddress.setAttribute('value', X + ', ' + Y);
  }
  defaultAddress(mapPinMain, false);

  function disableForm() {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
    window.filter.toggleFilters();
  }
  disableForm();

  function enableForm() {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    window.filter.toggleFilters();
  }

  mapPinMain.addEventListener('click', enableSite);

  function enableSite(evt) {
    if (evt.key === 'Enter' || evt.button === 0) {
      map.classList.remove('map--faded');
      form.classList.remove('ad-form--disabled');

      window.backend.getData(window.pin.appendPinElements, alert);
      enableForm();
      window.form.checkGuestsValidation(selectCapacity);
      defaultAddress(evt.currentTarget, true);
    }
    mapPinMain.removeEventListener('click', enableSite);
  }

  function disableSite() {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    disableForm();

    mapPinMain.addEventListener('click', enableSite);
  }

  inputTitle.setAttribute('required', 'required');
  inputTitle.setAttribute('minlength', '30');
  inputTitle.setAttribute('maxlength', '100');

  inputPrice.setAttribute('required', 'required');
  inputPrice.setAttribute('max', '1000000');

  inputImages.setAttribute('accept', ['image/png', 'image/jpeg']);

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
