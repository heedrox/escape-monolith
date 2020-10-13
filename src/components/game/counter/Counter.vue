<template>
  <div>
    <p>{{ minutes }}:{{ seconds }}</p>
    <p v-if="isAdmin()" class="adminbox" @click="pressStart()">
      Restart
    </p>
  </div>
</template>
<style scoped>
  p {
    width: 100%;
    height: 100%;
    font-family: 'Digital7', serif;
    font-size: 10vh;
    vertical-align: middle;
    color:#fff;
    letter-spacing: 1vw;
  }
  p.adminbox {
    font-size: 3vh;
    display:block;
    text-align:left;
    position:absolute;
    top: 0vh;
    font-family: Consolas, Serif,serif;
    letter-spacing: normal;
    color:#333;
  }
</style><script>
import { db } from '../../../config/db';

const asCounterWithPadding = (number, padding) => number < 10 ? (padding + number) : (number + '')
import { addHours, diffMinutes, diffSeconds } from '../../../lib/dates'
import {isAdmin} from '../../../lib/is-admin';
import { getGameCode } from '../../../lib/get-game-code';

const FIREBASE_URL = `/game-states/${getGameCode()}/`;

export default {
  name: 'Counter',
  data () {
    return {
      now: new Date(),
      gameState: {},
    }
  },
  firestore: {
    gameState: db.doc(FIREBASE_URL),
  },
  computed: {
    endTime: function() {
      return (this.gameState && this.gameState.endTime) ? this.gameState.endTime.toDate() : null;
    },
    minutes: function () {
      return this.endTime ? asCounterWithPadding(diffMinutes(this.endTime, this.now), '0') : '-'
    },
    seconds: function () {
      return this.endTime ? asCounterWithPadding(diffSeconds(this.endTime, this.now), '0') : '-'
    }
  },
  mounted() {
    this.startTimer();
  },
  destroyed() {
    this.clearTimer();
  },
  methods: {
    isAdmin() {
      return isAdmin();
    },
    clearTimer () {
      if (this.intervalTimer) {
        window.clearInterval(this.intervalTimer)
      }
    },
    startTimer () {
      this.clearTimer();
      this.intervalTimer = window.setInterval(() => {
        this.now = new Date()
      }, 500)
    },
    pressStart() {
      if (window.confirm('Quieres restartear el timer?')) {
        this.now = new Date();
        db.doc(FIREBASE_URL).update({endTime: addHours(1, this.now)});
      }
    }
  }
}
</script>
