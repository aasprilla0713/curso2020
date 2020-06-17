import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBbbqRlLKh58Gboy-73McYBqlQREL84xqU",
  authDomain: "brokerhood-fe2a6.firebaseapp.com",
  databaseURL: "https://brokerhood-fe2a6.firebaseio.com",
  projectId: "brokerhood-fe2a6",
  storageBucket: "brokerhood-fe2a6.appspot.com",
  messagingSenderId: "686257723652",
  appId: "1:686257723652:web:4a01e166a75dc34ea2d851",
  measurementId: "G-MKGFTFL9CJ"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBbbqRlLKh58Gboy-73McYBqlQREL84xqU",
    authDomain: "brokerhood-fe2a6.firebaseapp.com",
    databaseURL: "https://brokerhood-fe2a6.firebaseio.com",
    projectId: "brokerhood-fe2a6",
    storageBucket: "brokerhood-fe2a6.appspot.com",
    messagingSenderId: "686257723652",
    appId: "1:686257723652:web:4a01e166a75dc34ea2d851",
    measurementId: "G-MKGFTFL9CJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>*/
