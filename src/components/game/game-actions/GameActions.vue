<template>
  <div v-if="isAdmin()">
    <button @click="doGlitch()">
      Glitch
    </button>
    <select v-model="selectedAudio">
      <option selected></option>
      <option v-for="audio in audios" :key="audio.image" :value="audio">
        {{ audio.image }}
      </option>
    </select>
    <button @click="sendAudio()">
      Send audio
    </button>
  </div>
</template>
<style scoped>

</style>
<script type="javascript">
import { glitchAction } from './glitch';
import { audioAction } from './audio';
import firebaseUtil from '../../../lib/firebase-util';
import { isAdmin } from '@/lib/is-admin';
import gameConfig from '../../../config/game-config';
import gameActions from './lib/game-actions-lib';

export default {
  name: 'GameActions',
  data() {
    return {
      gameState: {},
      selectedAudio: '',
      publicPath: process.env.BASE_URL,
    };
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
  },
  computed: {
    audios() {
      return gameConfig.items.filter(gc => gc.type === 'MP3');
    },
  },
  watch: {
    gameState() {
      if (!this.gameState.action) return;
      console.log('ACTION RECEIVED', this.gameState.action);
      if (isAdmin()) {
        console.log('ignoring as Im admin');
        return;
      }
      if ((this.gameState.action.id === 'GLITCH')) {
        glitchAction();
      } else if ((this.gameState.action.id === 'AUDIO')) {
        audioAction(this.publicPath, this.gameState.action.argId);
      }
    }
  },
  methods: {
    doGlitch() {
      gameActions.send(this.$firestoreRefs.gameState, { id: 'GLITCH'})
    },
    sendAudio() {
      console.log(this.selectedAudio);
      this.$firestoreRefs.gameState.update( { action: { id: 'AUDIO', argId: this.selectedAudio.id } });
      setTimeout(() => {
        this.$firestoreRefs.gameState.update( { action: null });
      }, 1000);
    },
    isAdmin() {
      return isAdmin();
    }
  },
}
</script>
