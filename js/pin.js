'use strict';

(function () {
  var OFFSET_Y = 70;
  var OFFSET_X = 25;

  var pinsBlock = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin');

  var mapPinMain = document.querySelector('.map__pin--main');

  function createPinElement(offerObject, i) {
    var pinElement = pinTemplate.content.cloneNode(true);
    var mapPin = pinElement.querySelector('.map__pin');
    mapPin.style.cssText = 'left: ' + (offerObject.location.x - OFFSET_X) + 'px; top: ' + (offerObject.location.y - OFFSET_Y) + 'px;';
    var mapPinImg = mapPin.querySelector('img');
    mapPinImg.alt = offerObject.offer.title;
    mapPinImg.src = offerObject.author.avatar;

    mapPin.dataset.id = i;

    return pinElement;
  }

  function appendPinElements(pins) {
    window.pins = pins;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPinElement(pins[i], i));
    }
    pinsBlock.appendChild(fragment);

    mapPinMain.removeEventListener('mousedown', window.map.enableSite);
    mapPinMain.removeEventListener('keydown', window.map.enableSite);
  }

  window.pin = {
    appendPinElements: appendPinElements,
  };
})();
