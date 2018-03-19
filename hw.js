      "use strict";
      
      // Initial array of items
      var items = ["Astronomy", "Planet", "Star", "Books"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGIFs() {

        var item = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=Ebv1xRbHRFV9SafJDmTUY22Qy0LWjZzs&limit=12";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
          // Creating a div to hold the movie (automatically supplies the </div> at the end)
         // var movieDiv = $("<div class='movie'>");

          // Storing the rating data
          //var rating = response.Rated;
          // Creating an element to have the rating displayed
          //var pOne = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          //movieDiv.append(pOne);

          // Storing the release year
          //var released = response.Released;
          // Creating an element to hold the release year
         // var pTwo = $("<p>").text("Released: " + released);
          // Displaying the release year
          //movieDiv.append(pTwo);

          // Storing the plot
          //var plot = response.Plot;
          // Creating an element to hold the plot
          //var pThree = $("<p>").text("Plot: " + plot);
          // Appending the plot
          //movieDiv.append(pThree);

          // Retrieving the URL for the image
          //var imgURL = response.Poster;
          // Creating an element to hold the image
          //var image = $("<img>").attr("src", imgURL);
          // Appending the image
          //movieDiv.append(image);

          //clear previous input 
          $("#spacegif").empty();

          // Putting the entire movie above the previous movies
          //$("#movies-view").prepend(movieDiv);
          //$("#movies-view").append(movieDiv);
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
          a.addClass("listitem");
          // Added a data-attribute
          a.attr("data-name", items[i]);
          // Provided the initial button text
          a.text(items[i]);
          // Added the button to the buttons-view div
          $("#gifbuttons").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#addcategory").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var iteminput = $("#btninput").val().trim();

        // The movie from the textbox is then added to our array
        items.push(iteminput);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", "#btnform", displayGIFs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();