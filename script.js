// import { clearStart } from "./startEnd"

function startGame() {
  console.log("Script.js Loaded");

  var maxButtons = 4;
  var clickedButtons = [];

  let wordBank = [
    ['Hugging', 'Hand Shake', 'Kissing', 'High Five'], // Haptic
    ['Pitch', 'Tempo', 'Timbre', 'Intensity'], // Vocalics
    ['Oculesics', 'Gestures', 'Emblems', 'Regulators'], // Kinesics
    ['Territoriality', 'Public Space', 'Social Space', 'Personal Space'], // Proxemics
    ['Personal Time', 'Monochronic', 'Cultural Time', 'Polychronic'], // Chronemics
    ['word 21', 'word 22', 'word 23', 'word 24'],
    ['word 25', 'word 26', 'word 27', 'word 28'],
    ['word 29', 'word 30', 'word 31', 'word 32']
    // ['Blushing', 'Sweating', 'Pupil dilation', 'Heart Beating'], // Physiological Responses
    // ['Personal Smell', 'Environment Smell', 'Perfume', 'Sense of Smell'], // Olfactics
    // ['Clothing', 'HairStyle', 'Accessories', 'Makeup'] // Personal Presentation
  ];

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

// Function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

// Call the function to assign random words when the page is loaded
  let selectedWords = assignRandomWords(wordBank);

// Print selected words
  console.log(selectedWords);




  // Function to set button values and data-group attribute based on selectedWords dictionary
  function setButtonValuesAndDataGroup(selectedWords) {
    let elements = $(".numberButton");

    // Iterate over each button
    elements.each(function(index) {
      // Get a random group index from the selected groups
      let groupIndex = Math.floor(Math.random() * Object.keys(selectedWords).length);
      let groupKey = Object.keys(selectedWords)[groupIndex];

      // Get a random word from the selected group
      let wordIndex = Math.floor(Math.random() * selectedWords[groupKey].length);
      let word = selectedWords[groupKey].splice(wordIndex, 1)[0]; // Remove the word from the array

      // Assign the word to the button and update data-group attribute
      $(this).val(word);
      $(this).attr("data-group", groupKey);

      // Remove the group from selectedWords if all words are assigned
      if (selectedWords[groupKey].length === 0) {
        delete selectedWords[groupKey];
      }
    });
  }



  // Call the function to set button values and data-group attribute
  setButtonValuesAndDataGroup(selectedWords);




// Function to handle button clicks
  function handleButtonClick(button) {
    var buttonId = button.attr("id");
    var buttonRow = button.data("group");

    // If the button is already clicked or successful, do nothing
    if (button.hasClass("success")) {
      return;
    }

    // Toggle the 'selected' class on the button
    button.toggleClass("selected");

    // Update the clickedButtons array based on the button's selection state
    var index = clickedButtons.indexOf(buttonId);
    if (index === -1) {
      // Add the button to the clickedButtons array if it's not already present
      clickedButtons.push(buttonId);
    } else {
      // Remove the button from the clickedButtons array if it's already present
      clickedButtons.splice(index, 1);
    }

    // Enable all buttons
    $(".numberButton").prop("disabled", false);

    // Disable remaining buttons if the maximum number of buttons has been clicked
    if (clickedButtons.length === maxButtons) {
      $(".numberButton").not(".selected").prop("disabled", true);
    }
  }



// Function to handle form submission
// Function to handle form submission
// Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log("Form submitted");

    // Check if all clicked buttons are in the same group
    if (clickedButtons.length === maxButtons) {
      var firstButtonGroup = $(".numberButton.selected").first().data("group");
      var buttonsInSameGroup = $(".numberButton.selected[data-group='" + firstButtonGroup + "']");

      if (buttonsInSameGroup.length === maxButtons) {
        handleSuccess(buttonsInSameGroup);
      } else {
        handleGroupMismatch();
      }

      // Disable the submit button to prevent multiple submissions


      // Reset clickedButtons array
      clickedButtons = [];
    } else {
      console.log("Not enough buttons clicked.");
    }
  }


// Function to handle group mismatch (4 buttons not in the same group)
  function handleGroupMismatch() {
    // Display a popup or alert if buttons are not in the same group
    alert("Please select 4 buttons in the same group.");

    // Re-enable all buttons if buttons are not in the same group
    $(".numberButton").prop("disabled", false);

    // Remove the 'selected' class from buttons
    $(".numberButton").removeClass("selected");
  }



  // Function to handle success (4 buttons in the same row)
  function handleSuccess(buttonsInSameRow) {
    // Remove the 'selected' class before adding the 'success' class
    $(".numberButton.selected").removeClass("selected");

    // Change color to green and disable the buttons in the same row
    buttonsInSameRow.addClass("success").prop("disabled", true);

    // Re-enable all buttons
    $(".numberButton").prop("disabled", false);

    // Check if all buttons are successful
    if ($(".numberButton.success").length === $(".numberButton").length) {
      let game = document.querySelector(".game1");
      let end = document.querySelector(".game3");


      game.style.display = "none";
      end.style.display = "block";

      // alert("Congratulations! You've won!")
      $('.cont').text("You Won! :D");

      $("input[type='submit']").prop("disabled", true);
      $("#score").text($(".sec").text());
    }
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
  $(".numberButton").click(function() {
    handleButtonClick($(this));
  });

  // Event listener for form submission
  $("form").submit(handleSubmit);

}