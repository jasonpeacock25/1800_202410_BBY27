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






