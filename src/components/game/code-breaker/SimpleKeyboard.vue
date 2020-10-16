<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String,
      default: '',
    }
  },
  emits: ['on-change', 'on-key-press'],
  data: () => ({
    keyboard: null
  }),
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  },
  mounted() {
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        'default': [
          '1 2 3 4 5 6 7 8 9 0 {bksp}',
          'Q W E R T Y U I O P',
          'A S D F G H J K L {enter}',
          'Z X C V B N M , .'
        ],
      },
    });
  },
  methods: {
    onChange(input) {
      this.$emit("on-change", input);
    },
    onKeyPress(button) {
      this.$emit("on-key-press", button);
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
