'use strict';
// УДАЛИТЬ !!!
(function () {

  var WIZARDS_QUANTITY = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  // Функция нахождения случайного значения
  function findRandomValue(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  // Функция генерации случайных параметров волшебника
  window.generateWizardsValue = function (arr) {
    var element;

    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      element = {
        name: WIZARD_NAMES[findRandomValue(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[findRandomValue(WIZARD_SURNAMES)],
        coatColor: window.WIZARD_COAT_COLOR[findRandomValue(window.WIZARD_COAT_COLOR)],
        eyesColor: window.WIZARD_EYES_COLOR[findRandomValue(window.WIZARD_EYES_COLOR)]
      };
      arr.push(element);
    }
  };
})();
