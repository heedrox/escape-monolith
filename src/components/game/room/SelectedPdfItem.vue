<template>
  <div class="zoomed-item box" @click.stop="">
    <iframe :src="src"
            height="100%" width="100%"
    >
    </iframe>
  </div>
</template>
<style>
</style>
<script>
export default {
  name: 'SelectedPdfItem',
  props: {
    src: {
      type: String,
      default: '',
    }
  }
}
</script>
