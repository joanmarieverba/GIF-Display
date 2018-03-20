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

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("topbuttons");
          // Added a data-attribute
          a.attr("data-name", items[i]);
          // Provided the initial button text
          a.text(items[i]);
          // Added the button to the buttons-view div
          $("#gifbuttons").append(a);
        }
      }
      renderButtons();

      //when one of the top buttons are clicked
      // $(".topbuttons").click(function () {
      //   let data = $(this).attr("data-name");
      //   console.log("top button clicked");
      //   displayGIFs(data);
      // })
      $(document).on("click", ".topbuttons", displayGIFs);


      // displayGIFs function re-renders the HTML to display the appropriate content
      function displayGIFs() {

       let item = $(this).attr("data-name");
       console.log("data-name ", item);

        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=Ebv1xRbHRFV9SafJDmTUY22Qy0LWjZzs&limit=12";
        console.log(queryURL);
        // Creates AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.data[0].rating);
          // Creating a div to hold the gif (automatically supplies the </div> at the end)
          let gifDiv = $("<div class='picture'>");

          for (var i = 0; i < 12; i++) {

            //  Storing the rating data
            let gifRating = response.data[i].rating;
            // Creating an element to have the rating displayed
            let aboveGIF = $("<p>").text(`Rating: ${gifRating}`);
            // Displaying the rating
            gifDiv.append(aboveGIF);

            // Retrieving the URL for the gif
            let imgURL = response.data[i].images.fixed_height.url;
            // Creating an element to hold the image
            let image = $("<img>").attr("src", imgURL);
            // Appending the image
            gifDiv.append(image);
          }

          //clear previous input 
          $("#thegifs").empty();

          // Putting the gif on the page
          $("#thegifs").append(gifDiv);
        });

      }



      // This function handles events where the add category button is clicked
      $("#addcategory").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var iteminput = $("#btninput").val().trim();

        // The movie from the textbox is then added to our array
        items.push(iteminput);
        console.log("iteminput ", iteminput);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "addcategory"
      $(document).on("click", "#addcategory", displayGIFs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();