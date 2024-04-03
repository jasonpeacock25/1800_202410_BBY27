function sayHello() {

}
//sayHello();
//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout(cb) {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
        if (cb) cb();
    }).catch((error) => {
        // An error happened.
    });
}
