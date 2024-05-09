// Define global variables
let wordBank = [
  ['Hugging', 'Hand Shake', 'Kissing', 'High Five'], // Haptic
  ['Pitch', 'Tempo', 'Timbre', 'Intensity'], // Vocalics
  ['Oculesics', 'Gestures', 'Emblems', 'Regulators'], // Kinesics
  ['Territoriality', 'Public Space', 'Social Space', 'Personal Space'], // Proxemics
  ['Personal Time', 'Monochronic', 'Cultural Time', 'Polychronic'], // Chronemics
  ['Blushing', 'Sweating', 'Pupil dilation', 'Heart Beating'], // Physiological Responses
  ['Personal Smell', 'Environment Smell', 'Perfume', 'Sense of Smell'], // Olfactics
  ['Clothing', 'HairStyle', 'Accessories', 'Makeup'] // Personal Presentation
];

let wordBankCategory = [
  'Haptic',
  'Vocalics',
  'Kinesics',
  'Proxemics',
  'Chronemics',
  'Physiological Responses',
  'Olfactics',
  'Personal Presentation'
]

let clickedButtons = [];
let intervalId;
let score = 0;
let everyScore = [];

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to assign random words to buttons
function assignRandomWords(wordBank) {
  let selectedWords = {};

  // Shuffle the wordBank to ensure randomness
  wordBank = shuffleArray(wordBank);

  // Select 4 groups from the shuffled wordBank
  let selectedGroupIndices = shuffleArray(wordBank.map((group, index) => index)).slice(0, 4);

  // Store selected groups from wordBank in selectedWords dictionary
  selectedGroupIndices.forEach(index => {
    selectedWords[index] = wordBank[index];
  });

  return selectedWords;
}


// Function to set button values and data-group attribute based on selectedWords dictionary
function setButtonValuesAndDataGroup(selectedWords) {
  let elements = $(".numberButton");

  // Reset data-group attribute for all buttons
  elements.attr("data-group", "");

  // Define an array to store the original group indices
  let originalGroupIndices = Object.keys(wordBank);

  // Iterate over each button
  elements.each(function (index) {
    // Check if there are still words available in the selectedWords dictionary
    if (Object.keys(selectedWords).length > 0) {
      // Get a random group index from the selected groups
      let groupIndex = Math.floor(Math.random() * Object.keys(selectedWords).length);
      let groupKey = Object.keys(selectedWords)[groupIndex];

      // Get the original group index based on the selected group key
      let originalGroupIndex = originalGroupIndices.findIndex(key => wordBank[key].includes(selectedWords[groupKey][0]));

      // Get a random word from the selected group
      let wordIndex = Math.floor(Math.random() * selectedWords[groupKey].length);
      let word = selectedWords[groupKey].splice(wordIndex, 1)[0]; // Remove the word from the array

      // Assign the word to the button and update data-group attribute
      $(this).val(word);
      $(this).attr("data-group", originalGroupIndex);

      // Remove the group from selectedWords if all words are assigned
      if (selectedWords[groupKey].length === 0) {
        delete selectedWords[groupKey];
      }
    } else {
      // If there are no more words available, clear the button value
      $(this).val("");
    }
  });
}


// Function to handle button clicks
function handleButtonClick(button) {
  let buttonId = button.attr("id");

  // If the button is already clicked or successful, do nothing
  if (button.hasClass("success")) {
    return;
  }

  // Toggle the 'selected' class on the button
  button.toggleClass("selected");

  // Update the clickedButtons array based on the button's selection state
  let index = clickedButtons.indexOf(buttonId);
  if (index === -1) {
    // Add the button to the clickedButtons array if it's not already present
    clickedButtons.push(buttonId);
  } else {
    // Remove the button from the clickedButtons array if it's already present
    clickedButtons.splice(index, 1);
  }

  let maxButtons = 4;

  // Enable all buttons
  $(".numberButton").prop("disabled", false);

  // Disable remaining buttons if the maximum number of buttons has been clicked
  if (clickedButtons.length === maxButtons) {
    $(".numberButton").not(".selected").prop("disabled", true);
  }
}

