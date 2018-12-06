'use strict';

var similarListElement = document.querySelector('.setup-similar-list');

// Шаблон для создания похожих магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_QUANTITY = 4;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
// Управление цветом мантии мага
var setupWizadrCout = setup.querySelector('.wizard-coat');
// Управление цветом глаз мага
var setupWizadrEyes = setup.querySelector('.wizard-eyes');
// Управление цветом фаербола мага
var setupWizadrFireball = setup.querySelector('.setup-fireball-wrap');
// Аватар пользователя
var dialogHandler = setup.querySelector('.upload');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && setupUserName !== document.activeElement) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Изменении цвета мантии мага при клике
setupWizadrCout.addEventListener('click', function () {
  setupWizadrCout.style = 'fill:' + WIZARD_COAT_COLOR[findRandomValue(WIZARD_COAT_COLOR)];
});

// Изменении цвета глаз мага при клике
setupWizadrEyes.addEventListener('click', function () {
  setupWizadrEyes.style = 'fill:' + WIZARD_EYES_COLOR[findRandomValue(WIZARD_EYES_COLOR)];
});

// Изменении цвета фаербола мага при клике
setupWizadrFireball.addEventListener('click', function () {
  setupWizadrFireball.style.background = WIZARD_FIREBALL_COLOR[findRandomValue(WIZARD_FIREBALL_COLOR)];
});


// Пустой масив для добавления похожих магов
var wizards = [];


// Функция нахождения случайного значения
function findRandomValue(arr) {
  return Math.floor(Math.random() * arr.length);
}

// Функция генерации случайных параметров волшебника
function generateRandomValue(arr) {
  var element;

  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    element = {
      name: WIZARD_NAMES[findRandomValue(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[findRandomValue(WIZARD_SURNAMES)],
      coatColor: WIZARD_COAT_COLOR[findRandomValue(WIZARD_COAT_COLOR)],
      eyesColor: WIZARD_EYES_COLOR[findRandomValue(WIZARD_EYES_COLOR)]
    };
    arr.push(element);
  }
}

generateRandomValue(wizards);

// Функция создания DOM-элемента (волшебник)
// на основании существуещего шаблона и заполнение его данными.
function createWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

// Функция вставки на страницу DOM-элемента
function renderWizard(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createWizard(arr[i]));
  }
  similarListElement.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
}

renderWizard(wizards);

// Реализация перетаскивания

dialogHandler.addEventListener('mousedown', function (mouseEvt) {
  mouseEvt.preventDefault();

  // Вычисление разницы между начальными и текущими координатами
  var startCoords = {
    x: mouseEvt.clientX,
    y: mouseEvt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      };
      dialogHandler.addEventListener('click', onClickPreventDefault);
    }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
