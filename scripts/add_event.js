// var currentUser;               //points to the document of the user who is logged in
// function populateUserInfo() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if user is signed in:
//         if (user) {

//             //go to the correct user document by referencing to the user uid
//             currentUser = db.collection("users").doc(user.uid)
//             //get the document for current user
//             currentUser.get()
//                 .then(userDoc => {
//                     //get the data fields of the user
//                     let userName = userDoc.data().name;
//                     let userSchool = userDoc.data().school;
//                     let userCity = userDoc.data().city;

//                     console.log(userName + "SWAWS");
//                 })
//         } else {
//             // No user is signed in.
//             console.log("No user is signed in");
//         }
//     });
// }
// populateUserInfo();

/* When the user clicks on the button, 
     toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function selectType(event) {
    console.log(event);
    var dropdowns = document.querySelector(".dropbtn");
    console.log(event.target.innerHTML, dropdowns);
    dropdowns.innerHTML = event.target.innerHTML;
}

function addDropdownHandler() {
    const dropdown = document.querySelector("#myDropdown");
    dropdown.onclick = selectType;
}

addDropdownHandler();

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function saveNewEvent() {
    let user = firebase.auth().currentUser;
    if (user) {
        var eventsRef = db.collection("events");

        console.log("inside saveNewEvent");
        let eventTitle = document.getElementById("titleInput1").value;
        let eventType = document.querySelector(".dropbtn").innerHTML;
        let eventLocation = document.getElementById("locationInput1").value;
        let eventGroup = document.getElementById("groupInput1").value;
        let eventRepeat = document.forms["repeatFrequency"]["repeat"].value;
        let eventStart = document.getElementById("startTime").value;
        let eventEnd = document.getElementById("endTime").value;
        let userID = user.uid;

        eventsRef.add({
            title: eventTitle,
            type: eventType,
            location: eventLocation,
            group: eventGroup,
            starts: eventStart,
            ends: eventEnd,
            repeat: eventRepeat,
            inputTime: firebase.firestore.FieldValue.serverTimestamp(),
            user: userID
        }).then(function () {
            console.log("New Event Added");
        }).catch(function (error) {
            console.log("Error adding new event: " + error);
        });
    } else {
        console.log("No user is signed in!!!");
    }
}

function tempFunction() {
    console.log("Cancel Clicked");
    // window.location.assign("main.html");       //re-direct to main.html
}