// Function to handle form submission
// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const maxButtons = 4;

  // Get all elements with the 'numberButton' class
  const elements = document.querySelectorAll('.numberButton');

  // Initialize variables to store the selected group and selected buttons
  let selectedGroup = null;
  let buttonsInSameGroup = [];

  // Loop through each element to find selected buttons and their data-group
  elements.forEach(function (element) {
    if (element.classList.contains('selected')) {
      const group = element.getAttribute('data-group');
      if (!selectedGroup) {
        // If selectedGroup is null, set it to the data-group of the first selected button
        selectedGroup = group;
      }
      if (group === selectedGroup) {
        // If the button's data-group matches the selectedGroup, add it to buttonsInSameGroup
        buttonsInSameGroup.push(element);
      }
    }
  });

  // Check if the number of selected buttons in the same group is equal to the maximum allowed
  if (buttonsInSameGroup.length === maxButtons) {
    let secLeft = document.querySelector('.sec').innerHTML;
    secLeft = Number(secLeft);
    score += (5 * secLeft);

    handleSuccess(buttonsInSameGroup);
  } else {
    handleGroupMismatch();
  }

  // Reset clickedButtons array
  clickedButtons = [];
}


// Function to handle group mismatch (4 buttons not in the same group)
function handleGroupMismatch() {
  // Display a popup or alert if buttons are not in the same group
  alert("Please select 4 words in the same group.");

  // Re-enable all buttons if buttons are not in the same group
  $(".numberButton").prop("disabled", false);

  // Remove the 'selected' class from buttons
  $(".numberButton").removeClass("selected");
}

// Function to handle success (4 buttons in the same row)
// Function to handle success (4 buttons in the same row)
// Function to handle success (4 buttons in the same row)
// Function to handle success (4 buttons in the same row)
function handleSuccess(buttonsInSameRow) {
  // Check if buttonsInSameRow is an array of elements
  if (!Array.isArray(buttonsInSameRow) || buttonsInSameRow.length === 0) {
    // Log an error message and return without further action
    console.error("Invalid input to handleSuccess:", buttonsInSameRow);
    return;
  }

  // Remove the 'selected' class before adding the 'success' class
  buttonsInSameRow.forEach(function (button) {
    button.classList.remove("selected");
  });

  // Change color to green and disable the buttons in the same row
  buttonsInSameRow.forEach(function (button) {
    button.classList.add("success");
    button.disabled = true;
  });

  // Re-enable remaining buttons
  const allButtons = document.querySelectorAll('.numberButton');
  allButtons.forEach(function (button) {
    if (!button.classList.contains("success")) {
      button.disabled = false;
    }
  });

  // Check if all buttons are successful
  const successfulButtons = document.querySelectorAll('.numberButton.success');
  if (successfulButtons.length === allButtons.length) {
    const game = document.querySelector(".game1");
    const end = document.querySelector(".game3");

    game.style.display = "none";
    end.style.display = "block";

    clearInterval(intervalId);



    // Usage example:
    const uniqueDataGroups = getUniqueDataGroups();
    uniqueDataGroups.sort(function (a, b) {
      return a - b;
    })

    uniqueDataGroups.forEach(function(value, i) {
      const para = document.createElement("p");
      para.appendChild(document.createTextNode(`Category ${i + 1}: ${wordBankCategory[value]}`));
      para.classList.add("REMOVE");
      const ele = document.getElementById("cat");
      ele.appendChild(para);
    })


    document.querySelector('.cont').textContent = "You Finished! :D";
    document.querySelector("input[type='submit']").disabled = true;
    document.getElementById("score").textContent = score;

  }
}

