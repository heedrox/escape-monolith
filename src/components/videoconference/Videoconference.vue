<template>
  <div>
    <VideoLoading v-show="isExistent && !iframeLoaded"></VideoLoading>
    <VideoFrame v-if="isExistent" v-show="isVisible"
                :is-muted="isMuted" @loaded="iframeLoaded = true"
    />
    <VideoControl></VideoControl>
  </div>
</template>

<script>
import { isAdmin } from '@/lib/is-admin';
import firebaseUtil from '@/lib/firebase-util';
import { getPlayerNumber } from '@/lib/get-player-number';
import gameActions from '../game/game-actions/lib/game-actions-lib';
import VideoLoading from '@/components/videoconference/video-loading/VideoLoading';
import VideoFrame from '@/components/videoconference/video-frame/VideoFrame';
import VideoControl from '@/components/videoconference/video-control/VideoControl';

export default {
  name: 'Videoconference',
  components: { VideoLoading, VideoFrame, VideoControl },
  props: {
    isExistent: { type: Boolean, value: false },
    isVisible: { type: Boolean, value: false },
  },
  emits: ['start', 'show-video'],
  data() {
    return {
      gameState: {},
      iframeLoaded: false,
      isMuted: false,
    };
  },
  firestore: {
    gameState: firebaseUtil.doc('/'),
  },
  watch: {
    gameState() {
      console.log('game state changed!', this.gameState);
      if (gameActions.isAction(this.gameState, 'HIDEVIDEO')) {
        this.$emit('start');
      }
      if (gameActions.isAction(this.gameState, 'SHOWVIDEO')) {
        this.$emit('show-video');
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
  methods: {
    unmuteLocal() {
      this.isMuted = false;
    },
    muteLocal() {
      this.isMuted = true;
    },
    doStart() {
      gameActions.send(this.$firestoreRefs.gameState, { id: 'HIDEVIDEO' });
    },
    doShowVideo() {
      gameActions.send(this.$firestoreRefs.gameState, { id: 'SHOWVIDEO' });
    }

  },
}
</script>
