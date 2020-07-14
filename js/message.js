'use strict';
(function () {
  var main = document.querySelector('main');

  function onError() {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonRemove);
    main.appendChild(errorElement);

    document.addEventListener('keydown', onEscButtonPress);
    document.addEventListener('mousedown', onErrorButtonRemove);
  }

  function onErrorButtonRemove() {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onEscButtonPress);
    document.removeEventListener('mousedown', onErrorButtonRemove);
  }

  function onSuccess() {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    var successMessage = successElement.querySelector('.success__message');
    successMessage.addEventListener('mousedown', onSuccessMessageRemove);
    main.appendChild(successElement);

    document.addEventListener('keydown', onEscButtonPress);
  }

  function onSuccessMessageRemove() {
    var successElement = document.querySelector('.success');
    successElement.remove();
    document.removeEventListener('keydown', onEscButtonPress);
  }

  function onEscButtonPress(evt) {
    if (evt.key === 'Escape' && document.querySelector('.success')) {
      onSuccessMessageRemove();
    } else if (evt.key === 'Escape' && document.querySelector('.error')) {
      onErrorButtonRemove();
    }
  }

  window.message = {
    onError: onError,
    onSuccess: onSuccess,
  };
})();