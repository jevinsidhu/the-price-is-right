var firebase = require("firebase");
const config = {
    apiKey: "AIzaSyDgDxI4QJjf4Mb-XJZqTjA7CqvLTbfoJbM",
    authDomain: "thepriceisright-e07b1.firebaseapp.com",
    databaseURL: "https://thepriceisright-e07b1.firebaseio.com",
    projectId: "thepriceisright-e07b1",
    storageBucket: "thepriceisright-e07b1.appspot.com",
    messagingSenderId: "133664492594"
  };

  firebase.initializeApp(config);
export default firebase;