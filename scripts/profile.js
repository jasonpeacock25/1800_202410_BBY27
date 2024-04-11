var userName;
var userSchool;
var userMajor;
var existingSet;
var userStudyHour;
var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    userName = userDoc.data().name;
                    userSchool = userDoc.data().school;
                    userMajor = userDoc.data().major;
                    userSet = userDoc.data().set;
                    userStudyHour = userDoc.data().studyHour;
                    existingSet = userSet;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userMajor != null) {
                        document.getElementById("majorInput").value = userMajor;
                    }
                    if (userSet != null) {
                        document.getElementById("setInput").value = userSet;
                    }
                    if (userStudyHour != null) {
                        document.getElementById("studyHourInput").value = userStudyHour;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
    userMajor = document.getElementById('majorInput').value;       //get the value of the field with id="cityInput"
    userSet = document.getElementById('setInput').value;
    userStudyHour = document.getElementById('studyHourInput').value;




    //b) update user's default schedule in Firestore if set was changed

    setCollection = db.collection("sets").doc(userSet);

    setCollection.get().then(setDoc => {
        if (userSet != existingSet && (userSet == "A" || userSet == "B" || userSet =="C" || userSet == "D")) {
            console.log(existingSet);
            currentUser.update({
                active_monday: setDoc.data().default_monday,
                active_tuesday: setDoc.data().default_tuesday,
                active_wednesday: setDoc.data().default_wednesday,
                active_thursday: setDoc.data().default_thursday,
                active_friday: setDoc.data().default_friday,
                set: userSet
            })
        } else {
            console.log("New set is either the same as existing set or invalid.");
        }
    })

    //c) update user's document in Firestore
    currentUser.update({
        name: userName,
        school: userSchool,
        major: userMajor,
        studyHour: userStudyHour
    }).then(() => {
        console.log("Document successfully updated!");
    })

    //d) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}



// Function to save study goal input to Firestore
function saveStudyGoal() {
    const uid = firebase.auth().currentUser.uid;
    console.log("uid is" + uid);
    const studyHourInput = document.getElementById("studyHourInput").value;

    // Save input value to Firestore
    firebase.firestore().collection("users").doc(uid).update({
        studyHour: studyHourInput
    })
        .then(() => {
            console.log("Study goal input saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving study goal input: ", error);
        });
}

document.querySelector('.btn-steel-blue').addEventListener('click', () => {
    saveStudyGoal()
})

// function setPlaceholderFromFirestore() {
//     const uid = firebase.auth().currentUser.uid;
//     // console.log(uid);
//     // Retrieve study goal value from Firestore
//     firebase.firestore().collection("users").doc(uid).get()
//     .then((doc) => {
//         if (doc.exists) {
//             const studygoal = doc.data().studygoal;
//             // Set study goal value as placeholder
//             document.getElementById("studyHourInput").placeholder = studygoal;
//         } else {
//             console.log("No study goal found for the user.");
//         }
//     })
//     .catch((error) => {
//         console.error("Error getting study goal from Firestore: ", error);
//     });
// }
// setPlaceholderFromFirestore()
