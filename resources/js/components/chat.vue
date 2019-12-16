<template>
  <div>
    <section id="talks" v-for="(talk,i) in talks" :key="i">
      <div class="item-message">
        <nl2br tag="div" :text="talk"/>
      </div>
    </section>
    <form action="" @submit.prevent="doSend" class="form">
      <textarea v-model="input" 
                @keydown.enter.exact.prevent="doSend"></textarea>
      <button type="submit" class="send-button">送信</button>
    </form>    
  </div>
</template>

<script>
import eventHub from '../eventHub.js';
import Nl2br from 'vue-nl2br'

export default{
  components:{
    Nl2br
  },
  data(){
    return{
      talks:[],
      input:'',
    }
  },
  created(){
    eventHub.$on('showtalks',function(talk,key){    
      if(key != 'createdAt')this.talks.push(talk);
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

