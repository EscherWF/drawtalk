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
      <div v-for="(item,i) in aboutcanvas" :key="i" >
        <div :id="item.id"
             :title="item.name"
             @click="aboutcanvas">

        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import eventHub from '../eventHub.js';
import store from '../store.js';

export default{
  data(){
    return {
      pickcolor:{
        background:'black',
        height:'5px',
        position:'relative',
        borderRadius:'0 0 5px 5px'
      },
      modes:[
        {id:'undobutton',
         name:'取り消す',
         activesrc:require('../../img/undoWH.png'),
         noactivesrc:require('../../img/undo.png'),
         active:false,
         },
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
         name:'文字',
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
         {id:'aboutcanvas',
         name:'キャンバス操作',
         activesrc:require('../../img/aboutcanvasWH.png'),
         noactivesrc:require('../../img/aboutcanvas.png'),
         active:false,         
         },
         {id:'chat',
         name:'チャット',
         activesrc:require('../../img/chatWH.png'),
         noactivesrc:require('../../img/chat.png'),
         active:false,         
         },                  
      ],
      aboutcanvas:[
        {id:'backgroundcolor',
         name:'背景色',
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
        {id:'savetoimage',
         name:'画像保存',
         src:require('../../img/pngimage.png'),
         },                                     
      ]
    }
  },
  created(){
    eventHub.$on('drawbutton',function (brush) {
      if (brush){
        this.pickcolor.background = store.__getcolor();     
        this.modes[2].activesrc = brush.activesrc;
        this.modes[2].noactivesrc = brush.noactivesrc; 
      }
    }.bind(this))
    //emit from CanvasComponent
    eventHub.$on('pointerbutton',function () {
      this.$el.childNodes[1].firstChild.click();      
    }.bind(this))    
  },
  methods: {
    ModeSelect: function(mode){
      if (mode.id != 'undobutton'  &&
          mode.id != 'stickybutton'&& 
          mode.id != 'chat'        &&
          mode.id != 'redobutton'){
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
}
</script>

<style scoped>
  #sidemenu-wrapper{
    user-select: none;
    width:60px;
    background: #f8f8f8;
    position: absolute;
    left: 20px;
    top:10px;
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
    border-radius: 5px;
    background: #bbbbbb;
  }
</style>
