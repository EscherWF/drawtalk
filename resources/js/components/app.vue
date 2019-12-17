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

  
