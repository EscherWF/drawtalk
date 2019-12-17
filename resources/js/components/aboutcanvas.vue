<template>
<div id="aboutcanvas-wrapper" v-show="aboutcanvasactive">
  <div class="eachitem" v-for="(item,i) in aboutcanvas" :key="i" >
    <div :id="item.id"
         :title="item.name"
         @click="eachaction(item.id)">
      <img :src="item.src">
    </div>
    <!-- <div></div> -->
  </div>
</div>
</template>

<script>
import eventHub from '../eventHub.js';

export default{
  data(){
    return {
      aboutcanvasactive:false,
      aboutcanvas:[
        {id:'backgroundcolor',
         name:'背景色切り替え',
         src:require('../../img/bgcolor.png'),
         }, 
        {id:'deleteall',
         name:'すべて消去',
         src:require('../../img/deleteall.png'),
         }, 
        {id:'newcanvas',
         name:'キャンバス作成',
         src:require('../../img/newcanvas.png'),
         }, 
        {id:'sharecanvas',
         name:'キャンバス共有',
         src:require('../../img/share.png'),
         }, 
        // {id:'savetoimage',
        //  name:'画像保存',
        //  src:require('../../img/pngimage.png'),
        //  },                                     
      ]
    }
  },
  created(){  
    eventHub.$on("aboutcanvas",function(){
      if(!this.aboutcanvasactive)
      this.aboutcanvasactive = true;
    }.bind(this))
  },
  methods: {
    eachaction:function(id){
      switch(id) { 
        case 'backgroundcolor':
          eventHub.$emit("changeBGcolor");
          break; 
        case 'deleteall':
          if(window.confirm('すべてのオブジェクトを消去します？よろしいですか？'))
          eventHub.$emit('deleteall');
          break;

        case 'newcanvas':          
          window.open(location.origin);
          break;

        case 'sharecanvas':break;        
      }
      this.aboutcanvasactive = false;
      eventHub.$emit('pointerbutton');
    }
  },
}
</script>

<style scoped>
  #aboutcanvas-wrapper{
    user-select: none;
    width:250px;
    background: #f8f8f8;
    position: absolute;
    left: 90px;
    top: 450px;
    z-index: 1;   
    height: 55px; 
    border-radius: 10px;
    border: solid 1px rgb(80, 210, 210);
  } img{
      width: 2.5rem;
      margin-left: 3px; 
    }

  #aboutcanvas-wrapper > div:hover{
    cursor: pointer;
  }

  .eachitem{
    display: inline-block;
    width: 50px;
    margin: 5.5px;
  }
</style>
