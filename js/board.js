
$(document).ready(function () {
  loadBoard();
});



function loadBoard() {

  var token = sessionStorage.getItem("user_t");
  var url = new URL(window.location.href);

  var workspace_id = url.searchParams.get("wp");
  var user = sessionStorage.getItem("user");


  var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
var isodate = firstDay.toISOString()
var est = [];
var lines = [];
var getTitle = new XMLHttpRequest();
  getTitle.open("GET", "https://europe-west1-prohub-6f0e8.cloudfunctions.net/zenhub/workspaces/" + "?email=" + user, true);
  getTitle.onload = function () {
    var data = JSON.parse(this.response);
    data.forEach(workspace => {

      if (workspace.id == workspace_id) {
        workspace.repositories.forEach(repo => {
          est.push(getIssues(repo));

        })

        workspace.pipelines.forEach(line => {
          lines.push(line);
          
        })
        $(".board-title").replaceWith("<h1>" + workspace.name + "</h1>");
        $(".sp-sofar").replaceWith(makeTile(sum(est), "story points so far"));
      }
    })
  };

  getTitle.send();




  var getPipelines = new XMLHttpRequest();
  getPipelines.open("GET", "https://europe-west1-prohub-6f0e8.cloudfunctions.net/zenhub/pipelines/" + workspace_id + "?email=" + user, true);
  getPipelines.onload = function () {
    var data = JSON.parse(this.response);
    if (getPipelines.status >= 200 && getTitle.status < 400) {

      var estimates = [];
      
        data.forEach(workspace => {

          workspace.forEach(pipeline => {
            
            var pipeline_name = pipeline.name.toLowerCase();

            lines.forEach(element => {
              if (pipeline_name == element) {

                estimates.push(pipeline.estimate)
  
  
                
  
              }
            });
            

          });

        });

      
      var content = ""
      var summedEstimates = sum(estimates);
      content += makeTile(summedEstimates, "story points left");
      $(".sp-left").replaceWith(content);
      
    }
  };

  getPipelines.send();



}

function makeTile(sum, text) {
  var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];
  var element = '<div class="summed-tile"><h2>' + sum + '<h2><h3>' + text + '</h3><h4>in ' + n + '</h4></div>'
  return element;
}

function sum(obj) {
  var sum = 0;
  for (var el in obj) {
    if (obj.hasOwnProperty(el)) {
      sum += parseFloat(obj[el]);
    }
  }
  return sum;
}

function getIssues(repo) {
  var token = sessionStorage.getItem("user_t");
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var isodate = firstDay.toISOString()
  var summedestimatesorallrepos = 0;
 
  var allestimatesonerepo = [];
  
  var getClosedIssues = new XMLHttpRequest();
  getClosedIssues.open("GET", "https://api.github.com/repositories/" + repo + "/issues?state=closed&since=" + isodate , false);
  getClosedIssues.setRequestHeader("Authorization", " token " + token);
  getClosedIssues.onload = function () {
    var data = JSON.parse(this.response);
    data.forEach(issue => {
      allestimatesonerepo.push(getEstimates(issue.number, repo)); 

      
    })
    summedestimatesorallrepos = sum(allestimatesonerepo);
  };
  getClosedIssues.send();

return summedestimatesorallrepos;
  
}



  function sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

function getEstimates(number, repo) {
  var estimate = 0;
  var getClosedIssuesEstimates = new XMLHttpRequest();
  getClosedIssuesEstimates.open("GET", "https://api.zenhub.io/p1/repositories/" + repo + "/issues/" + number, false);
  getClosedIssuesEstimates.setRequestHeader("X-Authentication-Token", "aa02c7e3618a31f77e2b94998cd87805b65258aac1542e1e97ae700a2e399b9b98ff80603b690bd7");
  getClosedIssuesEstimates.onload = function () {
    var data = JSON.parse(this.response);
  if (data.estimate) {
      estimate = data.estimate.value;
      

    } 
      

      
    
  };
  getClosedIssuesEstimates.send();

  return estimate;
}

