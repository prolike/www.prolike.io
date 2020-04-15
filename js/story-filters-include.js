let posts = [];
let filter = [];
let dataAuthor = "data-author";
let dataTag = "data-tag";
var staticUrl = window.location.hash;
var hashWithoutHash = staticUrl.replace("#", "");
var noHashes = hashWithoutHash.replace(/[#]/g, ", ");
var noDashes = noHashes.replace(/[-]/g, " ");
// a simple function that sets up the data that is used to make the filter work as intended
$(document).ready(function() {
  posts = document.getElementsByClassName("singlePost");
  filters = document.getElementsByClassName("filterCheckbox");
  checkHash(staticUrl);
  updateHeading("Blogs tagged: " + noDashes);
  $(".tag").click(function() {
    console.log("clicked!");
    location.reload();
  });
});
$(window).bind("hashchange", function() {
  var staticUrl = window.location.hash;
  var hashWithoutHash = staticUrl.replace("#", "");
  var noHashes = hashWithoutHash.replace(/[#]/g, ", ");
  var noDashes = noHashes.replace(/[-]/g, " ");
  updateHeading("Blogs tagged: " + noDashes);
  // uncheck all the checkmarks
});

// Checks the Hash for parameters for filters
function checkHash(hashUrl) {
  if (hashUrl != "") {
    console.log(hashUrl);
    //creating an array in the hash.
    var hashParameters = hashUrl.split("#");
    console.log(hashParameters);

    for (var i = 0; i < filters.length; i++) {
      for (var j = 0; j < hashParameters.length; j++) {
        if (hashParameters[j] == filters[i].getAttribute(dataTag)) {
          readyPostArea();
          filters[i].checked = true;
          for (var l = 0; l < posts.length; l++) {
            //converting datatags into the comma separated list.
            var comas = posts[l].getAttribute(dataTag).split(",");
            for (var k = 0; k < comas.length; k++) {
              if (comas[k] == filters[i].getAttribute(dataTag)) {
                posts[l].style.display = "block";
              }
            }
          }
        }
      }
    }

    // a small check for the author - hide the intro banner if the hash is equal to any of the author names
    var noHash = hashUrl.replace("#", "");
    $(".person-container").each(function() {
      var banner = $(this);
      var divId = banner.attr("id");
      if (divId == noHash) {
        banner.show();
        $(".intro-banner:first").hide();
        readyPostArea();

        // hide all articles and display only those with the filtered author
        $(".singlePost").each(function() {
          var article = $(this);
          author = article.data("author");
          console.log(author);
          if (noHash == author) {
            article.show();
          }
        });
      }
    });
  }
}
function updateHeading(headerTitle) {
  $("h1:contains('Blogs tagged:')").html(headerTitle);
}

// updates the url if you add filter option
function updateUrl(filterVar) {
  let urlVariable = "#" + filterVar;
  var dynamicUrl = "";
  var path = "/infographics/all/";
  console.log(path);
  if (!staticUrl.includes(urlVariable)) {
    staticUrl = staticUrl + urlVariable;
    dynamicUrl = staticUrl;
    //      window.location.hash = dynamicUrl;
    //      window.location.pathname = path + dynamicUrl;
    url = path + dynamicUrl;
    console.log("final url:" + url);
    window.location.href = url;
  } else {
    staticUrl = staticUrl.replace(urlVariable, "");
    dynamicUrl = staticUrl;
    //    window.location.hash = dynamicUrl;
    url = path + dynamicUrl;
    window.location.href = url;
  }
}
// returns you to all paginated posts page when no filter is picked
function restoreDefault() {
  window.location.replace("/stories/");
}


// removes all posts before adding the posts which reflect users filter choice
function readyPostArea() {
  for (var i = 0; i < posts.length; i++) {
    posts[i].style.display = "none";
  }
}
// checks if filters are checked if so it returns true else it returns false
function filterListIsChecked() {
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].checked) {
      return true;
      break;
    }
  }
  return false;
}
// the main function that executes when user clicks a filter option
function filterChange(callingElement) {
  readyPostArea();
  updateUrl(callingElement.getAttribute(dataTag));
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].checked) {
      for (var j = 0; j < posts.length; j++) {
        var comas = posts[j].getAttribute(dataTag).split(",");
        for (var k = 0; k < comas.length; k++) {
          if (comas[k] == filters[i].getAttribute(dataTag)) {
            posts[j].style.display = "block";
          }
        }
      }
    }
  }
  // the following lines checks if there is any filters on if not we restore the page
  if (!filterListIsChecked()) {
    restoreDefault();
  }
}
