
$('#user-input').focus()
$(document).on('click', '#user-button', compare);

let streak = 0;
let maxStreak = 0;

function updateStreaks() {
  $(".streak").text(streak);
  $(".max-streak").text(maxStreak);
}

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function warning(message){
  $('.warning-wrapper').show();
  $('.warning-message').text(message);

  setTimeout(function(){
    $('.warning-wrapper').hide();
  }, 5000);
}

function compare() {
  const numero = randomNumber(10);
  const guess = $('#user-input').val();

  if( !guess || typeof guess == 'string'){
    warning('Valor inválido');
    return;
  }

  if (guess == numero) {
    warning("Parabéns, você acertou pois eu estava pensando no " + numero);
    streak++;
    if (streak > maxStreak) {
      maxStreak = streak;
    }
  } else {
    warning("Que pena, você errou... Eu estava pensando no " + numero);
    streak = 0;
  }

  updateStreaks();

  $('#user-input').val('')
  $('#user-input').focus()
}

updateStreaks();
