<template>
  <div>
    <div v-show="!iframeLoaded" class="loadingvideo">
      Cargando video...
    </div>
    <div v-show="!gameState.hideVideo" id="jitsimeet"></div>
    <div class="videobtns">
      <button v-if="isAdmin()" @click="muteAll()">
        MUTE
      </button>
      <button v-if="isAdmin()" @click="doStart()">
        START
      </button>
    </div>
  </div>
</template>
<style scoped type="text/css">
.loadingvideo {
  position:fixed;
  top:5vh;
  width:100%;
  text-align:center;
  font-family: 'SpaceJunk', Arial, Helvetica, serif;
  font-size: 8vh;
  color:#8efc80;
}
.videobtns {
  top:1vh;
  left:1vw;
  position:fixed;
}
</style>
<script>
import { getGameCode } from '@/lib/get-game-code';
import { isAdmin } from '@/lib/is-admin';
import firebaseUtil from '@/lib/firebase-util';

export default {
  name: 'Videoconference',
  emits: ['start'],
  data() {
    return {
      gameState: {  hideVideo: false },
      iframeLoaded: false,
    };
  },
  firestore: {
    gameState: firebaseUtil.doc('/'),
  },
  watch: {
    gameState() {
      if (this.gameState.hideVideo === true) {
        this.$emit('start');
      }
    }
  },
  mounted() {
    this.$firestoreRefs.gameState.update( { hideVideo: false }); //make sure we start with video not hidden
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'escape-monolith-'+getGameCode(),
      width: 700,
      height: 700,
      parentNode: document.querySelector('#jitsimeet'),
      onload: () => { this.iframeLoaded = true; }
    };
    this.jitsiApi = new JitsiMeetExternalAPI(domain, options);
  },
  methods: {
    muteAll() {
      this.jitsiApi.executeCommand('muteEveryone')
    },
    isAdmin() {
      return isAdmin();
    },
    doStart() {
      this.$firestoreRefs.gameState.update( { hideVideo: true });
      this.$emit('start');
    },
  },
}
</script>
