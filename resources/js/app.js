require('./bootstrap');

import Vue from 'vue';
import App from './components/App.vue';
import firebase from 'firebase';

// my app's Firebase configuration
//heroku内の環境変数を設定し取得（今はリテラルで）
var firebaseConfig = {
  apiKey: "AIzaSyAwxa81wGhmDu_1KmoVUi48jIcxaNW5yHU",
  authDomain: "draw-talk.firebaseapp.com",
  databaseURL: "https://draw-talk.firebaseio.com",
  projectId: "draw-talk",
  storageBucket: "draw-talk.appspot.com",
  messagingSenderId: "920241367747",
  appId: "1:920241367747:web:45f7324d9619bfa92d5076",
  measurementId: "G-3TEQSWT2FD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//check a user info
const DBpath        = firebase.database();
const requesteduser = location.pathname.replace('/','')?
                      location.pathname.replace('/','')
                      : "not filled parameter";
const userpath      = DBpath.ref(`users/${requesteduser}`);

userpath.once("value",function(snapshot){
  if(snapshot.exists()){
    
  }else{
    let key = DBpath.ref('users').push({createdAt:"20191215"}).key;
    //redirecting page
    location.pathname = `/${key}`;
    
  }; 
});

window.Vue = Vue;
new Vue({
  el:'#app',
  components:{App},
  template:'<app />'
})
