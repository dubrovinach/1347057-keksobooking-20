'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');

  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var SIZE_PHOTOS = 70;

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

  var createImgElement = function () {
    var previewImg = document.createElement('img');

    previewImg.width = SIZE_PHOTOS;
    previewImg.height = SIZE_PHOTOS;

    previewPhoto.appendChild(previewImg);

    return previewImg;
  };

  avatarInput.addEventListener('change', function () {
    loadImage(avatarInput, function (image) {
      preview.src = image;
    });
  });

  photoInput.addEventListener('change', function () {
    loadImage(photoInput, function () {
      createImgElement();
    });
  });

})();
