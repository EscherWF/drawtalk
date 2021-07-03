export default {
  state: {
      activebrush:{
        strokewidth: 1,
        activecolor:'black',  
      },
      activeBGindex:0,
      BGcolor:[
        "white","lightgray","black"
      ]
  },
  __setcolor(color){
    this.state.activebrush.activecolor = color;    
  },
  __getcolor(){
    return this.state.activebrush.activecolor;
  },
__setbrush(strokewidth){
  this.state.activebrush.strokewidth = strokewidth;
},
__getbrush(){
  return this.state.activebrush.strokewidth;
},
__getBGcolor(){
  if(this.state.activeBGindex++ == 2)
  this.state.activeBGindex = 0;
  return this.state.BGcolor[this.state.activeBGindex];
}
}