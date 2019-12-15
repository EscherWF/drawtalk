export default {
  state: {
      activebrush:{
        strokewidth: 1,
        activecolor:'black',  
      }
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
}
}