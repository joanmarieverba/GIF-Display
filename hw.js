      "use strict";
      
      // Initial array of movies
      var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // Creating a div to hold the movie (automatically supplies the </div> at the end)
          var movieDiv = $("<div class='movie'>");

          // Storing the rating data
          var rating = response.Rated;
          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          movieDiv.append(pOne);

          // Storing the release year
          var released = response.Released;
          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);
          // Displaying the release year
          movieDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;
          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);
          // Appending the plot
          movieDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;
          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // Appending the image
          movieDiv.append(image);

          //clear previous input 
          $("#movies-view").empty();

          // Putting the entire movie above the previous movies
          //$("#movies-view").prepend(movieDiv);
          $("#movies-view").append(movieDiv);
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Loops through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("movie");
          // Added a data-attribute
          a.attr("data-name", movies[i]);
          // Provided the initial button text
          a.text(movies[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();