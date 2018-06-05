/* Issues
* user can click on a card twice to trigger a "match"
* user can open 3 cards at a time
* playing a 3rd round messes up the timer
*/


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
var matchedDeck = 0;
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
* @param {array} cardDeck - list of card types
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
* @param {int} num - the star rating (1-3)
*/
function starUpdate(num) {
  switch (num) {
    case 3:
      $('.stars').html('<li><i class="fa fa-star"></i></li>&nbsp;<li><i class="fa fa-star"></i></li>&nbsp;<li><i class="fa fa-star"></i></li>');
      break;
    case 2:
      $('.stars li').children('i').eq(2).toggleClass('fa-star fa-star-o');
      break;
    case 1:
      $('.stars li').children('i').eq(1).toggleClass('fa-star fa-star-o');
      break;
  }
}


/**
* @description tracks the number of moves made and adjusts star rating
*/
function trackMoves() {
  // increment move counter
  numberOfMoves += 1;
  // update html with the number of moves made so far
  $('.moves').text(numberOfMoves);
  // change star rating based on number of moves made
  switch (numberOfMoves) {
    case 24:
      starRating = 2;
      starUpdate(2);
      break;
    case 32:
      starRating = 1;
      starUpdate(1);
      break;
  }
}


/**
* @description if there's a match, lock the cards into open position
 */
function lockCards() {
  $('.deck').find('.open').toggleClass('match open show');
}


/**
* @description if there's no match, flip the cards back over
 */
function clearCards() {
  $('.deck').find('.open').toggleClass('open show');
}


/**
 * @description check to see if cards match
 * @param {array} arr - list of open cards
 */
function seeIfMatch(arr) {
  if (arr[0] === arr[1]) {
    // add to the win condition
    matchedDeck += 2;
    // set short delay before changing card color
    setTimeout(lockCards, 400);
  } else {
    // set short delay before flipping cards back over
    setTimeout(clearCards, 800);
  }
  // empty the list of open cards
  openList = [];
}


/**
 * @description adds current card to list of open cards
 * @returns {array} openList - list of open cards
*/
function updateOpenList() {
  const iconHTML = $that.html();
  openList.push(iconHTML);
  if (openList.length === 2) {
    seeIfMatch(openList);
  } else {
    return openList;
  }
}


/**
* @description reactivates the first click on a card to start the timer
*/
function letTimerRestart() {
  $('.deck').one('click', '.card', function() {
    startTimer();
  });
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
  starUpdate(3);
  // reset Win condition
  matchedDeck = 0;
  // remove the old cards, shuffle, and rebuild the card deck
  $('.deck').empty();
  shuffle(cardDeck);
  buildDeck(cardDeck);
  // clear openList in case something was in there
  openList = [];
  // reactivate the first card clicked to start the timer
  letTimerRestart();
}


/**
 * @description when user wins the game, the modal pops up with user stats
*/
function winModal() {
  const modal = $('.modal');
  const winTime = $('.winTime');
  const winMoves = $('.winMoves');
  const winRating = $('.winRating');
  const clockStatus = $('.clock').html();
  modal.toggleClass('hide');
  winRating.text(starRating);
  winTime.html(clockStatus);
  winMoves.text(numberOfMoves);
  // replay button lets you restart the game
  $('.replay').on('click', function () {
    modal.toggleClass('hide');
    reset();
  })
}


/**
* @description checks if all the cards are matching and triggers win function
*/
function checkIfWinner() {
  if (matchedDeck === 16) {
    stopTimer();
    // delay popup modal
    setTimeout(winModal, 800);
  }
}


// once the html loads, shuffle the cards and build the grid
document.addEventListener('DOMContentLoaded', function () {
  shuffle(cardDeck);
  buildDeck(cardDeck);
  letTimerRestart();
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
  // check win condition
  checkIfWinner();
})


// user can click refresh icon to restart the game
$('.restart').on('click', 'i', function () {
  reset();
})
