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

function tempArrayMaker() {
    let user = firebase.auth().currentUser;
    if (user) {
        db.collection("users").doc(user.uid).update({         //write to firestore. We are using the UID for the ID in users collection
            default_monday: ["", "", "COMP1712", "COMP1712", "", "COMP1510 LAB", "COMP1510 LAB", "COMP1510", "", ""],
            default_tuesday: ["COMP1800", "COMP1800", "COMP1712 LAB", "COMP1712 LAB", "", "COMP1113", "COMP1113", "COMM1116", "COMM1116", ""],
            default_wednesday: ["", "", "COMP1100", "COMP1537 LAB", "COMP1537 LAB", "COMP1510", "", "", "", ""],
            default_thursday: ["", "COMP1800 LAB", "COMP1800 LAB", "COMP1510", "", "COMP1537", "COMP1537", "COMP1510 LAB", "COMP1510 TUT", ""],
            default_friday: ["", "", "COMM1116 LAB", "COMM1116 LAB", "", "COMP1113", "COMP1113", "", "", ""],

            active_monday: ["", "", "COMP1712", "COMP1712", "", "COMP1510 LAB", "COMP1510 LAB", "COMP1510", "", ""],
            active_tuesday: ["COMP1800", "COMP1800", "COMP1712 LAB", "COMP1712 LAB", "", "COMP1113", "COMP1113", "COMM1116", "COMM1116", ""],
            active_wednesday: ["", "", "COMP1100", "COMP1537 LAB", "COMP1537 LAB", "COMP1510", "", "", "", ""],
            active_thursday: ["", "COMP1800 LAB", "COMP1800 LAB", "COMP1510", "", "COMP1537", "COMP1537", "COMP1510 LAB", "COMP1510 TUT", ""],
            active_friday: ["", "", "COMM1116 LAB", "COMM1116 LAB", "", "COMP1113", "COMP1113", "", "", ""]
        })
    }
}

const scheduleRef = firebase.firestore().collection("schedules");






