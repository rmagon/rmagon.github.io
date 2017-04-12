var colors = [ {
  primary: "black",
  secondary: "#F1F1F1"
},{
  primary: "black",
  secondary: "#F6600"
},{
  primary: "black",
  secondary: "#A2BB49"
},{
  primary: "white",
  secondary: "#E10013"
},{
  primary: "white",
  secondary: "#D60789"
},{
  primary: "white",
  secondary: "#133511"
},{
  primary: "white",
  secondary: "#102c35"
},{
  primary: "black",
  secondary: "#49d2ff"
}]

var colorCount = 0;
var transitionSpeed = 1000;
var quote;
var author;

function getQuotationFromAPI() {
  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
    headers: {
      'X-Mashape-Key': 'lxjkTySzTDmshJy9vB0cQZrqlaoip1NV20wjsnP7ccrUxNmqTZ',
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    type: "POST",
    dataType: "json",
    success: updateQoutation,
  });
};

function updateQoutation(data) {
  var newColor = Math.floor(Math.random() * (colors.length - 1));
  if (newColor == colorCount) {
    newColor++;
  }
  colorCount = newColor;
  $("#mqm-text").empty();
  $("#mqm-author").empty();
  $("#mqm-random").empty();
  $("body").animate({
    color: colors[colorCount].secondary,
    backgroundColor: colors[colorCount].primary
  }, transitionSpeed, function() {
    $("#mqm-text").append(data.quote);
    $("#mqm-author").append(data.author);
    $("#mqm-random").append("<i class='fa fa-random' aria-hidden='true'></i> Click anywhere for the next random quote");
    quote = data.quote;
    author = data.author;
  });

  $(".mgm-button").animate({
    backgroundColor: colors[colorCount].secondary,
    color: colors[colorCount].primary
  }, transitionSpeed / 2);

}

$(document).ready(function() {
  getQuotationFromAPI();
  $('#updateQuotation').on('click', getQuotationFromAPI);
  
  $('#mgmTweet').on('click', function() {
  url = 'https://twitter.com/intent/tweet?hashtags=random&text=' + encodeURIComponent('"' + quote + '" -' + author);
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  });
  
  setInterval(function() {
  getQuotationFromAPI()
}, 5000);
});