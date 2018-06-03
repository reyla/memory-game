/*
 * global variables
 */
var numberOfMoves = 0;
var starRating = 3;
var cardDeck = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"]
var openList = [];


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
* @description tracks the number of moves made and adjusts star rating
*/
function trackMoves() {
  const firstStar = $('.stars li').children('i').eq(0);
  const secondStar = $('.stars li').children('i').eq(1);
  const thirdStar = $('.stars li').children('i').eq(2);
  numberOfMoves += 1;
  // show user the number of moves made so far
  $('.moves').text(numberOfMoves);
  // change star rating based on number of moves made
  switch (numberOfMoves) {
    case 20:
      starRating = 2;
      thirdStar.toggleClass('fa-star fa-star-o');
      break;
    case 28:
      starRating = 1;
      secondStar.toggleClass('fa-star fa-star-o');
      break;
    case 34:
      starRating = 0;
      firstStar.toggleClass('fa-star fa-star-o');
      break;
  }
}


/*
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
* @description if there's a match, lock the cards into open position
 */
function lockCards() {
  $('.deck').find('.open').toggleClass('match open show');
}


/*
* @description if there's no match, turn the cards back over
 */
function clearCards() {
  $('.deck').find('.open').toggleClass('open show');
}


/*
 * @description if there are 2 open cards, see if they match
 */
function seeIfMatch(openList) {
  let cardA = openList[0].innerHTML;
  let cardB = openList[1].innerHTML;
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
  const openCards = $('.deck').find('.open').children('i');
  openList.push(openCards);
  console.log(openList);
  if (openList.length === 2) {
    // let the card show contents briefly before determining match
    setTimeout(seeIfMatch, 800, openList);
  } else {
    return openList;
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
    alert("You've won!");
  }
}


// once the html loads, then shuffle cards and build the grid
document.addEventListener('DOMContentLoaded', function () {
  starRating = 3;
  numberOfMoves = 0;
  shuffle(cardDeck);
  buildDeck(cardDeck);
})


// below is everything that happens when you click on a card
$('.deck').on('click', '.card', function () {
  // update number of moves and star rating
  trackMoves();
  // show the contents of the card
  $(this).toggleClass('open show');
  // add the card to a list of open cards
  updateOpenList();
  checkIfWinner();
})


// when user clicks the refresh button, it will rebuild the game
$('.restart').on('click', 'i', function () {
  // reset number of moves and star rating
  numberOfMoves = 0;
  $('.moves').text(numberOfMoves);
  starRating = 3;
  $('.stars').children('li i').addClass('fa-star');
  // remove the old cards, shuffle, and rebuild the card deck
  $('.deck').empty();
  shuffle(cardDeck);
  buildDeck(cardDeck);
})
