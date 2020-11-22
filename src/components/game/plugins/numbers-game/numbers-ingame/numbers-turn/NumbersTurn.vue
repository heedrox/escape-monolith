<template>
  <div :class="[ 'turn', isTurnOk ? 'turnok' : '']">
    <span v-for="(x) in [...Array(numberOfOk)]" :key="x" class="turnok">X</span>
    <span v-for="(x, y) in [...Array(numberOfPending)]" :key="y" :class="[ y === 0 ? 'currentTurn' : '']">X</span>
  </div>
</template>
<style>
.turn {
  position: fixed;
  font-family: 'SpaceJunk', Arial, Helvetica, serif;
  color: white;
  font-size: 4vh;
  top: 13vh;
  left: 13vw;
}

.turnok {
  color: #8efc80;
}

.currentTurn {
  color: #ffce8d;
}
</style>
<script>
export default {
  name: 'NumbersTurn',
  props: {
    isTurnOk: {
      type: Boolean,
      default: false,
    },
    currentTurn: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    numberOfOk() {
      return this.currentTurn ? this.currentTurn : 0;
    },
    numberOfPending() {
      return this.currentTurn ? 3 - this.currentTurn : 3;
    },
  }
}
</script>
