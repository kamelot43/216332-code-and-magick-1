'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_X = 130;
var TEXT_Y = 255;
var BAR_X = 130;
var BAR_Y = 240;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 160;
var GAP = 50;

// Функция отрисовки облака через задание координат
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция нахождения максимального элемента массива
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 110, 40);
  ctx.fillText('Список результатов:', 110, 60);


  var maxTime = getMaxElement(times);


  for (var i = 0; i < names.length; i++) {
    // Рандомная прозрачность элемента
    var randomOpacity = Math.random().toFixed(2);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';
    }
    ctx.fillRect(BAR_X + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, -((MAX_BAR_HEIGHT * Math.round(times[i])) / Math.round(maxTime)));
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], TEXT_X + (BAR_WIDTH + GAP) * i, TEXT_Y);
  }
};

// Расчет положения колонки :
// Координата колонки = ширина колонки + ширина колонки(ок) до текщей колонки + фикс.отступ;
// Координаты текста расчитаны аналогично;

// Формула расчета высоты столбца (результаты игры)
// максимальное время прохождения = максимальная ширина столбца;
// текущее время игрока           = x;

// текущее время игрока * максимальная ширина столбца/ максимальное время прохождения;
