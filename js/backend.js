'use strict';

(function () {
  var URL = {
    get: 'https://javascript.pages.academy/keksobooking/data',
    send: 'https://javascript.pages.academy/keksobooking',
  };

  function getData(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.pins = xhr.response;
        onSuccess(window.main.getAmountOfPins(xhr.response, window.pin.MAX_PINS));
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL.get);
    xhr.send();
  }

  function sendData(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('POST', URL.send);
    xhr.send(data);
  }

  window.backend = {
    getData: getData,
    sendData: sendData,
  };
})();
