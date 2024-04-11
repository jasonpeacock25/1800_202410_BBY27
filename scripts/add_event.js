
/* When the user clicks on the button, 
     toggle between hiding and showing the dropdown content */
function myFunction(x) {
    document.getElementById("myDropdown" + x).classList.toggle("show");
}

// function selectType(event) {
//     console.log(event);
//     let dropdown1 = document.querySelector("#myDropdown1");
//     console.log(event.target.innerHTML, dropdown1);
//     console.log(dropdown1.innerHTML);
//     dropdown1.innerHTML = event.target.innerHTML;
// }

function selectType1(event) {
    console.log(event);
    var dropdowns = document.querySelector("#dropbtn1");
    console.log(event.target.innerHTML, dropdowns);
    dropdowns.innerHTML = event.target.innerHTML;
}

function selectType2(event) {
    console.log(event);
    var dropdowns = document.querySelector("#dropbtn2");
    console.log(event.target.innerHTML, dropdowns);
    dropdowns.innerHTML = event.target.innerHTML;
}

function selectType3(event) {
    console.log(event);
    var dropdowns = document.querySelector("#dropbtn3");
    console.log(event.target.innerHTML, dropdowns);
    dropdowns.innerHTML = event.target.innerHTML;
}

function addDropdownHandler() {
    const dropdown1 = document.querySelector("#myDropdown1");
    dropdown1.onclick = selectType1;
    const dropdown2 = document.querySelector("#myDropdown2");
    dropdown2.onclick = selectType2;
    const dropdown3 = document.querySelector("#myDropdown3");
    dropdown3.onclick = selectType3;
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

// Save new event, as well as check if the event title is valid
function saveNewEvent() {
    let user = firebase.auth().currentUser;
    if (user) {
        const currentUser = db.collection("users").doc(user.uid);

        console.log("inside saveNewEvent");
        let eventTitle = document.getElementById("titleInput1").value;
        let eventDay = document.getElementById("dropbtn1").innerHTML;
        let eventStart = document.getElementById("dropbtn2").innerHTML;
        let eventDuration = document.getElementById("dropbtn3").innerHTML;

        // GET CURRENT ARRAYS FROM DATABASE
        currentUser.get().then(userDoc => {
            currentMonday = userDoc.data().active_monday;
            currentTuesday = userDoc.data().active_tuesday;
            currentWednesday = userDoc.data().active_wednesday;
            currentThursday = userDoc.data().active_thursday;
            currentFriday = userDoc.data().active_friday;
        })


        schedule = userDoc.data().active_monday;

        // Iterate over each time slot in the schedule
        Object.values(schedule).forEach(classInfo => {
            // Add the class information to the classes array
            classes.push(classInfo);
        }

        // ADD NEW ELEMENT TO CURRENT ARRAY

        // UPDATE DATABASE WITH REVISED ARRAY

        //c) update user's document in Firestore
        currentUser.update({
            active_monday: ["", "", "", "", "BOOLIN", "", "", "", ""]
        }).then(() => {
            console.log("Document successfully updated!");
        })

        /*
        const payload = {
            title: eventTitle,
            type: eventType,
            starts: eventStart,
            ends: eventEnd,
            repeat: eventRepeat,
            inputTime: firebase.firestore.FieldValue.serverTimestamp(),
        }

        const payloadKeys = Object.keys(payload);
        const isPayloadValid = true;
        for (let i = 0; i < payloadKeys.length; i++) {
            if (!payload[payloadKeys[i]]) {
                alert(payloadKeys[i] + " is not valid !"); 
                isPayloadValid = false;
                break;
            }
        }

        if (!isPayloadValid) return;

        eventsRef.add(payload).then(function () {

            history.pushState({}, "", window.location.origin + "/main.html");
            history.go();

            console.log("New Event Added");
        }).catch(function (error) {
            console.log("Error adding new event: " + error);
        });
        */
    } else {
        console.log("No user is signed in!!!");
    }
}

// If user cancel to add new event, return to last page.
function handleCancel() {
    history.back();
    console.log("Cancel Clicked");

    // window.location.assign("main.html");       //re-direct to main.html
}

