<template>
  <div @mousedown="ClosePalette">
    <input type="file" style="display:none"
           accept="image/png, image/jpeg" >
    <canvas id="canvas" >
    </canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric';
import eventHub from '../eventHub';
import store from '../store';

let canvas;
let canvashistory = [];
let currentindex  = 0;

export default{
  data(){
    return {
      isEraserMode:false
    }
  },
  created(){
    eventHub.$on('undobutton',function(){      
        this.UndoCanvas();
    }.bind(this))    

    eventHub.$on('stickybutton', function(){
      canvas.isDrawingMode = false;
      this.isEraserMode = false;
      let sticky = new fabric.Text('テキストエリア',{
        left:100,
        top:100,
        fontSize:30,
        textAlign:'center',
      })
      //set id property created uniqueID
      sticky.set('id',this.CreateUniaueID());
      canvas.add(sticky);
      this.SaveCanvasHistory(sticky,'ADD',true);
      this.ArrangeDataForDB(sticky,'post');
    }.bind(this)),

    eventHub.$on('drawbutton',function (brush) {
      canvas.isDrawingMode = true;
      this.isEraserMode = false;
      canvas.freeDrawingBrush.width = store.__getbrush();
      canvas.freeDrawingBrush.color = store.__getcolor();
    }.bind(this))

    eventHub.$on('eraserbutton',function () {
      canvas.isDrawingMode = false;
      this.isEraserMode = true;
      
    }.bind(this))

    eventHub.$on('pointerbutton',function () {
      canvas.isDrawingMode = false;
      this.isEraserMode = false;
    }.bind(this))

    eventHub.$on('imagebutton',function () {
      canvas.isDrawingMode = false;
      this.isEraserMode = false;

      this.$el.firstChild.value = '';
      //open filespicker 
      this.$el.firstChild.click(); 

      this.$el.firstChild.onchange = function(e){
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function(){
          let scaleX = 1;
          let scaleY = 1;
          let widthscale,heightscale;
          const Regulationwidth  = 300;
          const Regulationheight = 300;

          new fabric.Image.fromURL(reader.result,function(img){
            if(img.getOriginalSize().width > Regulationwidth 
              && img.getOriginalSize().height > Regulationheight){
                //into appropriately sized objects
                widthscale = Regulationwidth / img.getOriginalSize().width;
                heightscale = Regulationheight / img.getOriginalSize().height;
                scaleX = widthscale < heightscale ? widthscale : heightscale;
                scaleY = widthscale < heightscale ? widthscale : heightscale;
              }
          
            img.set({
              left:200,
              top:200,
              scaleX:scaleX,
              scaleY:scaleY,
              //set id property created uniqueID
              id:this.CreateUniaueID()
            })                           
            canvas.add(img);
            this.SaveCanvasHistory(img,'ADD',true);
            this.ArrangeDataForDB(img,'post');            
          }.bind(this));   
          // 'pointerbutton' returns state active
          eventHub.$emit('pointerbutton');              
        }.bind(this)
      }.bind(this)
    }.bind(this))     
  },
  mounted(){ 

    canvas = new fabric.Canvas('canvas',{
      width: 1500,
      height: 1500,
      backgroundColor: 'rgb(255,255,255)',
      rotationCursor:'grab',
    }) 

    fabric.Object.prototype
      .set({
        cornerStyle:'rect',
        transparentCorners:false,
        lockScalingFlip:true,
        lockUniScaling:true,
        borderColor: 'rgb(0,0,0,0.5)',
        borderOpacityWhenMoving: 0,
        cornerSize:10,
        cornerColor:'rgba(0,0,0,0.5)',
        hasRotatingPoint:false
      })   
      
    canvas.on('mouse:down',function(options){
      if(this.isEraserMode && options.target){
        
        const createclone = function(objs){
          let clonearray = [];
          if(objs._objects){
            objs._objects.forEach(function(obj){
              obj.clone(function(clone){
                clone.set({id:obj.id});
                clonearray.push(clone);
              })
            })
          }else{
            objs.clone(function(clone){
              clone.set({id:objs.id});
              clonearray.push(clone);
            })
          }
          return clonearray;
        }

        let removeObj = canvas.getActiveObject();       
        if (removeObj.type == 'activeSelection') {
            //multiple selected
            removeObj.forEachObject(function(obj) {
                canvas.fxRemove(obj);
            });            
        } else {
            //single selected
            canvas.fxRemove(removeObj);
        }
        canvas.discardActiveObject(); 
        this.SaveCanvasHistory(createclone(removeObj),'REMOVE',true);
        this.ArrangeDataForDB(removeObj,'delete');      
      }          
    }.bind(this))

    canvas.on('mouse:up',function(events){
      if(canvas.isDrawingMode){
        let drawingobj = canvas._objects[canvas._objects.length-1];
        //set id property created uniqueID
        drawingobj.set({
          id:this.CreateUniaueID()
        });
        this.SaveCanvasHistory(drawingobj,'ADD',true);
        this.ArrangeDataForDB(drawingobj,'post');       
      }
    }.bind(this))

    canvas.on('object:modified',function(event){      
        this.SaveCanvasHistory(event.target,'MODIFY',true);    
        this.ArrangeDataForDB(event.target,'post');        
    }.bind(this))
    canvas.on({
          'selection:created': function(e){ 
            this.SaveCanvasHistory(e.target,'SELECTED',e.e);
            }.bind(this),
          'selection:updated': function(e){
            this.SaveCanvasHistory(e.target,'SELECTED',e.e)}.bind(this)});    
  },
  methods: {
    ClosePalette:function(){
      if(this.$parent.$children[1]._data.activepalette){
        this.$parent.$children[1]._data.activepalette = false;
      }
    },
    ArrangeDataForDB:function(targets,ope){
      //
      canvas.discardActiveObject();   
      let objects = [];
      console.log(objects);
      

      if(targets._objects && ope == 'post'){
        targets._objects.forEach(function(element){
          let wkobject = {};          
          wkobject.uniqueid = element.id;
          //deep copying
          wkobject.element  = JSON.parse(JSON.stringify(element));
          objects.push(wkobject);      
          // console.log(objects);
                        
        });
        let selection = new fabric.ActiveSelection(
        targets._objects, {canvas: canvas});        
        canvas.setActiveObject(selection); 

      }else if(ope == 'post'){
        let wkobject = {};
        wkobject.uniqueid = targets.id;
        wkobject.element  = targets;
        objects.push(wkobject);   
        canvas.setActiveObject(targets);          
            
      }else if(targets._objects && ope == 'delete'){ 
        targets._objects.forEach(function(obj){
          objects.push(obj.id);
        })

      }else{
        objects.push(targets.id);
      };      

      this.PostDataByaxios(objects,ope);
    },
    PostDataByaxios:function(objects,ope){

      if(ope == 'post'){
        axios.post('post/element',{
          params: this.$route.params.pathMatch,
          target: objects
        })
        .then(function(response){
        })

      }else if(ope == 'delete'){
        axios.post('delete/element',{
          params: this.$route.params.pathMatch,
          targetid: objects
        })
        .then(function(response){
        })
      }
    },
    CreateUniaueID:function(myStrong){
      let strong = 1000;
      if (myStrong) strong = myStrong;
      return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)      
    },
    SaveCanvasHistory:function(objects,ope,mouseevent){            
      if(!mouseevent&&objects._objects) return;
    //ope {'ADD'||'REMOVE'||'SELECTED'||'MODIFY'}
      let AddOrRemoveObj = {operation:'',objects :[]};
      let ModifyObj      = {operation:'',coords :[]};

      if(ope == 'ADD' || ope == 'REMOVE'){
        if(canvashistory[currentindex])canvashistory.pop();
        AddOrRemoveObj.operation = ope;
        AddOrRemoveObj.objects   = objects;
        canvashistory.push(AddOrRemoveObj);
        currentindex++;

      }else{
        if(ope == 'SELECTED'){
          
          if(canvashistory[currentindex]){
            canvashistory.pop();
            canvashistory.push(ModifyObj);
          }else{
            canvashistory.push(ModifyObj);
          }
          
          canvashistory[currentindex].operation = ope;   
          if(objects._objects){
            objects._objects.forEach(function(obj){   
 
              let testarry  = obj.ownMatrixCache.key.split('_');               
              canvashistory[currentindex].coords.push({
                id    : obj.id,
                top   : Number(testarry[0],10),
                left  : Number(testarry[1],10),
                scaleX : obj.scaleX,
                scaleY : obj.scaleY,
              })
            })            
          }else{
            canvashistory[currentindex].coords.push({
              id     : objects.id,
              left   : objects.left,
              top    : objects.top,
              scaleX : objects.scaleX, 
              scaleY : objects.scaleY,
            })
          }                  
        }else if(ope == 'MODIFY'){                    
          canvashistory[currentindex].operation = ope;      
          currentindex++;
          
          if(objects._objects){            
            canvashistory.push(ModifyObj);
            canvashistory[currentindex].operation = ope; 
            objects._objects.forEach(function(obj){ 

              canvashistory[currentindex].coords.push({
                id     : obj.id,
                left   : objects.translateX + obj.left,
                top    : objects.translateY + obj.top,
                scaleX : obj.scaleX, 
                scaleY : obj.scaleY,                
              })
            })
          }
        }        
      }  
    },
    UndoCanvas:function(){
      currentindex--;      
      if(currentindex < 0){
        currentindex++;
        return;
      };

      let svarray = {_objects:[]};
      let target = canvashistory[currentindex];  

      switch(canvashistory[currentindex].operation) {
      //have to apply a class to object (each class has 'clone function') 
        case 'ADD'    : 
          canvas._objects.forEach(function(obj){           
            if(obj.id == target.objects.id){
              canvas.remove(obj);
            }
          })    
          this.ArrangeDataForDB(target.objects,'delete');
          break;

        case 'REMOVE' : 
          target.objects.forEach(function(obj){
            obj.clone(function(clone){
              clone.set({id : obj.id});
              canvas.add(clone);
              svarray._objects.push(clone);
            })
          }) 
          if(target.objects.length == 1){
            this.ArrangeDataForDB(target.objects[0],'post');
          }else{           
            console.log(svarray);
             
            this.ArrangeDataForDB(svarray,'post');
          }
          canvas.discardActiveObject();    

          break;

        case 'MODIFY' :        
          canvas.discardActiveObject();    

          target.coords.forEach(function(histarget){
            canvas._objects.forEach(function(obj){

              if(obj.id == histarget.id){
                obj.set({
                  left:histarget.left,
                  top:histarget.top,
                  scaleX:histarget.scaleX,
                  scaleY:histarget.scaleY
                })
                svarray._objects.push(obj);
                obj.setCoords();
              }
            })
          })     
          if(target.coords.length == 1){
            this.ArrangeDataForDB(svarray._objects[0],'post');
          }else{
            this.ArrangeDataForDB(svarray,'post');
          }
          canvas.renderAll();                  
          break;                  
      }
      canvashistory.pop();      
    },
    AddElementToCanvas:function(objects){

      objects.forEach(function(obj,index){          
        
        let prot = JSON.parse(obj.element);  
        prot.__proto__ = this.GetCanvasKlass(prot.type);      
        prot.clone(function(elm){
          elm.set({
            id: obj.uniqueid
          });
          //put objects according to their index
          //not use canvas.add(...)
          canvas.insertAt(elm,index,true);
        })
        
      }.bind(this))
    },
    SocketToCanvas:function(receivedobj){  
      console.log(receivedobj);
          
      canvas.discardActiveObject();            

      receivedobj.forEach(function(elm){
        elm.element.__proto__ = this.GetCanvasKlass(elm.element.type);
        elm.element.clone(function(clone){    
          clone.set({
            id: elm.uniqueid
          });

          let svindex = -1;
          canvas._objects.forEach(function(obj,index){
            if(obj.id == elm.uniqueid){
              canvas.insertAt(clone,index,true);
              svindex = index;
            }
          })
          if(svindex == -1){
            canvas.add(clone);
          }
        })
      }.bind(this))   
    },
    DeleteFromCanvas:function(ids){
      canvas.discardActiveObject();
      ids.forEach(function(id){
        canvas._objects.forEach(function(obj){
          if(obj.id == id){
            canvas.remove(obj);
          }
        })
      })
    },
    GetCanvasKlass:function(type){
      switch(type) {
      //have to apply a class to object (each class has 'clone function') 
        case 'image': return fabric.Image.prototype; break;
        case 'text' : return fabric.Text.prototype; break;
        case 'path' : return fabric.Path.prototype; break;                  
      }
    }
  },
}
</script>