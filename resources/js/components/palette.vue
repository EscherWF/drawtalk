<template>
  <div id="palette-wrapper" v-show="activepalette">
    <div class="brushs" v-for="(brush) in brushs" :key="brush.name">
      <div :id="brush.id"
          :title="brush.name"
          @click="selectbrush(brush)"
          :class='{active:brush.active}'>
          <img v-if="brush.active" :src="brush.activesrc" alt="">
          <img v-else :src="brush.noactivesrc" alt="">
      </div>
    </div>
    <div class="color" v-for="(color, i) in colors" :key="i">
      <div :style="{background:color.color}"
          :class='{activecolor:color.activecolor}'
          @click="setcolor(color)"></div>
    </div>
  </div>
</template>

<script>
import eventHub from '../eventHub.js';
import store from '../store.js'

export default {
  data(){
    return{
      activepalette:false,
      availablepalette:true,
      brushs:[
        {id:'pencil',
         name:'鉛筆',
         activesrc:require('../../img/pencilWH.png'),
         noactivesrc:require('../../img/pencil.png'),
         active:true,
         strokewidth:1,},
        {id:'pen',
         name:'ペン',
         activesrc:require('../../img/penWH.png'),
         noactivesrc:require('../../img/pen.png'),
         active:false,
         strokewidth:5,},
        {id:'maker',
         name:'マーカー',
         activesrc:require('../../img/markerWH.png'),
         noactivesrc:require('../../img/marker.png'),
         active:false,
         strokewidth:10,},
        {id:'brush',
         name:'ブラシ',
         activesrc:require('../../img/brushWH.png'),
         noactivesrc:require('../../img/brush.png'),
         active:false,
         strokewidth:20,}
      ],
      colors:[{color: 'black', 
               activecolor:true},
              {color: 'dimgray',
               activecolor:false},              
              {color: 'gray',
               activecolor:false},              
              {color: 'darkgray',
               activecolor:false},              
              {color: 'white',
               activecolor:false},              
              {color: 'bisque',
               activecolor:false},              
              {color: 'gold',
               activecolor:false},              
              {color: 'orange',
               activecolor:false},              
              {color: 'chocolate',
               activecolor:false},              
              {color: 'maroon',
               activecolor:false},              
              {color: 'mediumvioletred',
               activecolor:false},              
              {color: 'red',
               activecolor:false},              
              {color: 'tomato',
               activecolor:false},              
              {color: 'hotpink',
               activecolor:false},              
              {color: 'pink',
               activecolor:false},              
              {color: 'violet',
               activecolor:false},              
              {color: 'mediumorchid',  
               activecolor:false},              
              {color: 'darkviolet',
               activecolor:false},              
              {color: 'purple',
               activecolor:false},              
              {color: 'indigo',
               activecolor:false},              
              {color: 'navy',
               activecolor:false},              
              {color: 'mediumblue',
               activecolor:false},              
              {color: 'blue',
               activecolor:false},              
              {color: 'dodgerblue',
               activecolor:false},              
              {color: 'royalblue',
               activecolor:false},              
              {color: 'deepskyblue',
               activecolor:false},              
              {color: 'cyan',
               activecolor:false},              
              {color: 'powderblue',
               activecolor:false},              
              {color: 'palegreen',
               activecolor:false},              
              {color: 'greenyellow',
               activecolor:false},              
              {color: 'lime',
               activecolor:false},              
              {color: 'limegreen',
               activecolor:false},              
              {color: 'seagreen',
               activecolor:false},              
              {color: 'darkslategray',    
               activecolor:false},              
              {color: 'olive',
               activecolor:false},              
              {color: 'peru',
               activecolor:false},              
              {color: 'goldenrod',
               activecolor:false},              
              {color: 'khaki',
               activecolor:false},              
              {color: 'yellow',
               activecolor:false},              
              {color: 'lemonchiffon',        
               activecolor:false},                                                                   
      ],
    }
  },
  created(){
    eventHub.$on('drawbutton',function (brush) {
      this.activepalette = this.availablepalette;
      let currentcolor = store.__getcolor()
      for(let ii in this.colors){
        this.colors[ii].activecolor = false;
        if(this.colors[ii].color == currentcolor){
          this.colors[ii].activecolor = true;
        }
      }
    }.bind(this))
  },
  methods: {
    selectbrush: function(brush){
      if(brush.active){
        return
      }
      store.__setbrush(brush.strokewidth);
      for(let ii in this.brushs){
        this.brushs[ii].active = false;
      }
      brush.active  = true;
      eventHub.$emit('drawbutton',brush);
      
    },
    setcolor:function(color){
      if(color.activecolor){
        return
      }
      store.__setcolor(color.color);
      for(let ii in this.colors){
        this.colors[ii].activecolor = false;
      }
      color.activecolor = true;
      for(let ii in this.brushs){
        if(this.brushs[ii].active){
          eventHub.$emit('drawbutton',this.brushs[ii]);
          
        }
      }      
    },
  },
}
</script>

<style scoped>
  #palette-wrapper{
    user-select: none;
    background: #f8f8f8;
    width:250px;
    position: absolute;
    z-index: 1;    
    left: 90px;
    top:80px;        
    border-radius: 10px;
    border: solid 1px rgba(80,210,210);    
    height: 220px;
  }img{
    width:2.5rem;
    margin-left: 4px;
  }

   .brushs{
    display: inline-block;
    width: 50px;
    margin: 5.5px;
  }

   #palette-wrapper > div:hover{
    cursor: pointer;
  }

  .active{
    border-radius: 5%;
    background: #bbbbbb;
  }

  .color{
    display: inline-block;
    height: 20px;
    width: 20px;
    margin-left: 10px;
    margin-top: 2px;
  }

  .color > div{
    height: 20px;
    width: 20px;
    border-radius: 15%;
  }

  .activecolor{
    border-radius: 50% !important;
    transition: 500ms;
  }

</style>