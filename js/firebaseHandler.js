$(document).ready(function() {
    init();
});


var isSet = false;
var token;

function init() {
    if (isSet === false) {
        isSet = true;
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }
};

async function onAuthStateChanged(user) {
    if (user) {
        console.log("Signing in successfully");
        var email = user.email
        var prolike = email.split("@")[1]
        if (prolike !== "prolike.io") {
            alert("Not a prolike account!! LOGGING OUT ")
            signOut()
        } else {
            token = await firebase.auth().currentUser.getIdToken()
            setEmail(user.email) //Setting email for email-field document in dillyDally.js
            if (window.location.pathname === "/ddlogin/") 
            {
                window.location.replace("/DillyDally");
            }
        }
    } else {
        if (
            window.location.pathname === "/DillyDally/") {
            window.location.replace("/ddlogin");
        }
    }
};

// Initiates the sign-in flow using GoogleAuthProvider sign in in a popup.
function signIn() {
    console.log("signing in")
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

// Signs-out of Firebase.
function signOut() {
    console.log("signing out")
    firebase.auth().signOut();
    document.cookie = '__session=';
};

function getToken() {
    return token;
}


