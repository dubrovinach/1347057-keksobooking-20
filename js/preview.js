'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var SIZE_PHOTOS = 70;

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var previewBlock = document.querySelector('.ad-form__photo');

  var photoContainer = document.querySelector('.ad-form__photo-container');

  var previewElements = [];

  var discardAvatar = previewAvatar.src;

  function loadImage(element, onLoad) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        onLoad(reader.result);
      });

      reader.readAsDataURL(file);
    }
  }

  function createPreviewElement(src) {
    var block = document.createElement('div');
    block.classList.add('ad-form__photo');
    var imgElement = window.main.createPhotoElement(src, 'Фотография жилья', SIZE_PHOTOS, SIZE_PHOTOS);
    block.appendChild(imgElement);
    previewElements.push(block);
    photoContainer.insertBefore(block, previewBlock);
  }

  function resetPreview() {
    if (previewElements) {
      previewElements.forEach(function (element) {
        element.remove();
      });
    }
    previewAvatar.src = discardAvatar;
  }

  avatarInput.addEventListener('change', function () {
    loadImage(avatarInput, function (image) {
      previewAvatar.src = image;
    });
  });

  photoInput.addEventListener('change', function () {
    loadImage(photoInput, createPreviewElement);
  });

  window.preview = {
    reset: resetPreview,
  };
})();
