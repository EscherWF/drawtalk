require('./bootstrap');

import Vue from 'vue';
import App from './components/App.vue';
import firebase from 'firebase';
import eventHub from './eventHub.js'

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

//Storage path
const STORAGEpath   = firebase.storage().ref(); 
//check a user info
const DBpath        = firebase.database();
const requesteduser = location.pathname.replace('/','')?
                      location.pathname.replace('/',''): "no";
const userpath      = DBpath.ref(`users/${requesteduser}/createdAt`);
const messagespath  = DBpath.ref(`users/${requesteduser}/messages`);
const objctspath    = DBpath.ref(`users/${requesteduser}/objects`);


window.Vue = Vue;
new Vue({
  el:'#app',
  components:{App},
  template:'<app />',
  mounted:function(){

    userpath.once("value",function(snapshot){      
      if(!snapshot.exists()){
        let key = DBpath.ref('users').push({
        createdAt:"20191215",
        objects :{createdAt:'20191215'},
        messages:{createdAt:'20191215'}}).key;
        //redirecting page
        location.pathname = `/${key}`;
      }; 
    });

    //watch firebase objects Data 
    objctspath.on("child_changed",function(snapshot){      
      eventHub.$emit('objchanged',snapshot.val(),snapshot.key);
    });
    objctspath.on("child_added",function(snapshot){
      eventHub.$emit('objchanged',snapshot.val(),snapshot.key);
    });
    objctspath.on("child_removed",function(snapshot){
      eventHub.$emit('objremoved',snapshot.key);
    });    

    //watch firebase messages Data
    messagespath.on("child_added",function(snapshot){
        eventHub.$emit('showtalks',snapshot.val(),snapshot.key);
    })
    //send message to DB
    eventHub.$on("sendtalk",function(talkbody){
      messagespath.push(talkbody);
    })

    //change or delete
    eventHub.$on("post",function(value,key){
      objctspath.child(key).set(JSON.stringify(value));
    });
    eventHub.$on("delete",function(key){
      objctspath.child(key).remove();
    });    

    //upload images
    eventHub.$on("imgupload",function(imgdata,filename){
      let targetpath  = STORAGEpath.child(filename);
      let uploadtask = targetpath.putString(imgdata,'data_url');
      uploadtask.on('state_changed',function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if(progress == 0){
            //spiner
          }else if(progress == 100){
            targetpath.getDownloadURL().then(function(path){
              eventHub.$emit("sendedimg",path);
            });
          }
      })
    })
  }
})


