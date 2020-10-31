<template>
  <div class="zoomed-item box" @click.stop="">
    <span class="helper"></span>
    <img v-if="isPlaying" alt="wave" :src="waveUrl" />
    <img v-if="!isPlaying" alt="wave" :src="`${publicPath}game/common/play-audio-stop.jpg`" />
    <div class="audiodiv">
      <audio controls :src="src" @play="onplay()" @pause="onpause()">
        Your browser does not support the audio tag.
      </audio>
    </div>
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
  .audiodiv {
    vertical-align:middle;
    top: -20vh;
    position:relative;
  }
</style>
<script>
export default {
  name: 'SelectedAudioItem',
  props: {
    src: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    roomId: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      isPlaying: false,
    }
  },
  computed: {
    waveUrl() {
      return this.thumbnail ?
          `${this.publicPath}game/${this.roomId}/${this.thumbnail}` :
          `${this.publicPath}game/common/play-audio-start.gif`;
    }
  },
  methods: {
    onplay() {
      this.isPlaying = true;
    },
    onpause() {
      this.isPlaying = false;
    }
}
}
</script>
