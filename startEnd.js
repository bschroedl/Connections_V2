// timer.js

let intervalId;

function timer() {
  let sec = 30;
  let clockSec = document.querySelector('.sec');
  intervalId = setInterval(() => {
    sec--;
    clockSec.textContent = sec;


    if (sec === 0) {
      let game = document.querySelector(".game1");
      let end = document.querySelector(".game3");

      end.style.display = 'block';
      game.style.display = 'none';

      $('.cont').text("You Lost :C");

      clearInterval(intervalId); // Stop the timer
    }
  }, 1000); // update timer every second
}

// Expose intervalId globally
window.intervalId = intervalId;



function clearStart() {
  let game = document.querySelector(".game1");
  let start = document.querySelector(".game2");
  let clock = document.querySelector(".timer");

  timer();
  startGame();

  start.style.display = 'none';
  game.style.display = 'block';
  clock.style.display = 'block';
}

function clearEnd() {
  let game = document.querySelector(".game1");
  let start = document.querySelector(".game3");
  let clock = document.querySelector(".timer");

  timer();
  startGame();

  start.style.display = 'none';
  game.style.display = 'block';
  clock.style.display = 'block';
}