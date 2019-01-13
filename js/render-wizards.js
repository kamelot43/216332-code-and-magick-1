'use strict';
(function () {

  var similarListElement = document.querySelector('.setup-similar-list');
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var MAX_WIZARDS = 4;

  // Переменные для сброса данных формы
  // Управление цветом мантии мага
  var setupWizadrCout = userDialog.querySelector('.wizard-coat');
  // Управление цветом глаз мага
  var setupWizadrEyes = userDialog.querySelector('.wizard-eyes');
  // Управление цветом фаербола мага
  var setupWizadrFireball = userDialog.querySelector('.setup-fireball-wrap');

  // Очистка формы после отправки
  function resetForm(curentForm) {
    setTimeout(function () {
      setupWizadrCout.style.fill = '';
      setupWizadrEyes.style.fill = '';
      setupWizadrFireball.style.backgroundColor = '';
      curentForm.reset();
    }, 100);
  }

  // Функция вставки на страницу DOM-элемента
  window.renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    var takeNumber = arr.length > MAX_WIZARDS ? MAX_WIZARDS : arr.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      // Функция createWizard создает мага на основе шаблона и заполняет его данными
      // функция экспортируется из другого модуля
      fragment.appendChild(window.createWizard(arr[i]));
    }
    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      evt.preventDefault();
      userDialog.classList.add('hidden');
      resetForm(form);
    });
  }, window.backend.error);
})();
