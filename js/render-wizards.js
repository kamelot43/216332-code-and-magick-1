'use strict';
(function () {

  var similarListElement = document.querySelector('.setup-similar-list');

  // Функция вставки на страницу DOM-элемента
  window.renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      // Функция createWizard создает мага на основе шаблона и заполняет его данными
      // функция экспортируется из другого модуля
      fragment.appendChild(window.createWizard(arr[i]));
    }
    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
