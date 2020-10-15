<template>
  <div class="zoomed-item box" @click.stop="">
    <span class="helper"></span>
    <video width="640" height="480" controls>
      <source :src="src" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>
<style>
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
