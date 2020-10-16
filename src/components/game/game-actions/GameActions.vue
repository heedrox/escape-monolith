<template>
  <div v-if="isAdmin()">
    <button @click="doGlitch()">
      Glitch
    </button>
  </div>
</template>
<style scoped>

</style>
<script type="javascript">
import { glitchAction } from './glitch';
import firebaseUtil from '../../../lib/firebase-util';
import { isAdmin } from '../../../lib/is-admin';

export default {
  name: 'GameActions',
  data() {
    return {
      gameState: {},
    };
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
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
      }
    }
  },
  methods: {
    doGlitch() {
      this.$firestoreRefs.gameState.update( { action: { id: 'GLITCH' } });
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
