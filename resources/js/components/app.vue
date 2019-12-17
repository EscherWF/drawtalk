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
  .v--modal-box>div{
    margin: 0 auto;
    height: 100px;
    width: 100px;
    background-image: url("../../img/logorotate.gif");
    background-repeat : no-repeat;
  }
</style>

  
