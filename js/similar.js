'use strict';
(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (currentWizard) {
    var rank = 0;

    if (currentWizard.colorCoat === coatColor) {
      rank += 2;

    } if (currentWizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);


      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };


  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.onCoatChange = function (currentColor) {
    coatColor = currentColor;
    window.debounce(updateWizards);
  };

  var successHandler = function (data) {
    wizards = data;
    window.debounce(updateWizards);
  };


  window.backend.load(successHandler, window.backend.error);
})();
