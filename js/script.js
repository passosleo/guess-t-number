
$('#user-input').focus()
$(document).on('click', '#user-button', compara);

let streak = 0;
let maxStreak = 0;

function updateStreaks() {
  $(".streak").text(streak);
  $(".max-streak").text(maxStreak);
}

function sorteia(max) {
  return Math.floor(Math.random() * max) + 1;
}

function warning(message){
  $('.warning-wrapper').show();
  $('.warning-message').text(message);

  setTimeout(function(){
    $('.warning-wrapper').hide();
  }, 5000);
}

function compara() {
  const numero = sorteia(10);
  const guess = $('#user-input').val();

  if( !guess ){
    warning('Você não preencheu o campo.');
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
