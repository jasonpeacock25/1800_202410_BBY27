// Get user name and show in main page after log in.
function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                let userSet = userDoc.data().set;
                // console.log(userSet);
                // console.log(userName);

                const span = document.createElement('span')
                span.setAttribute('id', 'set')
                let textNode = document.createTextNode(` set ${userSet}`)
                span.appendChild(textNode)
                // console.log(span); // <span id="set"> set D</span>

                document.getElementById("name-goes-here").innerHTML = userName
                document.getElementById("set").innerHTML = `Set ${userSet}`
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();


const scheduleRef = firebase.firestore().collection("schedules");

// Define the array of schedule data
const schedules = [
    {
        "830" : null,
        "930" : null,
        "1030" : "COMP 1712 Lecture",
        "1130" : "COMP 1712 Lecture",
        "1230" : null,
        "1330" : "COMP 1510 Lab",
        "1430" : "COMP 1510 Lab",
        "1530" : "COMP 1510 Lecture",
        "1630" : null,
        "night" : null
    },
    {
        "830" : "COMP 1800 Lecture",
        "930" : "COMP 1800 Lecture",
        "1030" : "COMP 1712 Lab",
        "1130" : "COMP 1712 Lab",
        "1230" : null,
        "1330" : "COMP 1113 Lab",
        "1430" : "COMP 1113 Lab",
        "1530" : "COMP 1116 Lecture",
        "1630" : "COMP 1116 Lecture",
        "night" : null
    },
    {
        "830" : null,
        "930" : null,
        "1030" : "COMP 1110 Lecture",
        "1130" : "COMP 1537 Lab",
        "1230" : "COMP 1510 Lecture",
        "1330" : null,
        "1430" : null,
        "1530" : null,
        "1630" : null,
        "night" : null
    },
    {
        "830" : null,
        "930" : "COMP 1800 Lab",
        "1030" : "COMP 1800 Lab",
        "1130" : "COMP 1510 Lecture",
        "1230" : null,
        "1330" : "COMP 1537 Lecture",
        "1430" : "COMP 1537 Lecture",
        "1530" : "COMP 1510 Lab",
        "1630" : "COMP 1510 Tutorial",
        "night" : null
    },
    {
        "830" : null,
        "930" : null,
        "1030" : "COMP 1116 Lab",
        "1130" : "COMP 1116 Lab",
        "1230" : null,
        "1330" : "COMP 1113 Lecture",
        "1430" : "COMP 1113 Lecture",
        "1530" : null,
        "1630" : null,
        "night" : null
    }
];

// Iterate through the array of schedules and add each schedule data to Firestore
schedules.forEach((schedule, index) => {
    // Specify the document ID as the day of the week (e.g., "Monday", "Tuesday", etc.)
    const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][index];

    // Add the schedule data to Firestore with the document ID as the day of the week
    scheduleRef.doc(dayOfWeek).set(schedule)
        .then(() => {
            // console.log(`Schedule data added successfully for ${dayOfWeek}.`);
        })
        .catch(error => {
            // console.error(`Error adding schedule data for ${dayOfWeek}: `, error);
        });
});






