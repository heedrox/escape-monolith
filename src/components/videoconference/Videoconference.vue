<template>
  <div>
    <div v-show="!iframeLoaded" class="loadingvideo">
      Cargando video...
    </div>
    <div v-show="!gameState.hideVideo" id="jitsimeet"></div>
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
        START GAME
      </button>
    </div>
  </div>
</template>
<style scoped type="text/css">
.loadingvideo {
  position: fixed;
  top: 5vh;
  width: 100%;
  text-align: center;
  font-family: 'SpaceJunk', Arial, Helvetica, serif;
  font-size: 8vh;
  color: #8efc80;
}

.videobtns {
  top: 1vh;
  left: 1vw;
  position: fixed;
}
</style>
<script>
import { getGameCode } from '@/lib/get-game-code';
import { isAdmin } from '@/lib/is-admin';
import firebaseUtil from '@/lib/firebase-util';
import { getPlayerNumber } from '@/lib/get-player-number';

export default {
  name: 'Videoconference',
  emits: ['start'],
  data() {
    return {
      gameState: {},
      iframeLoaded: false,
    };
  },
  firestore: {
    gameState: firebaseUtil.doc('/'),
  },
  watch: {
    gameState() {
      console.log('game state changed!', this.gameState);
      if (this.gameState.hideVideo === true) {
        this.$emit('start');
      }
      if (this.gameState.muted && !isAdmin()) {
        if (this.gameState.muted.indexOf(getPlayerNumber()) >= 0) {
          this.muteLocal();
        } else {
          this.unmuteLocal();
        }
      }
    }
  },
  mounted() {
    this.$firestoreRefs.gameState.update({ hideVideo: false, unmute: false });
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'escape-monolith-' + getGameCode(),
      width: 700,
      height: 700,
      parentNode: document.querySelector('#jitsimeet'),
      onload: () => {
        this.iframeLoaded = true;
      }
    };
    this.jitsiApi = new JitsiMeetExternalAPI(domain, options);
  },
  destroyed() {
    this.jitsiApi.dispose();
  },
  methods: {
    muteAll() {
      this.$firestoreRefs.gameState.update({ muted: [1, 2, 3] });
      this.jitsiApi.executeCommand('muteEveryone')
    },
    muteOne(x) {
      this.$firestoreRefs.gameState.update({ muted: [x] });
    },
    unmuteAll() {
      this.$firestoreRefs.gameState.update({ muted: [] });
    },
    unmuteLocal() {
      this.jitsiApi.isAudioMuted().then(muted => {
        if (muted) {
          this.jitsiApi.executeCommand('toggleAudio');
        }
      });
    },
    muteLocal() {
      this.jitsiApi.isAudioMuted().then(muted => {
        if (!muted) {
          this.jitsiApi.executeCommand('toggleAudio');
        }
      });
    },
    isAdmin() {
      return isAdmin();
    },
    doStart() {
      this.$firestoreRefs.gameState.update({ hideVideo: true });
      this.$emit('start');
    },

  },
}
</script>
