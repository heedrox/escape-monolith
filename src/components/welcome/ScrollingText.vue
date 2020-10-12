<template>
  <p id="scrolltext" v-html="content">
    <VNodeToHtml :vnode="$slots.default" @html="setContentFrom($event)" />
  </p>
</template>
<style scoped>
    p {
        text-align: left;
        vertical-align: middle;
        font-size: 1.7em;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 43vh;
        width: 100%;
        line-height: 1.5em;
        font-family:'SpaceJunk', Courier, serif;
    }

    p::-webkit-scrollbar {
        background: rgba(0,0,0,0);
    }

    p::-webkit-scrollbar-thumb {

        background: #bec3ff;
        -webkit-border-radius: 0.2ex;
    }

</style>
<style>
  .blinker {
    animation: blinker 1s linear infinite;
    font-family:serif;
    font-weight: bold;
    font-size: 1.3em;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
</style>
<script>
import VNodeToHtml from './helper/VNodeToHtml';

const END_MARKER = '#';
const BR_MARKER = '·';

export default {
  name: 'ScrollingText',
  components: {
    VNodeToHtml
  },
  data() {
    return {
      fullContent: '',
      startDate: new Date().getTime(),
      now: new Date().getTime(),
      timer: null,
    }
  },
  computed: {
    content() {
      const numLetters = ((this.now - this.startDate) / 1000) * 15;
      const letters = this.fullContent.substring(0, numLetters) + '<span class="blinker"> |</span>';
      const newContent = letters.replace(new RegExp(BR_MARKER, 'g'), '<br>');
      if (newContent.indexOf(END_MARKER) > 0) {
        clearInterval(this.timer);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.timer = null;
      } else if (this.timer !== null) {
        const objDiv = document.getElementById('scrolltext');
        objDiv.scrollTop = objDiv.scrollHeight;
      }
      return newContent.replace(END_MARKER, '');
    }
  },
  mounted() {
    this.startDate = new Date().getTime();
    this.timer = setInterval(() => {
      this.now = new Date().getTime();
    }, 50)
  }
  ,
  methods: {
    setContentFrom($event) {
      this.fullContent = $event.replace(new RegExp(`<br[^<]*>`, 'g'), BR_MARKER) + END_MARKER;
    }
  }
}
</script>
