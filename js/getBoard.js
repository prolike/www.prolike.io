"use strict";

$(document).ready(function () {
  loadBoard();
});

function loadBoard() {

  var user = sessionStorage.getItem("user");
  var getWorkspaces = new XMLHttpRequest();
  getWorkspaces.open("GET", "https://europe-west1-prohub-6f0e8.cloudfunctions.net/zenhub/workspaces?email=" + user, true);
  getWorkspaces.onload = function () {
    var data = JSON.parse(this.response);
    if (getWorkspaces.status >= 200 && getWorkspaces.status < 400) {
      console.log(data);
        
   
        var content = ""
        data.forEach(element => {
          content += makeTile(element, element.repositories[0]);
        });
        
        $(".workspaces").replaceWith(content);
      
      
    }
  };

  getWorkspaces.send();
}

function makeTile(workspace, repo) {
  var element = '<div class="board-link"><a href="/board?wp=' + workspace.id + '&repo=' + repo + '">' + workspace.name + '</a></div>'
  return element;
}


