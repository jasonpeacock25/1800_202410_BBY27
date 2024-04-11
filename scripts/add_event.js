
/* When the user clicks on the button, 
     toggle between hiding and showing the dropdown content */
function myFunction(x) {
    document.getElementById("myDropdown" + x).classList.toggle("show");
}

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

function saveNewEvent() {
    const promises = [];
    let startIndex;
    let duration;
    let schedule = [];
    let tempSchedule = [];
    console.log("inside saveNewEvent");
    let eventTitle = document.getElementById("titleInput1").value;
    let eventDay = document.getElementById("dropbtn1").innerHTML;
    let eventStart = document.getElementById("dropbtn2").innerHTML;
    let eventDuration = document.getElementById("dropbtn3").innerHTML;

    //GET START INDEX OF DAY
    switch (eventStart) {
        case "8:30":
            startIndex = 0;
            console.log("8:30");
            break;
        case "9:30":
            startIndex = 1;
            console.log("9:30");
            break;
        case "10:30":
            startIndex = 2;
            console.log("10:30");
            break;
        case "11:30":
            startIndex = 3;
            console.log("11:30");
            break;
        case "12:30":
            startIndex = 4;
            console.log("12:30");
            break;
        case "13:30":
            startIndex = 5;
            console.log("13:30");
            break;
        case "14:30":
            startIndex = 6;
            console.log("14:30");
            break;
        case "15:30":
            startIndex = 7;
            console.log("15:30");
            break;
        case "16:30":
            startIndex = 8;
            console.log("16:30");
            break;
        default:
            startIndex = 0;
            console.log("Default case");
            break;
    }

    //GET DURATION
    switch (eventDuration) {
        case "1 Hour":
            duration = 1;
            console.log("1 Hour");
            break;
        case "2 Hours":
            duration = 2;
            console.log("2 Hours");
            break;
        case "3 Hours":
            duration = 3;
            console.log("3 Hours");
            break;
        case "4 Hours":
            duration = 4;
            console.log("4 Hours");
            break;
        case "5 Hours":
            duration = 5;
            console.log("5 Hours");
            break;
        case "6 Hours":
            duration = 6;
            console.log("6 Hours");
            break;
        default: console.log("Default case");
            break;
    }

    firebase.auth().onAuthStateChanged(user => {
        // Create an array to store promises for each asynchronous get() call
        if (user) {
            //reference to users document in firestore
            const currentUser = db.collection("users").doc(user.uid);
            // Get the schedule data for the current day from Firestore
            const promise = currentUser.get().then(userDoc => {
                if (userDoc.exists) {
                    switch (eventDay) {
                        case "Monday": tempSchedule = userDoc.data().active_monday;
                            break;
                        case "Tuesday": tempSchedule = userDoc.data().active_tuesday;
                            break;
                        case "Wednesday": tempSchedule = userDoc.data().active_wednesday;
                            break;
                        case "Thursday": tempSchedule = userDoc.data().active_thursday;
                            break;
                        case "Friday": tempSchedule = userDoc.data().active_friday;
                            break;
                        default: tempSchedule = ["", "", "", "", "", "", "", "", "", ""];
                            break;
                    }

                    // Iterate over each time slot in the schedule
                    Object.values(tempSchedule).forEach(arrayElement => {
                        // Add the class information to the classes array
                        schedule.push(arrayElement);
                    });
                } else {
                    console.log("No schedule data found.");
                }
            }).catch(error => {
                console.error("Error fetching schedule data:", error);
            });
            promises.push(promise);
        };

        // Use Promise.all() to execute code after all promises are resolved
        Promise.all(promises).then(() => {
            // Code here will be executed after all asynchronous operations are completed
            console.log("Loaded Schedule: " + schedule);

            for (let x = startIndex; (x < schedule.length - 1 && x - startIndex < duration); x++) {
                schedule[x] = eventTitle;
            }

            const currentUser = db.collection("users").doc(user.uid);

            console.log("Modified Schedule: " + schedule);
            switch (eventDay) {
                case "Monday":
                    currentUser.update({ active_monday: schedule }).then(() => { console.log("Document successfully updated!"); })
                    break;
                case "Tuesday":
                    currentUser.update({ active_tuesday: schedule }).then(() => { console.log("Document successfully updated!"); })
                    break;
                case "Wednesday":
                    currentUser.update({ active_wednesday: schedule }).then(() => { console.log("Document successfully updated!"); })
                    break;
                case "Thursday":
                    currentUser.update({ active_thursday: schedule }).then(() => { console.log("Document successfully updated!"); })
                    break;
                case "Friday":
                    currentUser.update({ active_friday: schedule }).then(() => { console.log("Document successfully updated!"); })
                    break;
                default: console.log("Default case");
                    break;
            }

            console.log("Uploaded");
        });
    })
}





















// If user cancel to add new event, return to last page.
function handleCancel() {
    history.back();
    console.log("Cancel Clicked");

    // window.location.assign("main.html");       //re-direct to main.html
}

