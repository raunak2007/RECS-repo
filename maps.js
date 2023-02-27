// prepare HTML result container for new output
const resultContainer = document.getElementById("result");

// prepare HTML result container for new output
const apiUrl = "https://farmersflask.duckdns.org/api/maps";
const create_fetch = apiUrl + '/create';
const read_fetch = apiUrl + '/';
const delete_fetch = apiUrl + '/delete';


$(document).ready(function() {
  getPosts();
  function addPost(post) {
    var likes = post.likes;
    var postHTML = 
      '<div class="container" id="post-' + post.id + '">' + /*
        '<div class="image-column">' +
          '<div class="img-cropped" id="img-post-' + post.id + '"></div>' +
          '<div class="likes-row">' +
            '<div class="like-button" data-liked="' + post.liked + '"></div>' +
            '<div class="dislike-button"></div>' +
            '<div class="text-likes">' + likes + ' Likes</div>' +
            '<div class="report-button"></div>' +
          '</div>' +
        '</div>' + */
        '<div class="text-column">' +
          '<div class="text-subtitle">' + post.title + '</div>' +
          '<div class="text-description">' + post.text + '</div>' +
        '</div>' +
      '</div>';
    $("#posts").append(postHTML);
    /*$(".like-button").last().click(function() {
      likes++;
      $(this).siblings(".text-likes").text(likes + " Likes");
    });
    $(".dislike-button").last().click(function() {
      likes--;
      $(this).siblings(".text-likes").text(likes + " Likes");
    });*/
  }

  function getPosts() {
    var url = "http://127.0.0.1:8012/api/fd";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => { 
      if (request.status == 200) {
        let posts = JSON.parse(request.response);
        Object.entries(posts).forEach((post) => {
          addPost(post[1]);
        });
      } else {
        window.alert("ERROR: Failed to pull posts from API - Try refreshing or check for firewall");
      }
    };
  }
  $("#post-form").submit(function(e) {
    e.preventDefault();
    sendPost();
  });

  function sendPost() {
    var title = $("#post-title").val();
    var text = $("#post-text").val();
  
    //Get image
    /*fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        "model": "image-alpha-001",
        "prompt": title,
        "num_images": 1,
        "size": "1024x1024",
        "response_format": "url"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // Save the image URL from the API response to the imageURL variable
        var imageURL = data.data[0].url;*/

        // Send all data
  var url = "http://127.0.0.1:8012/api/fd/post";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      text: text,
      imageURL: "temp"
    })
     })
    .then((response) => response.json())
    }
});