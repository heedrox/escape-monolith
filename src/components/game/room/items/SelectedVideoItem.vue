<template>
  <div class="zoomed-item box" @click.stop="">
    <span class="helper"></span>
    <video width="640" height="480" controls>
      <source :src="src" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>
<style scoped>
.zoomed-item {
  position: fixed;
  top: 10vh;
  left: 10vw;
  height:80vh;
  width:80vw;
  background:black;
  white-space: nowrap; /* This is required unless you put the helper span closely near the img */
  text-align: center;
  border-color: rgb(13, 6, 182);
  border-width: 2vh;
}
.helper {
  display: inline-block;
  height: 100%;
  vertical-align:middle;
}
.zoomed-item video {
  vertical-align:middle;
}
</style>
<script>
export default {
  name: 'SelectedVideoItem',
  props: {
    src: {
      type: String,
      default: '',
    }
  }
}
</script>
