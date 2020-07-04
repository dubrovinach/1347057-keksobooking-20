'use strict';

(function () {
  function getRandomAmount(arr) {
    var newArray = [];
    var count = getRandomIntRange(1, arr.length);

    for (var i = 0; i < count; i++) {
      newArray.push(arr[i]);
    }
    return newArray;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getRandomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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

  window.main = {
    getRandomAmount: getRandomAmount,
    getRandomInt: getRandomInt,
    getRandomIntRange: getRandomIntRange,
    getNoun: getNoun,
  };
})();
