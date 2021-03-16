import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD6jpE_N0k4Nsmlng47JvIoCBm8YguCk7Y",
    authDomain: "todowebapp-a54ed.firebaseapp.com",
    projectId: "todowebapp-a54ed",
    storageBucket: "todowebapp-a54ed.appspot.com",
    messagingSenderId: "731519216405",
    appId: "1:731519216405:web:b71fb76638f49c8500571c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots:true})

  export default firebase;
