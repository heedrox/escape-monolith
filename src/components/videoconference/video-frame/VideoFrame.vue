<template>
  <div id="jitsimeet"></div>
</template>

<script type="text/javascript">
import { getGameCode } from '@/lib/get-game-code';

export default {
  name: 'VideoFrame',
  props: {
    isMuted: { type: Boolean, value: false} ,
  },
  emits: [ 'loaded' ],
  watch: {
    isMuted() {
      if (this.isMuted) {
        this.muteLocal();
      } else {
        this.unmuteLocal();
      }
    },
  },
  mounted() {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'escape-monolith-' + getGameCode(),
      width: 700,
      height: 700,
      parentNode: document.querySelector('#jitsimeet'),
      onload: () => {
        this.$emit('loaded');
      }
    };
    this.jitsiApi = new JitsiMeetExternalAPI(domain, options);
  },
  destroyed() {
    this.jitsiApi.dispose();
  },
  methods: {
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
  },
}
</script>
