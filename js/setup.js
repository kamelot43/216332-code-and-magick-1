'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

// Шаблон для создания похожих магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// Пустой масив для добавления похожих магов
var wizards = [];

var WIZARDS_QUANTITY = 4;

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
