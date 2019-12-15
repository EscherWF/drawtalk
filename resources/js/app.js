require('./bootstrap');

import firebase from 'firebase';

// my app's Firebase configuration
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
                      location.pathname.replace('/',''):"not filled parameter";
const userpath      = DBpath.ref(`users/${requesteduser}`);

userpath.once("value",function(snapshot){
  if(snapshot.exists()){
    
  }else{
    let key = DBpath.ref('users').push({createdAt:"20191215"}).key;
    //redirecting page
    location.pathname = `/${key}`;
    
  }; 
});


// const objref    = DBpath.ref('objects/' + uniqueid);
// const messeref  = DBpath.ref('users');
// messeref.child("messages").push({body:"messebody"});

// userref.child(user).set({createdAt:'2019-12-15'});
// objref.child(uniqueid).set({"type":"path","version":"3.5.1","originX":"left","originY":"top","left":96.96,"top":492.17,"width":334.02,"height":223.82,"fill":null,"stroke":"blue","strokeWidth":20,"strokeDashArray":null,"strokeLineCap":"round","strokeDashOffset":0,"strokeLineJoin":"round","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":-15.78,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":null,"fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"path":[["M",258.02,279.98],["Q",258,280,253.5,291],["Q",249,302,247,308],["Q",245,314,243,327.5],["Q",241,341,236,358.5],["Q",231,376,223.5,398],["Q",216,420,212.5,433.5],["Q",209,447,209,459.5],["Q",209,472,210.5,482.5],["Q",212,493,220,498],["Q",228,503,241.5,503.5],["Q",255,504,267,502.5],["Q",279,501,293.5,493],["Q",308,485,322,476],["Q",336,467,346,457],["Q",356,447,360.5,434],["Q",365,421,367,404.5],["Q",369,388,366,365],["Q",363,342,359.5,337.5],["Q",356,333,349.5,332],["Q",343,331,335.5,331],["Q",328,331,319.5,331],["Q",311,331,301,331],["Q",291,331,278,335],["Q",265,339,253.5,346],["Q",242,353,232.5,365],["Q",223,377,217.5,390],["Q",212,403,212,413.5],["Q",212,424,216,429.5],["Q",220,435,237.5,439],["Q",255,443,269,443],["Q",283,443,302,443],["Q",321,443,344,443],["Q",367,443,393,438.5],["Q",419,434,447,427.5],["Q",475,421,494.5,416],["Q",514,411,524.5,408.5],["Q",535,406,538,406],["Q",541,406,542,406],["L",543.02,406]]});
// messeref.child(uniqueid).set({body:messebody});

// const CreateUniaueID= function(){
//   let strong = 100;
//   return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)      
// }



// accessPath.on('value', function(snapshot){
//   console.log(snapshot);
  
// })
