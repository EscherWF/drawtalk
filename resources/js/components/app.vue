<template>
<div>
  <!-- <div id="loading">
    <vue-loading type="spin" 
                 color="#333" 
                 :size="{ width: '50px', height: '50px' }"/>
  </div> -->
  <sidemenu />
  <palette />
  <chat />
  <fabcanvas />
</div>
</template>

<script>
import sidemenu from './sidemenu.vue';
import fabcanvas from './canvas.vue';
import palette from './palette.vue';
import chat from './chat.vue';
import { VueLoading } from 'vue-loading-template';

export default{
  components: {
    sidemenu,
    fabcanvas,
    palette,
    chat,
    VueLoading
  }
}
</script>

  
