<template>
  <div id="chat-wrapper" v-drag 
       v-show="chatactive">
    <div id="chat-border-top">チャット</div>
    <div id="talks-wrapper">
      <div class="talks" v-for="(talk,i) in talks" :key="i">
        <div class="item-message">
          <nl2br tag="div" :text="talk"/>
        </div>
      </div>
    </div>
    <form action="" @submit.prevent="doSend" class="form">
      <textarea class="inputtext" v-model="input" 
                @keydown.enter.exact.prevent="doSend"></textarea>
      <button type="submit" class="send-button">送信</button>
    </form>  
  </div>
</template>

<script>
import eventHub from '../eventHub.js';
import Nl2br from 'vue-nl2br';
import store from '../store.js';
import drag from '@branu-jp/v-drag'


export default{
  components:{
    Nl2br
  },
  directives:{
    drag
  },
  data(){
    return{
      talks:[],
      input:'',
      chatactive:false,
    }
  },
  created(){
    eventHub.$on('chat',function(){
      this.chatactive = !this.chatactive;
    }.bind(this))

    eventHub.$on('showtalks',function(talk,key){    
      if(key != 'createdAt'){
        this.talks.push(talk);
      }
    }.bind(this))
  },
  methods:{
    doSend() {
      if (this.input.length) {
        eventHub.$emit("sendtalk",this.input);
        this.input = '';
      }
    }
  } 
}
</script>

<style scoped>
  #chat-wrapper{
    user-select: none;
    z-index: 1;
    width:300px;
    position: absolute; 
    left: 90px;
    top: 510px;   
    border: 1px solid rgb(80, 210, 210);
    cursor: move;
    background: #f8f8f8;
    border-radius: 10px;
  }
  #chat-border-top{
    height: 30px;
    width: 60%;
    line-height: 30px;
    margin: 10px 10px;
    font-size: 1.3rem;  }

  .talks{
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    background: rgba(80, 206, 206, 0.5);
    margin: 2px;
    border-radius: 10px;
  }

  #talks-wrapper{
    overflow: auto;
    height: 200px;
    width: 98%;
    margin: 5px 0;
  }
  .send-button{
    background: rgb(80, 210, 210);
    border: 1px solid black;
    border-radius: 5px;
    width: 20%;
    height: 28px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .inputtext{
    width: 72%;
    height: 24px;
    resize: none;
    margin: 2px;
    font-size: 1.3rem;
  } 
</style>

