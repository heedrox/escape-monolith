<template>
  <div class="videobtns">
    <button v-if="isAdmin()" @click="muteAll()">
      MUTE ALL
    </button>
    <button v-if="isAdmin()" @click="unmuteAll()">
      UN-MUTE ALL
    </button>
    <button v-if="isAdmin()" @click="muteOne(1)">
      MUTE 1
    </button>
    <button v-if="isAdmin()" @click="muteOne(2)">
      MUTE 2
    </button>
    <button v-if="isAdmin()" @click="muteOne(3)">
      MUTE 3
    </button>
    <button v-if="isAdmin()" @click="doStart()">
      SHOW GAME
    </button>
    <button v-if="isAdmin()" @click="doShowVideo()">
      SHOW VIDEO
    </button>
  </div>
</template>
<style scoped type="text/css">
.videobtns {
  top: 1vh;
  left: 1vw;
  position: fixed;
}
</style>

<script>
import { isAdmin } from '@/lib/is-admin';
import firebaseUtil from '@/lib/firebase-util';
import gameActions from '@/components/game/game-actions/lib/game-actions-lib';

export default {
  name: 'VideoControl',
  data() {
    return {
      gameState: {},
    };
  },
  firestore: {
    gameState: firebaseUtil.doc('/'),
  },
  methods: {
    muteAll() {
      this.$firestoreRefs.gameState.update({ muted: [1, 2, 3] });
    },
    muteOne(x) {
      this.$firestoreRefs.gameState.update({ muted: [x] });
    },
    unmuteAll() {
      this.$firestoreRefs.gameState.update({ muted: [] });
    },
    isAdmin() {
      return isAdmin();
    },
    doStart() {
      gameActions.send( this.$firestoreRefs.gameState, { id: 'HIDEVIDEO' });
    },
    doShowVideo() {
      gameActions.send( this.$firestoreRefs.gameState, { id: 'SHOWVIDEO' });
    }
  },
}
</script>
