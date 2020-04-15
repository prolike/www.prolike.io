$(document).ready(function() {
  $("#fullpage").fullpage({
    licenseKey: '13C63801-E81E4DE0-A9E067C5-0545BBE7',
    navigation: true,
    fadingEffect: true,
    responsive: true,
    resize: true,
    menu: "#menu",
    anchors: ["home", "why", "how", "what", "footer"],
    scrollingSpeed: 700,
    autoScrolling: true
  });
});

// get all the slides and their names to insert in anchor line

var slides = document.getElementsByClassName("story-heading");

var slideHeadings = [];

for (var i = 0; i < slides.length; i++) {
  slideHeading = slides[i].innerText.toLowerCase();

  slideHeadings.push(slideHeading.replace(/\s/g, ""));
}

$(document).ready(function() {
  $("#storyfullpage").fullpage({
    licenseKey: '13C63801-E81E4DE0-A9E067C5-0545BBE7',
    navigation: true,
    fadingEffect: true,
    responsive: true,
    resize: true,
    menu: "#menu",
    anchors: [...slideHeadings],
    scrollingSpeed: 700,
    autoScrolling: true
  });
});
// Allows for the use to go back to the site from whence they came when pressing on the back button, instead of going back and forth between our front page slides.

$(window).on("click", "a", function(e) {
  var href = $(e.target).attr("href");
  if (href && href[0] === "#") {
    window.location.replace(e.target.href);
    return false;
  }
});
