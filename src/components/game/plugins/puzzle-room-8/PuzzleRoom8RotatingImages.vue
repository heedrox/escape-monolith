<template>
  <div id="puzzle-room-8-image-id-container">
    <selected-image-item v-if="currentImage === 0" :url="getUrl(0)" :item="getItem(0)" />
    <selected-image-item v-if="currentImage === 1" :url="getUrl(1)" :item="getItem(1)" />
  </div>
</template>
<style>
</style>
<script>
import SelectedImageItem from '@/components/game/room/items/SelectedImageItem';

const IMAGES = [
  '2-puzzle-imagen-verde.jpg',
  '2-puzzle-imagen-azul.jpg',
];

export default {
  name: 'PuzzleRoom8RotatingImages',
  components: { SelectedImageItem },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      currentImage: 0,
      timer: null,
    }
  },
  mounted() {
    this.timer = setInterval( async () => {
      this.currentImage = (this.currentImage === 1) ? 0 : 1;
    }, 10000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    getUrl(i) {
      return this.publicPath + `game/8/${IMAGES[i]}`
    },
    getItem(i) {
      return ({
        url: this.getUrl(i), image: IMAGES[i]
      })
    },
  },
}
</script>
