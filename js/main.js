'use strict';

(function () {
  var getNoun = function (number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
      return number + five;
    }
    number %= 10;
    if (number === 1) {
      return number + one;
    }
    if (number >= 2 && number <= 4) {
      return number + two;
    }
    return number + five;
  };

  function getAmountOfPins(pins, MAX_PINS) {
    var sortedPins = pins.slice(0, MAX_PINS);
    window.filteredPins = sortedPins;
    return sortedPins;
  }

  function checkContent(element, value, textContent) {
    if (value) {
      element.textContent = textContent;
    } else {
      element.remove();
    }
  }

  function createPhotoElement(src, alt, width, heigth) {
    var photoElement = document.createElement('img');
    photoElement.setAttribute('src', src);
    photoElement.setAttribute('alt', alt);
    photoElement.setAttribute('width', width);
    photoElement.setAttribute('heigth', heigth);

    return photoElement;
  }

  window.main = {
    getNoun: getNoun,
    getAmountOfPins: getAmountOfPins,
    checkContent: checkContent,
    createPhotoElement: createPhotoElement,
  };
})();
