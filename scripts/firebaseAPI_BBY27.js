//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyCX4wFwGsF-R5ZxNVg7fysU-XTyUmTGlfw",
    authDomain: "comp1800-202410-bby27.firebaseapp.com",
    projectId: "comp1800-202410-bby27",
    storageBucket: "comp1800-202410-bby27.appspot.com",
    messagingSenderId: "590374870861",
    appId: "1:590374870861:web:0a0b524c7dfb80c6826104"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
