<template>
<div>
  <img src="../../img/drawtalk_logo.png" alt="drawtalkロゴ"
       width="90px" style="position:absolute;
                           z-index:1;
                           left:15px;
                           top:10px;">
  <fabcanvas />
  <sidemenu />
  <palette />
  <aboutcanvas />
  <chat />
</div>
</template>

<script>
import fabcanvas from './canvas.vue';
import sidemenu from './sidemenu.vue';
import palette from './palette.vue';
import aboutcanvas from './aboutcanvas.vue';
import chat from './chat.vue';

export default{
  components: {
    fabcanvas,
    sidemenu,
    palette,
    aboutcanvas,
    chat,
  }
}
</script>

<style>
  .v--modal-box{
    border: 2px solid rgb(80,210,210);
    border-radius: 10px;
  }
  .v--modal-box>p{
    text-align: center;
  }
  #rotatelogo{
    margin: 0 auto;
    height: 100px;
    width: 180px;
    background-size: contain;
    background-image: url("../../img/imageuploding.gif");
    background-repeat: no-repeat;
    /* background-position: center; */

  }
  #canvassharetitle{
    font-size: 1.6rem;
    height: 20px;
    margin: 20px;
  }
  #canvasURL{
    text-align: left;
    font-size: 1.6rem;
    color: rgb(80,210,210);
  }
  #copytoclipboard{
    position: absolute;
    right: 5px;
    width: 180px;
    height: 30px;
    line-height: 30px;
    top: 70px;
    border:1px solid rgb(80,210,210);
    border-radius: 5px;
  }
  #copytoclipboard:hover{
    background: rgb(80,210,210);
    cursor: pointer;
  }
  #canvasURLQR{
    text-align: left;
    font-size: 1.6rem;
    color: rgb(80,210,210);
    margin-top:60px; 
  }  
  #showcanvasURL{
    font-size: 1.2rem;
    width:98%;
    height:25px;
    position: absolute; 
    top:110px;
    border: 1px solid rgb(80,210,210);
    border-radius: 5px;
  }
  #QRcode{
    position: absolute;
    right: 100px;
    top:170px;
  }
</style>

  
