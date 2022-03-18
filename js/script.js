let screenNumber = 1;
let gameNumber = 0;
let streak = 0;
let maxStreak = 0;
let chances = 0;

$('.screen-2').hide();
$('.screen-3').hide();

$('.play-button').click({
  goBack: false
}, changeScreen);

$('.back-button').click({
  goBack: true
}, changeScreen);

$('.select-button').click(createGame);

$('.guess-button').click(compare);

function getFocus() {
  $('#user-input').val('');
  $('#user-input').focus();
};


function changeScreen(event) {
  $('.screen-' + screenNumber).fadeOut();

  if (!event.data.goBack) {
    screenNumber++;
  } else {
    screenNumber--;
  }

  setTimeout(function () {
    $('.screen-' + screenNumber).fadeIn();

    if (screenNumber == 3) {
      getFocus()
    }
  }, 500);
};

function generateNumber(max) {
  gameNumber = Math.floor(Math.random() * max) + 1;
  console.log("cheat:",gameNumber);
};

function createGame() {
  const difficulty = $(this).attr("value");
  console.log(difficulty);

  switch (difficulty) {
    case 'easy':
      chances = 5;
      range = 2;
      break;
    case 'normal':
      chances = 4;
      range = 4;
      break;
    case 'hard':
      chances = 3;
      range = 6;
      break;
    case 'very-hard':
      chances = 2;
      range = 8;
      break;
    case 'impossible':
      chances = 1;
      range = 10;
      break;
  };
  
  console.log("range: ",range)

  generateNumber(range);
  updateStats();

  changeScreen({
    data: {
      goBack: false
    }
  });
};

function updateStats() {
  $(".streak").text(streak);
  $(".max-streak").text(maxStreak);
  $(".chances").text(chances);
};


function warning(message, error) {
  const guessButton = $('.guess-button');
  const warning = $('.warning-wrapper');

  guessButton.prop("disabled", true);
  guessButton.css("background-color", "gray");

  if (!error) {
    warning.css("background-color", "green");
  } else {
    warning.css("background-color", "red");
  };

  warning.fadeIn();
  $('.warning-message').text(message);

  setTimeout(function () {
    warning.fadeOut();
    guessButton.css("background-color", "#00ced1");
    guessButton.prop("disabled", false);
    getFocus();
  }, 2000);
};

function compare() {
  const guess = parseInt($('#user-input').val());

  if (!guess || guess == NaN) {
    warning('Valor inválido', true);
    return;
  }

  if (guess == gameNumber) {
    warning("Você acertou! Eu estava pensando no " + gameNumber, false);
    
    streak++;
    if (streak > maxStreak) {
      maxStreak = streak;
    };

    generateNumber(range);
  } else {
    warning("Você errou!", true);

    streak = 0;

    chances--;
    if (chances == 0) {
      warning("Game Over", true);

      setTimeout(function () {
        changeScreen({
          data: {
            goBack: true
          }
        });
      }, 1500);
    };
  };
  updateStats();
};