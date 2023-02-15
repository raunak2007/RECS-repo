/* Api testing */
$(document).ready(function() {
    var postCounter = 0;
  
    // Retrieve existing posts from the Flask API
    function getPosts() {
      $.ajax({
        url: "http://127.0.0.1:8086/api/posts",
        type: "GET",
        success: function(data) {
          $.each(data, function(index, post) {
            var postHTML = 
              '<div class="container" id="post-' + post.id + '">' +
                '<div class="image-column">' +
                  '<div class="img-cropped" id="img-post-' + post.id + '"></div>' +
                  '<div class="likes-row">' +
                    '<div class="like-button" data-liked="' + post.liked + '"></div>' +
                    '<div class="dislike-button"></div>' +
                    '<div class="text-likes">' + post.likes + ' Likes</div>' +
                    '<div class="report-button"></div>' +
                  '</div>' +
                '</div>' +
                '<div class="text-column">' +
                  '<div class="text-subtitle">' + post.title + '</div>' +
                  '<div class="text-description">' + post.text + '</div>' +
                '</div>' +
              '</div>';
            $("#posts").append(postHTML);
          });
          sortPosts();
        }
      });
    }
  
    getPosts();
  
    $(".create-post").click(function() {
      var title = $("#title-input").val();
      var text = $("#text-input").val();
      var likes = 0;
  
      // Send a POST request to the Flask API to create a new post
      $.ajax({
        url: "/api/posts",
        type: "POST",
        data: JSON.stringify({
          title: title,
          text: text,
          likes: likes
        }),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          var postHTML = 
            '<div class="container" id="post-' + data.id + '">' +
              '<div class="image-column">' +
                '<div class="img-cropped" id="img-post-' + data.id + '"></div>' +
                '<div class="likes-row">' +
                  '<div class="like-button" data-liked="false"></div>' +
                  '<div class="dislike-button"></div>' +
                  '<div class="text-likes">' + data.likes + ' Likes</div>' +
                  '<div class="report-button"></div>' +
                '</div>' +
              '</div>' +
              '<div class="text-column">' +
                '<div class="text-subtitle">' + data.title + '</div>' +
                '<div class="text-description">' + data.text + '</div>' +
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
        }
  });
  
  
  
  
  
  
  
  /* Temporary sorting testing*/
  const ascValButton = document.getElementById('asc')
  const decValButton = document.getElementById('dec')
  const ascLikeButton = document.getElementById('ascName')
  const decLikeButton = document.getElementById('decName')
  
  
  const ascendingByValue = (a, b) => a.dataset.value - b.dataset.value
  const descendingByValue = (a, b) => b.dataset.value - a.dataset.value
  const ascendingByLikes = (a, b) => a.dataset.likes - b.dataset.likes
  const descendingByLikes = (a, b) => b.dataset.likes - a.dataset.likes
  
  
  let currentOrder = ascendingByValue
  
  decLikeButton.addEventListener('click', () => {
    currentOrder = descendingByLikes
    order()
  })
  
  
  const order = function() {
    const ordered = [...document.getElementsByClassName('container')].sort(currentOrder)
    ordered.forEach((elem, index) => {
      elem.style.order = index
    })
  }
  
  order()
  
  /* Post*/
  /*
  var postCounter = 0;
  
  var postCounter = 0;
  $(document).ready(function() {
    $("#post-form").submit(function(e) {
      postCounter++;
      e.preventDefault();
      var timeStamp = Date.now();
      var title = $("#post-title").val();
      var text = $("#post-text").val();
      $("#post-title").val("");
      $("#post-text").val("");
  
      var likes = 0;
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
    });
  });*/
  
  /* Api testing */
  