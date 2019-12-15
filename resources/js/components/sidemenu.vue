<template>
  <div id="sidemenu-wrapper" @mousedown="ChangePaletteState">
    <div v-for="mode in modes" :key="mode.name">
      <div :id="mode.id" 
           :title="mode.name" 
           @click="ModeSelect(mode) "
           :class='{active:mode.active}'> 
        <img v-if="mode.active" :src="mode.activesrc">
        <img v-else :src="mode.noactivesrc" alt="">
        <div id="pickcolor" v-if="mode.id == 'drawbutton'" :style="pickcolor"></div>  
      </div>
    </div> 
  </div>
</template>

<script>
import Vue from 'vue';
import eventHub from '../eventHub.js';
import store from '../store.js';

export default{
  data(){
    return {
      pickcolor:{
        background:'black',
        width:'10px',
        height:'10px',
        borderRadius:'50%',
        position:'relative',
        // right:'10px',
        // top:'205px',
      },
      modes:[
        {id:'undobutton',
         name:'取り消す',
         activesrc:require('../../img/undoWH.png'),
         noactivesrc:require('../../img/undo.png'),
         active:false,
         },
        //  {id:'redobutton',
        //  name:'やり直す',
        //  activesrc:require('../../img/redoWH.png'),
        //  noactivesrc:require('../../img/redo.png'),
        //  active:false,
        //  },
         {id:'pointerbutton',
         name:'選択',
         activesrc:require('../../img/handcursorWH.png'),
         noactivesrc:require('../../img/handcursor.png'),
         active:true,         
         },
         {id:'drawbutton',
         name:'ペン',
         activesrc:require('../../img/pencilWH.png'),
         noactivesrc:require('../../img/pencil.png'),
         active:false,         
         },
         {id:'eraserbutton',
         name:'消去',
         activesrc:require('../../img/EraserWH.png'),
         noactivesrc:require('../../img/Eraser.png'),
         active:false,         
         },
         {id:'stickybutton',
         name:'付箋',
         activesrc:require('../../img/stickyWH.png'),
         noactivesrc:require('../../img/sticky.png'),
         active:false,         
         },
         {id:'imagebutton',
         name:'画像挿入',
         activesrc:require('../../img/imageWH.png'),
         noactivesrc:require('../../img/image.png'),
         active:false,         
         },
      ]
    }
  },
  created(){
    eventHub.$on('drawbutton',function (brush) {
      if (brush){
        this.pickcolor.background = store.__getcolor();     
        this.modes[3].activesrc = brush.activesrc;
        this.modes[3].noactivesrc = brush.noactivesrc; 
      }
    }.bind(this))
    //emit from CanvasComponent
    eventHub.$on('pointerbutton',function () {
      this.$el.childNodes[1].firstChild.click();      
    }.bind(this))    
  },
  methods: {
    ModeSelect: function(mode){
      if (mode.id != 'undobutton' && mode.id != 'redobutton'){
        for(let ii in this.modes){
          this.modes[ii].active = false;
        }
        mode.active  = true;
      }
      eventHub.$emit(mode.id);
    },
    ChangePaletteState:function(){
        if(this.$parent.$children[1]._data.activepalette){
          this.$parent.$children[1]._data.activepalette = false;
          this.$parent.$children[1]._data.availablepalette = false;
        }else{
          this.$parent.$children[1]._data.availablepalette = true;
        }
    }
  },
  computed: {
    
  },

}
</script>

<style scoped>
  #sidemenu-wrapper{
    width:60px;
    background: #f8f8f8;
    position: absolute;
    left: 20px;
    top:300px;
    z-index: 1;
    border-radius: 20px;
    border: solid 1px rgba(143, 143, 143, 0.5);
  } img{
      width: 2.5rem;
      margin-left: 3px; 
    }

  #sidemenu-wrapper > div{
    margin: 12px auto;
    width: 80%;
  }

  #sidemenu-wrapper > div:hover{
    cursor: pointer;
  }

  .active{
    border-radius: 5%;
    background: #bbbbbb;
  }
</style>
