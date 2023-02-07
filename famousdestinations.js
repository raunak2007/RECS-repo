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
$(document).ready(function() {
  $("#post-form").submit(function(e) {
    e.preventDefault();
    var title = $("#post-title").val();
    var text = $("#post-text").val();
    var likes = 0;
    var postHTML = 
      '<div class="container">' +
        '<div class="image-column">' +
          '<div class="img-cropped"></div>' +
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
        "Authorization": "Bearer CODECODECODE"
      },
      data: JSON.stringify({
        "model": "image-alpha-001",
        "prompt": "Apple",
        "num_images":1,
        "size":"1024x1024"
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $(".img-cropped").last().css("background-image", "url(" + data.data[0].url + ")");
      }
    });
  });
});
