<template>
  <div id="app">
    <Welcome v-if="state === 'WELCOME'" @start="doPlay()" />
    <Game v-if="state === 'GAME'"></Game>
  </div>
</template>

<script>
import Welcome from './components/welcome/Welcome.vue'
import Game from './components/game/Game';
import './assets/common/normalize.css'
import './assets/common/common.css'

const STATES = {
  WELCOME: 'WELCOME',
  GAME: 'GAME',
};

export default {
  name: 'App',
  components: {
    Welcome,
    Game
  },
  data() {
    return {
      state: STATES.WELCOME,
    }
  },
  methods: {
    doPlay() {
      this.state = STATES.GAME;
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'SpaceAge';
  src: url('./assets/common/space-age.ttf')  format('truetype')
}
@font-face {
  font-family: 'SpaceJunk';
  src: url('./assets/common/spacejunkXL.ttf')  format('truetype')
}
@font-face {
  font-family: 'Digital7';
  src: url('./assets/common/digital-7.ttf')  format('truetype')
}
@font-face {
  font-family: 'MarasEye';
  src: url('./assets/common/maras-eye.ttf')  format('truetype')
}
#app {
  font-family: 'SpaceAge', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-image: url('./assets/common/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow:hidden;
}
</style>
