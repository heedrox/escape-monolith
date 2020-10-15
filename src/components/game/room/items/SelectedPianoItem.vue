<template>
  <div class="zoomed-item box" @click.stop="">
    <span class="helper"></span>
    <img :alt="alt" :src="src" usemap="#pianomap">
    <map name="pianomap">
      <area shape="rect" coords="213,118,268,450" alt="G" title="G" href="#"
            @mousedown.prevent="playPiano('G')" @mouseup.prevent="stopPiano()"
      />
      <area shape="rect" coords="269,118,322,450" alt="A" title="A" href="#"
            @mousedown.prevent="playPiano('A')" @mouseup.prevent="stopPiano()"
      />
      <area shape="rect" coords="323,118,374,450" alt="B" title="B" href="#"
            @mousedown.prevent="playPiano('B')" @mouseup.prevent="stopPiano()"
      />
      <area shape="rect" coords="375,118,425,450" alt="C" title="C" href="#"
            @mousedown.prevent="playPiano('C')" @mouseup.prevent="stopPiano()"
      />
      <area shape="rect" coords="426,118,479,450" alt="D" title="D" href="#"
            @mousedown.prevent="playPiano('D')" @mouseup.prevent="stopPiano()"
      />
      <area shape="rect" coords="480,118,532,450" alt="E" title="E" href="#"
            @mousedown.prevent="playPiano('E')" @mouseup.prevent="stopPiano()"
      />
      <area shape="rect" coords="533,118,586,450" alt="F" title="F" href="#"
            @mousedown.prevent="playPiano('F')" @mouseup.prevent="stopPiano()"
      />
    </map>
  </div>
</template>
<style>
  .helper {
    display: inline-block;
    height: 100%;
    vertical-align:middle;
  }
  .zoomed-item img {
    vertical-align:middle;
  }
</style>
<script>

const FREQS = {
  'G': 392,
  'A': 440,
  'B': 493.83,
  'C': 523.25,
  'D': 587.33,
  'E': 659.26,
  'F': 698.46,

};

const getFrequency = (note) => FREQS[note];

export default {
  name: 'SelectedPianoItem',
  props: {
    alt: {
      type: String,
      default: '',
    },
    urL: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    }
  },
  mounted() {
    const context = new AudioContext();

    /* VCO */
    this.vco = context.createOscillator();
    this.vco.type = 'sine';
    this.vco.frequency.value = 440;
    this.vco.start(0);

    /* VCA */
    this.vca = context.createGain();
    this.vca.gain.value = 0;

    /* Connections */
    this.vco.connect(this.vca);
    this.vca.connect(context.destination);
  },
  methods: {
    playPiano(note) {
      this.vco.frequency.value = getFrequency(note);
      this.vca.gain.value = 1;
    },
    stopPiano() {
      this.vca.gain.value = 0;
    },
  }
}
</script>
