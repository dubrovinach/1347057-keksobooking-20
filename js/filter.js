'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var MAX_PINS = 5;

  function disableFilters() {
    mapFilters.reset();
    mapFilters.childNodes.forEach(function (filter) {
      filter.disabled = !filter.disabled;
    });
  }

  function checkType(pin) {
    return housingType.value === 'any' ? true : housingType.value === pin.offer.type;
  }

  function getFiltredData(pins) {
    var filteredPins = pins.filter(function (pin) {
      return checkType(pin);
    });
    return filteredPins.slice(0, MAX_PINS);
  }

  function onFilterChange() {
    window.card.removeCard();
    window.pin.removePins();
    var pins = window.pins;
    window.debounce(window.pin.appendPinElements(getFiltredData(pins)));
  }

  mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    disableFilters: disableFilters,
  };
})();
