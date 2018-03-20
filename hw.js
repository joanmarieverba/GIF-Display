      "use strict";
      
      // Initial array of items
      var items = ["literature", "library", "books", "bookstore", "author", "fantasy"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGIFs() {

       let item = $(this).attr("data-name");
       console.log("data-name ", item);

        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=Ebv1xRbHRFV9SafJDmTUY22Qy0LWjZzs&limit=12";
        console.log(queryURL);
        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.data[0].rating);
          // // Creating a div to hold the gif (automatically supplies the </div> at the end)
          // let gifDiv = $("<div class='picture'>");

          // //  Storing the rating data
          // let gifRating = response.data[0].rating;
          // // Creating an element to have the rating displayed
          // let aboveGIF = $("<p>").text(`Rating: ${gifRating}`);
          // // Displaying the rating
          // gifDiv.append(aboveGIF);

          // // Retrieving the URL for the gif
          // let imgURL = response.data[0].bitly_gif.url;
          // // Creating an element to hold the image
          // let image = $("<img>").attr("src", imgURL);
          // // Appending the image
          // gifDiv.append(image);

          // //clear previous input 
          // $("#thegifs").empty();

          // // Putting the gif on the page
          // $("#thegifs").append(gifDiv);
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#gifbuttons").empty();

        // Loops through the array of movies
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

      // This function handles events where the add category button is clicked
      $("#addcategory").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var iteminput = $("#btninput").val().trim();

        // The movie from the textbox is then added to our array
        items.push(iteminput);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      // Adding click event listeners to all elements with a class of "btnform"
      $(document).on("click", "#btnform", displayGIFs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();