'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  // var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

  function toggleFilters() {
    mapFilters.reset();
    mapFilters.childNodes.forEach(function (filter) {
      filter.disabled = !filter.disabled;
    });
  }

  function checkType(pin) {
    return housingType.value === 'any' ? true : housingType.value === pin.offer.type;
  }

  function checkRooms(pin) {
    return housingRooms.value === 'any' ? true : housingRooms.value === pin.offer.rooms;
  }

  function checkGuests(pin) {
    return housingGuests.value === 'any' ? true : housingGuests.value === pin.offer.guests;
  }

  var filterHousingCheckbox = function (pin) {
    var housingCheckbox = mapFilters.querySelectorAll('.map__checkbox:checked');

    return Array.from(housingCheckbox).every(function (feature) {
      return pin.offer.features.indexOf(feature.value) >= 0;
    });
  };

  function getFiltredData(pins) {
    var filteredPins = pins.filter(function (pin) {
      return checkType(pin) && checkGuests(pin) && checkRooms(pin) && filterHousingCheckbox(pin);
    });
    return window.main.getAmountOfPins(filteredPins, window.pin.MAX_PINS);
  }

  function onFilterChange() {
    window.card.removeCard();
    window.pin.removePins();
    var pins = window.pins;
    window.debounce(window.pin.appendPinElements(getFiltredData(pins)));
  }

  mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    toggleFilters: toggleFilters,
  };
})();
