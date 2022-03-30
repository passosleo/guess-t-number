let screenNumber = 1;
let gameNumber = 0;
let streak = 0;
let maxStreak = 0;
let chances = 0;

// $('.screen-1').hide();
$('.screen-2').hide();
$('.screen-3').hide();

$('.play-button').click({
  goBack: false
}, changeScreen);

$('.back-button').click({
  goBack: true
}, changeScreen);

$('.select-button').click(createGame);

function changeScreen(event) {
  $('.screen-' + screenNumber).fadeOut();

  if (!event.data.goBack) {
    screenNumber++;
  } else {
    screenNumber--;
  }

  setTimeout(function () {
    $('.screen-' + screenNumber).fadeIn();
  }, 500);
};

function generateNumber(max) {
  return Math.floor(Math.random() * max) + 1;
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

  gameNumber = generateNumber(range);

  renderRangeNumbers(range);
  
  streak = 0;
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
  renderChancesPoints(chances);
};

const colors = {
  1: '#6fa8dc',
  2: '#2c73b3',
  3: '#0a4c87',
  4: '#073763',
  5: '#062847'
}

function renderRangeNumbers(numbersRange) {
  $( ".number-button" ).remove();
  
  for (i = 1; i <= numbersRange; i++) {
    $(".numbers-wrapper").append(
      `<button class="number-button color-` + i + `" value="` + i + `">` + i + `</button>`
    );
    $(".color-" + i).css("background-color", colors[generateNumber(5)])
  };

  $('.number-button').click(compare);
};

function renderChancesPoints(chancesRange) {
  $( ".chance-point" ).remove();

  for (i = 1; i <= chancesRange; i++) {
    $(".chances-wrapper").append(
      `<img class="chance-point" src="./images/heart.png" />`
    );
  };
};

function warning(message, error) {
  const numberButton = $('.number-button');
  const warning = $('.warning-wrapper');

  numberButton.prop("disabled", true);
  numberButton.css("opacity", 0.5);

  if (!error) {
    warning.css("background-color", "green");
  } else {
    warning.css("background-color", "red");
  };

  warning.fadeIn();
  $('.warning-message').text(message);

  setTimeout(function () {
    warning.fadeOut();
    numberButton.css("opacity", 1);
    numberButton.prop("disabled", false);
    renderRangeNumbers(range);
  }, 2000);
};

function compare() {
  const guess = parseInt($(this).attr("value"));
  console.log("guess:",guess)

  if (!guess || guess == NaN) {
    warning('Valor inválido', true);
    return;
  }

  if (guess == gameNumber) {
    warning("Right answer! I was thinking about " + gameNumber, false);

    streak++;
    if (streak > maxStreak) {
      maxStreak = streak;
    };
  } else {
    warning("You missed!", true);

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
  gameNumber = generateNumber(range);
  updateStats();
};