import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import Vue from 'vue';
import VModal from 'vue-js-modal';
import QrcodeVue from 'qrcode.vue'
import VueClipboard from 'vue-clipboard2';

import App from './components/app.vue';
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
const requesteduser = location.pathname.replace('/','') ?
                      location.pathname.replace('/','') : "no";

const userpath      = DBpath.ref(`users/${requesteduser}/createdAt`);
const messagespath  = DBpath.ref(`users/${requesteduser}/messages`);
const objctspath    = DBpath.ref(`users/${requesteduser}/objects`);


window.Vue = Vue;
Vue.use(VModal);
Vue.use(VueClipboard);

new Vue({
  render: h => h(App),
  components: {
    QrcodeVue
  },
  template:'<div>\
              <app />\
              <modal :click-to-close="false" width="200px" height="200px"\
                      name="uploading"\
                      style="user-select:none;">\
                <p>アップロード処理中...</p>\
                <p>{{progressnum}}% 完了済</p>\
                <div id="rotatelogo"></div>\
              </modal>\
              <modal name="sharecanvas" width="420px" height="350px">\
                <p id="canvassharetitle">キャンバスを共有する</p>\
                <div id="copytoclipboard" @click="saveclipboard">クリップボードへコピー</div>\
                <p id="canvasURL">キャンバスURL</p>\
                <input id="showcanvasURL" readonly="readonly" :value="canvasURL">\
                <p id="canvasURLQR">QRコード</p>\
                <qrcode-vue id="QRcode" size=150 :value="canvasURL" ></qrcode-vue>\
              </modal>\
            </div>',
  data:{
    progressnum:0,
    canvasURL:"",
  },
  methods:{
    saveclipboard:function(){
      this.$copyText(this.canvasURL).then(function(e){
        console.log("copied!");
      })
    }
  },
  mounted:function(){
    userpath.once("value", function (snapshot) {
      if(!snapshot.exists()){
        let key = DBpath.ref('users').push({
        createdAt:"20191215",
        objects :{createdAt:'20191215'},
        messages:{createdAt:'20191215'}}).key;

        //redirecting page
        const origin = location.origin;
        const newId = `${key}`;
        const redirectUrl = `${origin}/${newId}`;
        location.href = redirectUrl;
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

      //uploading indicator(show modal)
      this.$modal.show("uploading");

      uploadtask.on('state_changed',function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progressnum = Math.round(progress);
          if(progress == 100){
            this.$modal.hide('uploading');
            targetpath.getDownloadURL().then(function(path){
              eventHub.$emit("sendedimg",path);
            }.bind(this));
          }
      }.bind(this))
    }.bind(this))

    eventHub.$on("sharecanvas",function(){
      this.canvasURL = location.href;
      this.$modal.show("sharecanvas");
    }.bind(this))
  }
}).$mount('#app')



