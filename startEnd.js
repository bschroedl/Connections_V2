function timer() {
  let clockSec = document.querySelector('.sec');
  let sec = 60;

  setInterval(() => {
    sec--; // decrement seconds
    clockSec.textContent = sec; // update timer display

    if (sec === 0) {
      let game = document.querySelector(".game1");
      let end = document.querySelector(".game3");

      end.style.display = 'block';
      game.style.display = 'none';

      $('.cont').text("You Lost :C");

      // console.log("Bad At Game");
    }
  }, 1000); // update timer every second
}

function clearStart() {
  let game = document.querySelector(".game1");
  let start = document.querySelector(".game2");
  let clock = document.querySelector(".timer");

  timer();

  start.style.display = 'none';
  game.style.display = 'block';
  clock.style.display = 'block';
}