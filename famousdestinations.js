$(document).ready(function() {
  var postCounter = 0; // declare and initialize the postCounter variable

  $("#post-form").submit(function(e) {
    e.preventDefault();
    var likes = 0;
    var title = $("#post-title").val();
    var text = $("#post-text").val();
    postCounter++; // increment the postCounter variable
    var postHTML = 
        '<div class="container" id="post-' + postCounter + '">' +
        '<div class="image-column">' +
          '<div class="img-cropped" id="img-post-' + postCounter + '"></div>' +
          '<div class="likes-row">' +
            '<div class="like-button"></div>' +
            '<div class="dislike-button"></div>' +
            '<div class="text-likes">' + likes + ' Likes</div>' +
            '<div class="report-button"></div>' +
          '</div>' +
        '</div>' +
        '<div class="text-column">' +
          '<div class="text-subtitle">' + title + '</div>' +
          '<div class="text-description">' + text + '</div>' +
        '</div>' +
        '</div>';
  $("#posts").append(postHTML);
  $(".like-button").last().click(function() {
    likes++;
    $(this).siblings(".text-likes").text(likes + " Likes");
  });
  $(".dislike-button").last().click(function() {
    likes--;
    $(this).siblings(".text-likes").text(likes + " Likes");
  });

  $.ajax({
        url: "https://api.openai.com/v1/images/generations",
        type: "post",
        headers: {
          "Authorization": "Bearer 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"
        },
        data: JSON.stringify({
          "model": "image-alpha-001",
          "prompt": title,
          "num_images": 1,
          "size":"512x512"
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
          var imageUrl = data.data[0].url;
          $("#img-post-" + postCounter).css("background-image", "url(" + imageUrl + ")");
        }
      });

    $("#post-form").trigger("reset"); // reset the form
  });
});