// Function to get unique data-group values from selected buttons
function getUniqueDataGroups() {
  // Get all selected buttons
  const selectedButtons = document.querySelectorAll(".numberButton");

  // Set to store unique data-group values
  const uniqueDataGroups = new Set();

  // Iterate over selected buttons and add their data-group values to the set
  selectedButtons.forEach(button => {
    const dataGroup = button.getAttribute("data-group");
    if (dataGroup) {
      uniqueDataGroups.add(dataGroup);
    }
  });

  // Convert the Set to an array and return it
  return Array.from(uniqueDataGroups);
}



// Function to handle row mismatch (4 buttons not in the same row)
function handleRowMismatch() {
  // Display a popup or alert if buttons are not in the same row
  alert("Please select 4 buttons in the same row.");

  // Re-enable all buttons if buttons are not in the same row
  $(".numberButton").prop("disabled", false);

  // Remove the 'selected' class from buttons
  $(".numberButton").removeClass("selected");
}

// Event listener for button clicks
$(".numberButton").click(function () {
  handleButtonClick($(this));
});

// Event listener for form submission
$("#gameForm").submit(handleSubmit);

// Function to clear game end
function clearEnd() {
  everyScore.push(score);
  const para = document.createElement("p");
  para.appendChild(document.createTextNode(`Round ${everyScore.length}: ${score}`));
  const ele = document.getElementById("info");
  ele.appendChild(para);


  const game = document.querySelector(".game1");
  const end = document.querySelector(".game3");
  const clock = document.querySelector(".timer");

  // Reset game state
  clearInterval(intervalId); // Stop the timer
  document.querySelector('.cont').textContent = ""; // Clear any previous messages
  document.getElementById("score").textContent = "0"; // Reset score
  score = 0;

  document.querySelectorAll('.REMOVE').forEach(function (element) {
    element.parentNode.removeChild(element);
  })

  // Reset button state
  const allButtons = document.querySelectorAll('.numberButton');
  allButtons.forEach(function (button) {
    button.classList.remove("selected", "success");
    button.disabled = false;
  });

  // Enable submit button
  document.querySelector("#gameForm input[type='submit']").disabled = false;

  // Restart the timer
  timer();

  // Assign new random words when the page is loaded
  const wordBankCopy = wordBank.map(group => group.slice());
  const selectedWords = assignRandomWords(wordBankCopy);
  // Reset button values and data-group attribute
  setButtonValuesAndDataGroup(selectedWords);

  // Display game and timer
  game.style.display = "block";
  clock.style.display = "block";

  // Hide end screen
  end.style.display = "none";
}


// Function to start the timer
function timer() {
  let sec = 60;
  let clockSec = $(".sec");
  intervalId = setInterval(() => {
    sec--;
    clockSec.text(sec);

    if (sec === 0) {
      let game = $(".game1");
      let end = $(".game3");

      end.show();
      game.hide();

      const uniqueDataGroups = getUniqueDataGroups();
      uniqueDataGroups.sort(function (a, b) {
        return a - b;
      })

      uniqueDataGroups.forEach(function(value, i) {
        const para = document.createElement("p");
        para.appendChild(document.createTextNode(`Category ${i + 1}: ${wordBankCategory[value]}`));
        para.classList.add("REMOVE");
        const ele = document.getElementById("cat");
        ele.appendChild(para);
      })

      $('.cont').text("You ran out of time. :C");
      document.getElementById("score").textContent = score;

      clearInterval(intervalId); // Stop the timer
    }
  }, 1000); // update timer every second
}

// Function to clear game start
function clearStart() {
  let game = $(".game1");
  let start = $(".game2");
  let clock = $(".timer");

  // Start the timer
  timer();

  // Call the function to assign random words when the page is loaded
  let wordBankCopy = wordBank.map(group => group.slice());
  let selectedWords = assignRandomWords(wordBankCopy);
  // Reset button values and data-group attribute
  setButtonValuesAndDataGroup(selectedWords); // Pass selectedWords here

  start.hide();
  game.show();
  clock.show();
}
