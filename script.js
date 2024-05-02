$(function() {
  console.log("Script.js Loaded");

  var maxButtons = 4;
  var clickedButtons = [];

  // Function to handle button clicks
  function handleButtonClick(button) {
    var buttonId = button.attr("id");
    var buttonRow = button.data("row");

    // If the button is already clicked or successful, do nothing
    if (clickedButtons.includes(buttonId) || button.hasClass("success")) {
      return;
    }

    // If the maximum number of buttons has not been reached, add the button to the clickedButtons array and disable it
    if (clickedButtons.length < maxButtons) {
      button.addClass("selected");
      clickedButtons.push(buttonId);
    }

    // Enable all buttons
    $(".numberButton").prop("disabled", false);

    // Disable remaining buttons if the maximum number of buttons has been clicked
    if (clickedButtons.length === maxButtons) {
      $(".numberButton").not(".selected").prop("disabled", true);
    }
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    console.log("Form submitted");

    // Check if all clicked buttons are in the same row
    if (clickedButtons.length === maxButtons) {
      var firstButtonRow = $(".numberButton.selected").first().data("row");
      var buttonsInSameRow = $(".numberButton.selected[data-row='" + firstButtonRow + "']");

      if (buttonsInSameRow.length === maxButtons) {
        handleSuccess(buttonsInSameRow);
      } else {
        handleRowMismatch();
      }

      // Reset clickedButtons array
      clickedButtons = [];
    } else {
      console.log("Not enough buttons clicked.");
    }
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
      alert("Congratulations! You've won!");
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
});
