<template>
  <div id="app">
    <Welcome v-if="state === 'WELCOME'" @start="createCode(); startVideo()" />
    <Videoconference :is-existent="state === 'VIDEO' || state === 'GAME'"
                      :is-visible="state === 'VIDEO'"
                     @start="startGame()"
                     @show-video="showVideo()"
    />
    <Game v-if="state === 'GAME'"></Game>
  </div>
</template>

<script>
import Welcome from './components/welcome/Welcome.vue'
import Game from './components/game/Game';
import Videoconference from './components/videoconference/Videoconference';
import './assets/common/normalize.css'
import './assets/common/common.css'
import firebaseUtil from '@/lib/firebase-util';

const STATES = {
  WELCOME: 'WELCOME',
  GAME: 'GAME',
  VIDEO: 'VIDEO',
};

const BLANK_FIREBASE_GAME = { ready: true, unlockedItems: [], unlockedRooms: [2]};

export default {
  name: 'App',
  components: {
    Welcome,
    Game,
    Videoconference
  },
  data() {
    return {
      state: STATES.WELCOME,
    }
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
  },
  methods: {
    createCode() {
      if (!this.gameState) {
        console.log('Creating game state');
        this.$firestoreRefs.gameState.set(BLANK_FIREBASE_GAME);
      }
    },
    startVideo() {
      this.state = STATES.VIDEO;
    },
    startGame() {
      this.state = STATES.GAME;
    },
    showVideo() {
      this.state = STATES.VIDEO;
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

@font-face {
  font-family: 'Alien';
  src: url('./assets/common/aliendude.ttf')  format('truetype')
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
