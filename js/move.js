'use strict';
(function () {
  var CoordinatesLimit = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.map.defaultAddress(mapPinMain, false);
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      window.map.defaultAddress(mapPinMain, true);
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (mapPinMain.offsetLeft > CoordinatesLimit.x.max - mapPinMain.offsetWidth / 2) {
        mapPinMain.style.left = CoordinatesLimit.x.max - mapPinMain.offsetWidth / 2 + 'px';
      } else if (mapPinMain.offsetLeft < CoordinatesLimit.x.min - mapPinMain.offsetWidth / 2) {
        mapPinMain.style.left = CoordinatesLimit.x.min - mapPinMain.offsetWidth / 2 + 'px';
      }

      if (mapPinMain.offsetTop > CoordinatesLimit.y.max - mapPinMain.offsetHeight - window.util.MAIN_PIN_TIP) {
        mapPinMain.style.top = CoordinatesLimit.y.max - mapPinMain.offsetHeight - window.util.MAIN_PIN_TIP + 'px';
      } else if (mapPinMain.offsetTop < CoordinatesLimit.y.min - mapPinMain.offsetHeight - window.util.MAIN_PIN_TIP) {
        mapPinMain.style.top = CoordinatesLimit.y.min - mapPinMain.offsetHeight - window.util.MAIN_PIN_TIP + 'px';
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
