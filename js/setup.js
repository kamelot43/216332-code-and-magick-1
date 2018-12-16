'use strict';
(function () {

  var setup = document.querySelector('.setup');

  // Управление цветом мантии мага
  var setupWizadrCout = setup.querySelector('.wizard-coat');
  // Управление цветом глаз мага
  var setupWizadrEyes = setup.querySelector('.wizard-eyes');
  // Управление цветом фаербола мага
  var setupWizadrFireball = setup.querySelector('.setup-fireball-wrap');


  // Изменение параметров мага при клике : цвет мантии, глаз, фаербола
  window.colorize(setupWizadrCout, window.WIZARD_COAT_COLOR);
  window.colorize(setupWizadrFireball, window.WIZARD_FIREBALL_COLOR);
  window.colorize(setupWizadrEyes, window.WIZARD_EYES_COLOR);

  // Пустой масив для добавления похожих магов
  var wizards = [];

  // Генерация случайных характеристик мага и добавление в массив wizards
  // window.generateWizardsValue(wizards);

  // Создание мага на основе переданного шаблона,
  // заполнение его данными и вставка на страницу
  window.backend.load(window.renderWizards, window.backend.error);

})();
