'use strict';

(function () {
  var RESPONSE_TYPE = 'json';
  var TIMEOUT = 10000;

  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    SEND: 'https://javascript.pages.academy/keksobooking',
  };
  var StatusCode = {
    OK: 200
  };

  function getData(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        window.pins = xhr.response;
        onSuccess(window.main.getAmountOfPins(xhr.response, window.util.MAX_PINS));
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

    xhr.timeout = TIMEOUT;

    xhr.open('GET', Url.GET);
    xhr.send();
  }

  function sendData(data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('POST', Url.SEND);
    xhr.send(data);
  }

  window.backend = {
    getData: getData,
    sendData: sendData,
  };
})();
