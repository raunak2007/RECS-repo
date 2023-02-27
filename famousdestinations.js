$(document).ready(function() {
  // Function to get all posts from API
  getPosts();
  
  // Function to add post HTML to the page
  function addPost(post) {
    var postHTML = 
      '<div class="container" id="' + post.id + '">' + 
        '<div class="text-column">' +
          '<div class="text-subtitle">' + post.title + '</div>' +
          '<div class="text-description">' + post.text + '</div>' +
        '</div>' +
        '<div class="likes-row">' +
          '<div class="like-button" data-liked="' + post.liked + '"></div>' +
          '<div class="dislike-button"></div>' +
          '<div class="text-likes">' + post.imageURL + ' Likes</div>' +
          '<div class="report-button"></div>' + 
        '</div>' + 
      '</div>';
    $("#posts").append(postHTML);
    $(".like-button").last().click(function() {
      // Function to like a post
      like($(this).parents(".container").attr("id"), 1);
    });
    $(".dislike-button").last().click(function() {
      // Function to dislike a post
      like($(this).parents(".container").attr("id"), -1);
    });
    $(".report-button").last().click(function() {
      // Function to delete a post
      remove($(this).parents(".container").attr("id"));
    });
  }

  // Function to delete a post
  function remove(id) {
    var url = "https://farmersflask.duckdns.org/api/fd/delete?id=" + id;
    fetch(url, {
    method: "DELETE"
    })
    .then((response) => response.json())
    location.reload();
  }

  // Function to like a post
  function like(id, likeChange) {
    var url = "https://farmersflask.duckdns.org/api/fd/update?id=" + id;
    fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageURL: likeChange
    })
    })
    .then((response) => response.json())

    location.reload();
  }

  // Function to get all posts from API
  function getPosts() {
    var url = "https://farmersflask.duckdns.org/api/fd";
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
  
  // Function to send post to API
  $("#post-form").submit(function(e) {
    e.preventDefault();
    sendPost();
    location.reload();
  });

  function sendPost() {
    // Get post title and text from form
    var title = $("#post-title").val();
    var text = $("#post-text").val();
    
    /* Commented out OpenAI code
    //Get image
    fetch('https://api.openai.com/v1/images/generations', {
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
  var url = "https://farmersflask.duckdns.org/api/fd/post";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      text: text,
      imageURL: 0
    })
     })
    .then((response) => response.json())
    }
});