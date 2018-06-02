/*
 * global variables
 */
var numberOfMoves = 0;
var starRating = 3;

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


function trackMoves() {
  numberOfMoves += 1;
  // show user number of moves made
  $('.moves').text(numberOfMoves);
  console.log("number of moves: " + numberOfMoves);
  // change star rating based on number of moves made
  if (numberOfMoves <= 20) {
    // starRating stays at 3
    // $('.stars')
  } else if (numberOfMoves > 20 && numberOfMoves <= 28) {
    starRating = 2;
  } else if (numberOfMoves > 28 && numberOfMoves <= 34 ) {
    starRating = 1;
  } else if (numberOfMoves > 34 ) {
    starRating = 0;
  }
  console.log("star rating: " + starRating);
}


function refresh() {
  numberOfMoves = 0;
  starRating = 3;
}




// below is everything that happens when you click on a card
$('.deck').on('click', '.card', function () {
  trackMoves();
  // show the contents of the card
  $(this).toggleClass('open show');
  // add the card to a list of open cards
  const openList = updateOpenList();
  // check how many cards are open and see if they match
  seeIfMatch(openList);

})
