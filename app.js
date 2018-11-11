var quarterBacks = ["Cam Newton", "Tom Brady", "Aaron Rodgers", "Drew Brees"];

      function displayPlayers() {
        var q = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=OEPwXXW8NCHlnYLTfRxwRVLVituXfbrL&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            $("#player-view").empty();
            console.log(response.data);

          for (var i = 0; i < response.data.length; i++){
          var gifUrlStill = response.data[i].images.fixed_height_still.url;
          var gifUrlAnimate = response.data[i].images.fixed_height.url;
          var p = $("<p>")

          var rating = response.data[i].rating
          p.text("Rating: " + rating)

          
          var gifImage = $("<img>");

          gifImage.addClass("gif")

          gifImage.attr("src", gifUrlStill);
          gifImage.attr("alt", "QB Gifs");
          gifImage.attr("data-still", gifUrlStill);
          gifImage.attr("data-animate", gifUrlAnimate);
          gifImage.attr("data-state", "still");

          $("#player-view").append(gifImage, p); 
          };

          $(".gif").on("click", function() {
  
            var state = $(this).attr("data-state")
      
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"))
              $(this).attr("data-state", "animate")
            } else {
              $(this).attr("src", $(this).attr("data-still"))
              $(this).attr("data-state", "still")
            }});

          });
        };
      

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < quarterBacks.length; i++) {

          var a = $("<button>");
          a.addClass("player");
          a.attr("data-name", quarterBacks[i]);
          a.text(quarterBacks[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-player").on("click", function(event) {
        event.preventDefault();

        var player = $("#player-input").val().trim();

        quarterBacks.push(player);
        console.log(player);

        renderButtons();
      });


      $(document).on("click", ".player", displayPlayers);

      renderButtons();