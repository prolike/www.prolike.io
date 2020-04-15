"use strict";
var token;
var githubCode = window.location.href;
var urlCode = new URL(githubCode);
var ghCode = urlCode.searchParams.get("code");
const proxyurl = "";

if (ghCode == null) {
  window.location.replace("/");
} else {
  var env = document.querySelector(".env").innerHTML;

  if (env == "prod") {
    var siteurl = "https://www.prolike.io";
  }

  if (env == "stage") {
    var siteurl = "https://stage.prolike.io";
  }

  if (env == "local") {
    var siteurl = "http://dockerhost";
  }

  var redirect_url = siteurl + "/login/";

  var data;
  var requestToken = new XMLHttpRequest();
  requestToken.open('GET', 'https://europe-west1-prohub-6f0e8.cloudfunctions.net/github/oauth/access_token/' + ghCode);
  requestToken.setRequestHeader("Accept", "application/json");

  requestToken.onload = function () {
    console.log(this.response);
    var data = JSON.parse(this.response);
    if (requestToken.status >= 200 && requestToken.status < 400) {
      cb(data.access_token);
      console.log(data)
    } else {
      window.location.replace("/");
    }
  };

  requestToken.send();
}

var cb = function (access_token) {
  token = access_token;
  var user = "";
  var getUser = new XMLHttpRequest();
  getUser.open("GET", proxyurl + "https://api.github.com/user", false);
  getUser.setRequestHeader("Authorization", " token " + token);
  getUser.onload = function () {

    var data = JSON.parse(this.response);
    console.log(data);
    user = data.login;

  };

  getUser.send();

  if (token == null) {
    window.location.replace("/");
  } else {
    sessionStorage.setItem("user_t", token);
    sessionStorage.setItem("user", user);
    window.location.replace("/boards/");
  }
}