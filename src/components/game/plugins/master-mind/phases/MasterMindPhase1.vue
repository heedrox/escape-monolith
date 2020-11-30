<template>
  <div>
    <div v-if="currentPhase === 1" class="game-board-keypad">
      <div class="mmbox" @click="select(0)">
        {{ myletter(0) }}
      </div>
      <div class="mmbox" @click="select(1)">
        {{ myletter(1) }}
      </div>
      <div class="mmbox" @click="select(2)">
        {{ myletter(2) }}
      </div>
      <div class="mmbox" @click="select(3)">
        {{ myletter(3) }}
      </div>
      <div class="mmbox"></div>
      <div class="mmbox" @click="select(4)">
        {{ myletter(4) }}
      </div>
      <div class="mmbox" @click="select(5)">
        {{ myletter(5) }}
      </div>
      <div class="mmbox" @click="select(6)">
        {{ myletter(6) }}
      </div>
      <div class="mmbox" @click="select(7)">
        {{ myletter(7) }}
      </div>
      <div class="keypadIdentifier">
        {{ identifierLow }} - {{ identifierHigh }}
      </div>
    </div>
    <table v-if="currentPhase === 1" class="game-board-list">
      <tr class="current-letters">
        <td class="aletter">
          <span v-if="(typeof currentTry !== 'undefined') && currentTry.length === 0" class="caret"> </span>
          {{ currentTryLetter(0) }}
        </td>
        <td class="aletter">
          <span v-if="(typeof currentTry !== 'undefined') && currentTry.length === 1" class="caret"> </span>
          {{ currentTryLetter(1) }}
        </td>
        <td class="aletter">
          <span v-if="(typeof currentTry !== 'undefined') && currentTry.length === 2" class="caret"> </span>
          {{ currentTryLetter(2) }}
        </td>
        <td class="aletter">
          <span v-if="(typeof currentTry !== 'undefined') && currentTry.length === 3" class="caret"> </span>
          {{ currentTryLetter(3) }}
        </td>
      </tr>
      <tr v-for="rowTry in [8, 7, 6, 5, 4, 3, 2, 1, 0]" :key="rowTry">
        <td class="aletter">
          {{ tryLetter(rowTry, 0) }}
        </td>
        <td class="aletter">
          {{ tryLetter(rowTry, 1) }}
        </td>
        <td class="aletter">
          {{ tryLetter(rowTry, 2) }}
        </td>
        <td class="aletter">
          {{ tryLetter(rowTry, 3) }}
        </td>
        <td class="res">
          <master-mind-phase1-result :the-try="tries[rowTry]"></master-mind-phase1-result>
        </td>
      </tr>
    </table>
  </div>
</template>
<style type="text/css" scoped>
.game-board-keypad {
  position: fixed;
  top: 15vh;
  left: 15vw;
  width: 80vw;
  display: grid;
  grid-template-rows: 16vh 16vh 16vh;
  grid-template-columns: 10vw 10vw 10vw;
}

.game-board-list {
  position:fixed;
  top: 14vh;
  left: 53vw;
  width: 37vw;

}

.keypadIdentifier {
  color: #efefef;
  text-align: left;
  padding-top: 1vh;
  font-size:2vh;
  font-family: "SpaceJunk", "Lucida Sans Unicode", sans-serif;
}
.mmbox {
  font-family: 'Alien', serif;
  font-size: 14vh;
  background: #4444;
  border: 0.1vh solid #8efc80;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8efc80;
  cursor: pointer;
}

.mmbox:hover {
  background: #8efc8099;
  color: #000;
}

td.aletter {
  font-family: 'Alien', serif;
  font-size: 7.8vh;
  color: #efefef;
  width:5vw;
  text-align:center;
}

td.res {
  font-family: "arial unicode ms", "Lucida Sans Unicode", sans-serif;
  font-size:4vh;
  width: 5vw;
  padding-left:5vw;
}

tr.current-letters {
  height: 8vh;
}

.caret {
  -webkit-animation: blink 0.8s infinite;
  width:0.3vw;
  margin-left:1vw;
  height: 6vh;
  display:block;
}

@-webkit-keyframes blink {
  0% {background: #222}
  50% {background: #efefef}
  100% {background: #222}
}
</style>
<script>
import { getGameCode } from '@/lib/get-game-code';
import { getPlayerNumber } from '@/lib/get-player-number';
import { LETTERS, timesOk } from '@/components/game/plugins/master-mind/phases/common';
import MasterMindPhase1Result from './master-mind-phase-1-result/MasterMindPhase1Result';

const LOCAL_STORAGE_NAME = () => `MASTERMIND-${getGameCode()}-${getPlayerNumber()}`;

export default {
  name: 'MasterMindPhase1',
  components: { MasterMindPhase1Result },
  emits: ['update-phase'],
  data() {
    return {
      currentTry: '',
      tries: [],
      currentPhase: 1,
    };
  },
  computed: {
    identifierLow() {
      return 1 + ((getPlayerNumber() || 1) - 1) * 8;
    },
    identifierHigh() {
      return ((getPlayerNumber() || 1)) * 8;
    },
  },
  mounted() {
    const theData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME()));
    if (theData) {
      this.currentTry = theData.currentTry;
      this.tries = theData.tries;
      this.currentPhase = theData.currentPhase;
      if (this.currentPhase === 2) {
        this.$emit('update-phase');
      }
    } else {
      this.tries.push(this.myletter(0) + this.myletter(1) + this.myletter(2) + this.myletter(3));
    }
  },
  destroyed() {
    localStorage.setItem(LOCAL_STORAGE_NAME(), JSON.stringify({
      currentTry: this.currentTry,
      tries: this.tries,
      currentPhase: this.currentPhase,
    }));
  },
  methods: {
    select(letterNum) {
      const addTry = (theTry) => {
        this.tries.push(theTry);
        if (this.tries.length >= 9) {
          this.tries = this.tries.slice(-9);
        }
      };
      const checkNextPhase = () => {
        if (timesOk(this.tries[this.tries.length-1]) === 4) {
          this.currentPhase = 2;
          this.$emit('update-phase');
        }
      };

      this.currentTry = this.currentTry + this.myletter(letterNum);
      if (this.currentTry.length >= 4) {
        addTry(this.currentTry);
        this.currentTry = '';
        checkNextPhase();
      }
    },
    myletter(num) {
      const numPlayer = getPlayerNumber() || 3;
      return LETTERS[numPlayer].split('')[num];
    },
    currentTryLetter(numLetter) {
      const tryArr = this.currentTry.split('');
      if (numLetter >= tryArr.length) return '';
      return tryArr[numLetter];
    },
    tryLetter(numTry, numLetter) {
      if (numTry >= this.tries.length) return '';
      const tryArr = this.tries[numTry].split('');
      if (numLetter >= tryArr.length) return '';
      return tryArr[numLetter];
    },

  }
}
</script>
