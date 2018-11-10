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
          var gifUrl = response.data[i].images.fixed_height.url;

          
          var gifImage = $("<img>");

          gifImage.attr("src", gifUrl);
          gifImage.attr("alt", "QB Gifs");

          $("#player-view").append(gifImage); 

          }});
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