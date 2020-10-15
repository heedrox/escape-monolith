<template>
  <div class="zoomed-mask" @click="$emit('hide')">
    <div class="close" @click="$emit('hide')">
      X
    </div>
    <SelectedVideoItem v-if="item.type === 'VIDEO'" :src="url" />
    <SelectedPdfItem v-else-if="item.type === 'PDF'" :src="url" />
    <SelectedPianoItem v-else-if="item.type === 'PIANO'" :alt="item.image" :src="url" />
    <div v-else class="zoomed-item box" @click.stop="">
      <span class="helper"></span>
      <img ref="magnificationElement" :alt="item.image" :src="url" />
      <span
        ref="glass"
        class="magnifying-glass"
        :style="glassStyle"
      />
    </div>
  </div>
</template>
<style scoped>
  .close {
    position: fixed;
    top:8.5vh;
    left: 90vw;
    height: 5vh;
    width: 5vh;
    background-color: rgb(13, 6, 182);
    color:#fff;
    border-radius: 50%;
    display: inline-block;
    font-size:5vh;
    z-index:2;
  }
  .zoomed-mask {
    position:fixed;
    top: 0;
    left:0;
    height:100vh;
    width:100vw;
    background: rgba(165,147,167,0.5);
  }
  .zoomed-item {
    position: fixed;
    top: 10vh;
    left: 10vw;
    height:80vh;
    width:80vw;
    background:black;
    white-space: nowrap; /* This is required unless you put the helper span closely near the img */
    text-align: center;
    border-color: rgb(13, 6, 182);
    border-width: 2vh;
  }

  .zoomed-item img {
    max-height:80vh;
    max-width:80vw;
    width:auto;
    vertical-align:middle;
  }
  .helper {
    display: inline-block;
    height: 100%;
    vertical-align:middle;
  }
  .magnifying-glass {
    position: fixed;
    border: solid 1vh #bec3ff;
    border-radius: 50%;
    cursor: none;
    width: 250px;
    height: 250px;
    transform: translate(-125,-125);
    background: #fff no-repeat;
    display: none;
    pointer-events: none;
  }
  .magnifying-glass:hover .magnifying-glass {
    display: block;
  }
</style>
<script>
import SelectedVideoItem from './SelectedVideoItem';
import SelectedPdfItem from './SelectedPdfItem';
import SelectedPianoItem from './SelectedPianoItem';

export default {
  name: 'SelectedItem',
  components: {
    SelectedPianoItem,
    SelectedPdfItem,
    SelectedVideoItem,
  },
  props: {
    url: {
      type: String,
      default: null
    },
    item: {
      type: Object,
      default: null
    }
  },
  emits: ['hide'],
  data() {
    return {
      img: null,
      width: null,
      height: null,
      bounds: null,
      cursorX: 0,
      cursorY: 0,
      thumbPos: {x: 0, y: 0},
      backgroundPos: '0 0',
      isGlassShown: false,
    };
  },
  computed: {
    glassStyle() {
      return {
        backgroundImage: `url(${this.url})`,
        backgroundPosition: this.backgroundPos,
        left: `${this.cursorX - 125}px`,
        top: (this.cursorY - 125) + 'px',
        display: this.isGlassShown?'block':'none',
      };
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.$refs.magnificationElement.addEventListener(
        'mousemove',
        this.moveMagnifier,
      );
      this.$refs.magnificationElement.addEventListener(
        'mouseleave',
        this.leaveMagnifier,
      );
    });
  },
  methods: {
    moveMagnifier(e) {
      e.preventDefault();
      this.isGlassShown = true;
      this.getCursorPos(e);
      this.getBounds();
      const xPos = this.cursorX - this.thumbPos.x;
      const yPos = this.cursorY - this.thumbPos.y;
      this.backgroundPos =
        `${( xPos * 100 / this.bounds.width)}% ${(yPos * 100 / this.bounds.height)}%`;

    },
    leaveMagnifier(e) {
      this.isGlassShown = false;
    },
    getCursorPos(e) {
      let x = window.Event
        ? e.pageX
        : e.clientX;
      x -= (document.documentElement.scrollLeft) ?
        document.documentElement.scrollLeft
        : document.body.scrollLeft;
      let y = window.Event
        ? e.pageY
        : e.clientY;
      y -= (document.documentElement.scrollTop) ?
        document.documentElement.scrollTop
        : document.body.scrollTop;
      this.cursorX = x; // - this.thumbPos.x;
      this.cursorY = y; // - this.thumbPos.y;
    },
    getBounds() {
      let el = this.$refs.magnificationElement;
      this.bounds = el.getBoundingClientRect();
      let xPos = 0;
      let yPos = 0;
      while (el) {
        const transform = this.getTransform(el);
        if (el.tagName === 'BODY') {
          // deal with browser quirks with body/window/document and page scroll
          const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          const yScroll = el.scrollTop || document.documentElement.scrollTop;
          xPos += el.offsetLeft - xScroll + el.clientLeft + parseInt(transform[0]);
          yPos += el.offsetTop - yScroll + el.clientTop + parseInt(transform[1]);
        } else {
          // for all other non-BODY elements
          xPos += el.offsetLeft - el.scrollLeft + el.clientLeft + parseInt(transform[0]);
          yPos += el.offsetTop - el.scrollTop + el.clientTop + parseInt(transform[1]);
        }
        el = el.offsetParent;
      }
      this.thumbPos = {
        x: xPos,
        y: yPos,
      };
    },
    getTransform(el) {
      const transform = window
        .getComputedStyle(el, null)
        .getPropertyValue('-webkit-transform');
      function rotateDegree(matrix) {
        let angle;
        if (matrix !== 'none') {
          const values = matrix
            .split('(')[1]
            .split(')')[0]
            .split(',');
          const a = values[0];
          const b = values[1];
          angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
          angle = 0;
        }
        // eslint-disable-next-line no-return-assign
        return angle < 0 ? (angle += 360) : angle;
      }
      const results = transform.match(
        // eslint-disable-next-line max-len
        /matrix(?:(3d)\(-{0,1}\d+\.?\d*(?:, -{0,1}\d+\.?\d*)*(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*)), -{0,1}\d+\.?\d*\)|\(-{0,1}\d+\.?\d*(?:, -{0,1}\d+\.?\d*)*(?:, (-{0,1}\d+\.?\d*))(?:, (-{0,1}\d+\.?\d*))\))/,
      );
      let output = [0, 0, 0];
      if (results) {
        if (results[1] === '3d') {
          output = results.slice(2, 5);
        } else {
          results.push(0);
          output = results.slice(5, 9); // returns the [X,Y,Z,1] value;
        }
        output.push(rotateDegree(transform));
      }
      return output;
    },
  },
}
</script>
