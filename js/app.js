/*
 * global variables
 */
var numberOfMoves = 0;
var starRating = 3;
var cardDeck = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"]


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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 /**
 * @description looks for cards with "open" class and creates list of open cards
 */
function updateOpenList() {
  // const openList = [];
  const openList = $('.open').children('i');
  // openList.push(document.getElementsByClassName('open'));
  console.log(openList);
  return openList;
}


 /**
 * @description if there are 2 open cards, see if they match
 */
function seeIfMatch(openList) {
  if (openList[0] == openList[1]) {
    card.toggleClass('match open show');
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
    case 3:
      starRating = 2;
      thirdStar.toggleClass('fa-star fa-star-o');
      break;
    case 5:
      starRating = 1;
      secondStar.toggleClass('fa-star fa-star-o');
      break;
    case 8:
      starRating = 0;
      firstStar.toggleClass('fa-star fa-star-o');
      break;
  }
}


function refresh() {
  numberOfMoves = 0;
  $('.moves').text(numberOfMoves);
  starRating = 3;
  $('.stars').children('li i').addClass('fa-star');
  shuffle(cardDeck);
  buildDeck(cardDeck);
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
  const openList = updateOpenList();
  // check how many cards are open and see if they match
  // seeIfMatch(openList);

})
