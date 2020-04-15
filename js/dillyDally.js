$(function() {
    $("#timereg_form2a").hide();
    $("#timereg_form2b").hide();
    $("input[type='radio'][name='githubIssue']").change(function() {
        if ($(this).val() == "yes") {
            $("#timereg_form2a").show();
            $("#timereg_form2b").hide();
            $(':input:not(:button)', $("#timereg_form2b")).val('')
        } else if ($(this).val() == "no") {
            $("#timereg_form2b").show();
            $("#timereg_form2a").hide();
            $(':input:not(:button)', $("#timereg_form2a")).val('')
        }
    });
});


function setEmail(email) {
    $(document).ready(function() {
        // executes when HTML-Document is loaded and DOM is ready
        document.getElementById("email").value = email;

    });
}

function validateForms(method, form1, form2) {
    form1 = validate(form1)
    form2 = validate(form2)

    if (form1 && form2) {
        if (method === 'post') {
            postForm($('#timereg_form_post').serializeArray())
        } else if (method === 'put') {
            putForm($('#timereg_form_put').serializeArray())
        }
    }
}

function validate(element) {
    let allAreFilled = true;
    document.getElementById(element).querySelectorAll("[required]").forEach(function(element) {
        if (element.value == "") {
            element.setAttribute("style", "border: 1px solid red;");
        } else {
            element.setAttribute("style", "border: 1px solid #ccc;");
        }

        if (!element.value) allAreFilled = false;

    })
    return allAreFilled;
}

function convertNumber(data) {
    let result = {};
    $.each(data, function() {
        var type = document.getElementsByName(this.name)[0].type;
        var value = document.getElementsByName(this.name)[0].value;

        if (type === "number") {
            if (value === "") {
                result[this.name] = 0;
            } else {
                result[this.name] = Number(this.value) ? Number(this.value) : this.value;
            }
        } else {
            result[this.name] = this.value
        }
    });
    return result;
}

function postForm(data) {
    let result = convertNumber(data);

    let workhours = '{"type": "workhours", "fields" : ' + JSON.stringify(result) + ' }';

    postData(workhours);
}

function postData(data) {
    var token = getToken()
    axios({
            method: 'post',
            url: 'https://us-central1-dillydally-stage.cloudfunctions.net/api',
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            if (res.status === 200) {
                success();
            } else {
                error();
            }
        })
        .catch(() => {
            error();
        });
}

function putForm(data) {
    let doc_id = document.getElementById('doc_id').value;

    let result = convertNumber(data);

    let workhours = '{"type": "workhours", "fields" : ' + JSON.stringify(result) + ' }';

    putData(doc_id, workhours);
}


function putData(id, data) {
    var token = getToken()
    axios({
            method: 'put',
            url: 'https://us-central1-dillydally-stage.cloudfunctions.net/api/' + id,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res) => {
            if (res.status === 200) {
                success();
            } else {
                error();
            }
        })
        .catch(() => {
            error();
        });
}

function success() {
    let div = document.createElement('div');
    div.className = "success";
    div.innerHTML = "<strong>Worklog added to time registration!</strong>";
    document.getElementById("success").append(div);
    setTimeout(function() {
        div.style.display = 'none';
    }, 3000);
}

function error() {
    let div = document.createElement('div');
    div.className = "error";
    div.innerHTML = "<strong>Ups... Worklog not added to time registration!</strong>";
    document.getElementById("error").append(div);
    setTimeout(function() {
        div.style.display = 'none';
    }, 3000);
}

