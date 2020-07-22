'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var SIZE_PHOTOS = 70;

  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var photoInput = document.querySelector('.ad-form__upload input[type=file]');
  var previewBlock = document.querySelector('.ad-form__photo');

  var previewElements = [];

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

  function createImgElement() {
    var previewImg = document.createElement('img');

    previewImg.width = SIZE_PHOTOS;
    previewImg.height = SIZE_PHOTOS;
    previewImg.alt = 'Фотография жилья';
    previewImg.setAttribute('border', 'none');

    previewBlock.appendChild(previewImg);

    return previewImg;
  }

  function addActiveState(element, elementClass) {
    element.classList.add(elementClass);
  }

  function createPreviewElement() {
    var element = document.createElement('div');
    addActiveState(element, previewBlock);
    var imgElement = createImgElement();
    element.appendChild(imgElement);
    previewElements.push(element);
  }

  var previewPhoto = previewBlock.appendChild(createImgElement());

  avatarInput.addEventListener('change', function () {
    loadImage(avatarInput, function (image) {
      previewAvatar.src = image;
    });
  });

  photoInput.addEventListener('change', function () {
    loadImage(photoInput, function (image) {
      previewPhoto.src = image;
    });
  });
})();
