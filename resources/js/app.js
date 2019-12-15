require('./bootstrap');

import Vue from 'vue';
import App from './components/App.vue';
import firebase from 'firebase';

// my app's Firebase configuration
var firebaseConfig = {
  apikey:process.env.MIX_FIREBASE_API_KEY,
  authDomain: process.env.MIX_FIREBASE_AUTH_DOMAIN,
  databaseURL:process.env.MIX_FIREBASE_DATABASE_URL,
  projectId:process.env.MIX_FIREBASE_PROJECT_ID,
  storageBucket:process.env.MIX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.MIX_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.MIX_FIREBASE_APP_ID,
  measurementId:process.env.MIX_FIREBASE_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//check a user info
const DBpath        = firebase.database();
const requesteduser = location.pathname.replace('/','')?
                      location.pathname.replace('/',''): "no";
const userpath      = DBpath.ref(`users/${requesteduser}`);
const objctspath    = DBpath.ref(`users/${requesteduser}/objects`);
const messagespath  = DBpath.ref(`users/${requesteduser}/messages`);

userpath.once("value",function(snapshot){
  if(snapshot.exists()){
    
  }else{
    let key = DBpath.ref('users').push({
      objects :{createdAt:"20191215"},
      messages:{cretedAt:"20191215"}}).key;
    //redirecting page
    location.pathname = `/${key}`;
  }; 
});

//watch firebase objects Data
objctspath.on("child_changed",function(snapshot){
  console.log(snapshot.val());
})
objctspath.on("child_added",function(snapshot){
  console.log(snapshot.val());
})

//watch firebase messages Data
messagespath.on("child_changed",function(snapshot){
  console.log(snapshot.val());
})
messagespath.on("child_added",function(snapshot){
  console.log(snapshot.val());
})


window.Vue = Vue;
new Vue({
  el:'#app',
  components:{App},
  template:'<app />'
})


