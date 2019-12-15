<template>
<div>
    <sidemenu />
    <palette />
    <fabcanvas />
</div>
</template>

<script>
import sidemenu from './sidemenu.vue';
import fabcanvas from './canvas.vue';
import palette from './palette.vue';

export default{
  components: {
    sidemenu,
    fabcanvas,
    palette
  }
}
</script>

  
