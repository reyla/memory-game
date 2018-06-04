/*
 * global variables
 */
var clock;
var sec = 0;
var min = 0;
var numberOfMoves = 0;
var starRating = 3;
var cardDeck = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"]
var openList = [];
var $that = "";


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/**
* @description builds the html for the deck grid and assigns card types
* @param input an array of card types
*/
function buildDeck(cardDeck) {
  const deckSize = cardDeck.length;
  for (let i = 0; i < deckSize; i++) {
    $('.deck').append('<li class="card"><i class="fa ' + cardDeck[i] + '"></i></li>');
  }
}


/**
* @description these functions control the clock
* code based on Chris Neal's tutorial here: https://gwgnanodegrees.slack.com/files/UA8PXHUR3/FB0Q3CSMB/Getting_the_Memory_Game_timer_to_work
*/

function startTimer() {
  clock = setInterval(timer, 1000);
}

function stopTimer() {
  clearInterval(clock);
  sec = 0;
  min = 0;
}

function timer() {
  sec++;
  if (sec < 10) {
    sec = `0${sec}`;
  } if (sec >= 60) {
    min++;
    sec = "00";
  }
  $('.clock').html("0" + min + ":" + sec);
}


/**
* @description updates the star icons on gameboard and also in modal
* @param input the star rating number (0-3)
*/
function starUpdate(num) {
  switch (num) {
    case 3:
      break;
    case 2:
      $('.stars li').children('i').eq(2).toggleClass('fa-star fa-star-o');
      break;
    case 1:
      $('.stars li').children('i').eq(1).toggleClass('fa-star fa-star-o');
      break;
    case 0:
      $('.stars li').children('i').eq(0).toggleClass('fa-star fa-star-o');
      break;
  }
}


/**
* @description tracks the number of moves made and adjusts star rating
*/
function trackMoves() {
  // increment move counter
  numberOfMoves += 1;
  // show user the number of moves made so far
  $('.moves').text(numberOfMoves);
  // change star rating based on number of moves made
  switch (numberOfMoves) {
    case 20:
      starRating = 2;
      starUpdate(2);
      break;
    case 28:
      starRating = 1;
      starUpdate(1);
      break;
    case 34:
      starRating = 0;
      starUpdate(0);
      break;
  }
}


/**
* @description gets the icon html for currently open card
 */
function findIcon() {
  const iconHTML = $that.html();
  return iconHTML;
}


/**
* @description if there's a match, lock the cards into open position
 */
function lockCards() {
  $('.deck').find('.open').toggleClass('match open show');
}


/**
* @description if there's no match, turn the cards back over
 */
function clearCards() {
  $('.deck').find('.open').toggleClass('open show');
}


/**
 * @description if there are 2 open cards, see if they match
 */
function seeIfMatch(arr) {
  const cardA = arr[0];
  const cardB = arr[1];
  if (cardA === cardB) {
    lockCards();
  } else {
    clearCards();
  }
  // empty the list
  openList = [];
}


/**
 * @description looks for cards with "open" class and tries to match them
*/
function updateOpenList() {
  let iconOpen = findIcon();
  openList.push(iconOpen);
  console.log(openList);
  if (openList.length === 2) {
    // let the card show contents briefly before determining match
    setTimeout(seeIfMatch, 800, openList);
  } else {
    return openList;
  }
}


/**
 * @description restarts the game, via refresh icon or replay button in modal
*/
function reset() {
  // reset timer
  stopTimer();
  $('.clock').html("0" + min + ":0" + sec);
  // reset number of moves
  numberOfMoves = 0;
  $('.moves').text(numberOfMoves);
  // reset star rating
  starRating = 3;
  $('.stars').children('li i').addClass('fa-star');
  // remove the old cards, shuffle, and rebuild the card deck
  $('.deck').empty();
  shuffle(cardDeck);
  buildDeck(cardDeck);
  // clear openList in case something was in there
  openList = []
  // restart the clock;
  startTimer();
}


/**
 * @description when user wins the game, the modal pops up with user stats
*/
function winModal() {
  const modal = $('.modal');
  const winTime = $('.winTime');
  const winMoves = $('.winMoves');
  const replayButton = $('.replay');
  const clockStatus = $('.clock').html();
  modal.toggleClass('hide');
  winTime.html(clockStatus);
  winMoves.text(numberOfMoves);
  // replay button lets you restart the game
  replayButton.on('click', 'button', function (event) {
    event.preventDefault();
    modal.style.display = "none";
    reset();
  })
  // if the user clicks outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
}


/**
* @description checks if all the cards are matching
*/
function checkIfWinner() {
  const matchedCards = $('.deck').find('.match');
  const totalCards = [];
  totalCards.push(matchedCards);
  if (totalCards.length == 16) {
    stopTimer();
    winModal();
  }
}


// once the html loads, then shuffle cards and build the grid
document.addEventListener('DOMContentLoaded', function () {
  shuffle(cardDeck);
  buildDeck(cardDeck);
  // wait 2 seconds before starting the clock
  setTimeout(startTimer, 2000);
  // winModal();
})


// below is everything that happens when you click on a card
$('.deck').on('click', '.card', function () {
  $that = $(this);
  // update number of moves and star rating
  trackMoves();
  // show the contents of the card
  $(this).toggleClass('open show');
  // add the card to a list of open cards
  updateOpenList();
  checkIfWinner();
})


// user can click refresh icon to restart the game
$('.restart').on('click', 'i', function () {
  reset();
})
