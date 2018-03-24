      "use strict";

      // Initial array of items
      let items = ["astronomy", "space", "satellite", "astronaut", "moon", "star", "aurora", "planet"];

      // Function for placing buttons on screen
      function renderButtons() {

        // Deletes the on screen data prior to adding new items
        // (this is necessary otherwise you will have repeat buttons)
        $("#gifbuttons").empty();

        // Loops through the array of items
        for (var i = 0; i < items.length; i++) {

          // Then dynamicaly generates buttons for each item in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class to our button
          a.addClass("topbuttons");
          // Added a data-attribute
          a.attr("data-name", items[i]);
          // Provided the initial button text
          a.text(items[i]);
          // Added the button to the buttons-view div
          $("#gifbuttons").append(a);
        };
      };
      renderButtons();

      $(document).on("click", ".topbuttons", displayGIFs);


      // displayGIFs function re-renders the HTML to display the appropriate content
      function displayGIFs() {

       let item = $(this).attr("data-name");
       console.log("data-name ", item);

        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=Ebv1xRbHRFV9SafJDmTUY22Qy0LWjZzs&limit=10";
        console.log(queryURL);
        // Creates AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // Creating a div to hold the gif (automatically supplies the </div> at the end)
          let gifDiv = $("<div class='picture'>");

          for (var i = 0; i < 10; i++) {

            let gifAndRatingDiv = $("<div class='gifplusrating'>");
            //  Storing the rating data
            let gifRating = response.data[i].rating;
            // Creating an element to have the rating displayed
            let aboveGIF = $("<p>").text(`Rating: ${gifRating}`);
            // Displaying the rating
            gifAndRatingDiv.append(aboveGIF);


            // Retrieving the URL for the gif
            let imgURL = response.data[i].images.original_still.url;
            // Creating an element to hold the image
            let image = $("<img>").attr("src", imgURL).addClass("clickimage").attr("gifindex", i).attr("item-name", item).attr("still", 1);
            // Appending the image
            gifAndRatingDiv.append(image);

            gifDiv.append(gifAndRatingDiv);

          };

          //clear previous input
          $("#thegifs").empty();

          // Putting the gif on the page
          $("#thegifs").append(gifDiv);
        });

      };

      // This function handles events where the add category button is clicked
      $("#addcategory").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var iteminput = $("#btninput").val().trim();

        // The item from the textbox is then added to our array
        items.push(iteminput);

        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + iteminput + "&api_key=Ebv1xRbHRFV9SafJDmTUY22Qy0LWjZzs&limit=10";
        console.log(queryURL);
        // Creates AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          console.log(response);

          // Creating a div to hold the gif (automatically supplies the </div> at the end)
          let gifDiv = $("<div class='picture'>");

          for (var i = 0; i < 10; i++) {

            let gifAndRatingDiv = $("<div class='gifplusrating'>");
            //  Storing the rating data
            let gifRating = response.data[i].rating;
            // Creating an element to have the rating displayed
            let aboveGIF = $("<p>").text(`Rating: ${gifRating}`);
            // Displaying the rating
            gifAndRatingDiv.append(aboveGIF);


            // Retrieving the URL for the gif
            let imgURL = response.data[i].images.original_still.url;
            // Creating an element to hold the image
            let image = $("<img>").attr("src", imgURL).addClass("clickimage").attr("gifindex", i).attr("item-name", iteminput).attr("still", 1);
            // Appending the image
            gifAndRatingDiv.append(image);

            gifDiv.append(gifAndRatingDiv);

          };

          //clear previous input
          $("#thegifs").empty();

          //clear input box
          $("#btninput").val("");

          // Putting the gifs on the page
          $("#thegifs").append(gifDiv);
        
        })
          .catch(function () {
            console.log("$.get failed!");

        });


        // Calling renderButtons which adds the button to the top
        renderButtons();
      });


$(document).on("click", ".clickimage", switchGIFs);


// displayGIFs function re-renders the HTML to display the appropriate content
function switchGIFs() {

  let item = $(this).attr("item-name");
  //n is the index of the item clicked
  let n = Number($(this).attr("gifindex"));
  // still is 1 for still frame; 0 for animated
  let whichGIF = Number($(this).attr("still"));

  let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=Ebv1xRbHRFV9SafJDmTUY22Qy0LWjZzs&limit=10";

  // Creates AJAX call for the specific button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // Creating a div to hold the gif (automatically supplies the </div> at the end)
    let gifDiv = $("<div class='picture'>");

    for (var i = 0; i < 10; i++) {

      let gifAndRatingDiv = $("<div class='gifplusrating'>");
      //  Storing the rating data
      let gifRating = response.data[i].rating;
      // Creating an element to have the rating displayed
      let aboveGIF = $("<p>").text(`Rating: ${gifRating}`);
      // Displaying the rating
      gifAndRatingDiv.append(aboveGIF);
      console.log("rating");

      let image;
      // Retrieving the URL for the gif image
      if (i === n && whichGIF === 1) {
        //insert the animated image
        let imgURL = response.data[i].images.fixed_height.url;
        // Creating an element to hold the image
        image = $("<img>").attr("src", imgURL).addClass("clickimage").attr("gifindex", i).attr("item-name", item).attr("still", 0);
      } else {
        //insert the still image
        let imgURL = response.data[i].images.original_still.url;
        // Creating an element to hold the image
        image = $("<img>").attr("src", imgURL).addClass("clickimage").attr("gifindex", i).attr("item-name", item).attr("still", 1);
      };


      // Appending the image
      gifAndRatingDiv.append(image);

      gifDiv.append(gifAndRatingDiv);

    };

    //clear previous input
    $("#thegifs").empty();

    // Putting the gif on the page
    $("#thegifs").append(gifDiv);
  });

};
