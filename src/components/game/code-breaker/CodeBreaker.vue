<template>
  <div>
    <input
      :value="input"
      :class="inputClass"
      placeholder="PULSA CODIGO"
      readonly
      @input="onInputChange"
    >
    <div class="keyboard">
      <SimpleKeyboard :input="input" @on-change="onChange" @on-key-press="onKeyPress" />
    </div>
  </div>
</template>
<style scoped>
  input {
    margin-top: 3vh;
    height: 4vh;
    width: 20vw;
    margin-bottom: 3vh;
    text-align: center;
    font-size: 3vh;
    font-family: Consolas, Courier, serif;
    text-transform: uppercase;
    background-color: #111111;
    border: solid 0.5vh rgb(13, 6, 182);
    border-radius: 2vh;
    color: white;
  }

  .right-code {
    border: solid 0.5vh rgb(47, 212, 1);
    animation: blink-right .2s step-end infinite alternate;
  }

  .wrong-code {
    border: solid 0.5vh rgb(212, 1, 47);
    animation: blink-wrong .2s step-end infinite alternate;
  }

  .keyboard {
    width:30vw;
    margin: auto;
  }

  @keyframes blink-right {
    50% { background-color: rgba(47, 212, 1, 0.2); }
  }
  @keyframes blink-wrong {
    50% { background-color: rgba(212, 1, 47, 0.2); }
  }
</style>
<script>
import SimpleKeyboard from './SimpleKeyboard';

export default {
  name: 'CodeBreaker',
  components: {
    SimpleKeyboard,
  },
  props: {
    gameConfig: {
      type: Object,
      default: null,
    }
  },
  data: () => ({
    input: '',
    isRightCode: false,
    isWrongCode: false,
    publicPath: process.env.BASE_URL,
  }),
  computed: {
    inputClass() {
      return {
        'input': true,
        'right-code': this.isRightCode,
        'wrong-code': this.isWrongCode,
      };
    },
  },
  methods: {
    onChange(input) {
      this.input = input;
    },
    onKeyPress(button) {
      if (button === '{enter}') {
        if (this.isValidCode(this.input)) {
          this.showValidCode();
        } else {
          this.showWrongCode(this.input);
        }
      }

    },
    onInputChange(input) {
      this.input = input.target.value;
    },
    isValidCode(value) {
      return this.gameConfig.codes.indexOf(value.toUpperCase()) >= 0;
    },
    showValidCode() {
      const audio = new Audio(`${this.publicPath}game/common/right-code.mp3`);
      audio.play();
      this.isRightCode = true;
      setTimeout(() => {
        this.isRightCode = false;
        this.input = '';
      }, 1500);
    },
    showWrongCode() {
      const audio = new Audio(`${this.publicPath}game/common/wrong-code.mp3`);
      audio.play();
      this.isWrongCode = true;
      setTimeout(() => {
        this.isWrongCode = false;
        this.input = '';
      }, 1500);
    }
  }
}
</script>
