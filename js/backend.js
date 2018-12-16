'use strict';
window.backend = (function () {
  var URL = 'https://js.dump.academy/code-and-magick';


  var sendRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          onError(xhr.status + xhr.statusText + 'Неверный запрос');
          break;
        case 404:
          onError(xhr.status + xhr.statusText + 'Ничего не найдено');
          break;
        case 401:
          onError(xhr.status + xhr.statusText + 'Пользователь не авторизован');
          break;
        case 500:
          onError(xhr.status + xhr.statusText + 'Ошибка сервера');
          break;
        default:
          onError('Неизвестный статус' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    return xhr;
  };

  return {
    load: function (onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },

    error: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
