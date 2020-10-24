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
    </div>
    <table v-if="currentPhase === 1" class="game-board-list">
      <tr class="current-letters">
        <td class="aletter">
          {{ currentTryLetter(0) }}
        </td>
        <td class="aletter">
          {{ currentTryLetter(1) }}
        </td>
        <td class="aletter">
          {{ currentTryLetter(2) }}
        </td>
        <td class="aletter">
          {{ currentTryLetter(3) }}
        </td>
      </tr>
      <tr v-for="ntry in [8, 7, 6, 5, 4, 3, 2, 1, 0]" :key="ntry">
        <td class="aletter">
          {{ tryLetter(ntry, 0) }}
        </td>
        <td class="aletter">
          {{ tryLetter(ntry, 1) }}
        </td>
        <td class="aletter">
          {{ tryLetter(ntry, 2) }}
        </td>
        <td class="aletter">
          {{ tryLetter(ntry, 3) }}
        </td>
        <td class="res">
          <span v-for="(idx, itm) in Array(timesOk(ntry)).fill(0)" :key="`ok-${itm}-${idx}`" class="resok">
            &#9679;
          </span>
          <span v-for="(idx, itm) in Array(timesMid(ntry)).fill(0)" :key="`mid-${itm}-${idx}`" class="resmid">
            &#9680;
          </span>
          <span v-for="(idx, itm) in Array(timesKo(ntry)).fill(0)" :key="`ko-${itm}-${idx}`" class="resko">
            &#9675;
          </span>
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

.resok {
  color: #8efc80;
}

.resko {
  color: #ff6c7a;
}

.resmid {
  color: #ffb36c;
}

tr.current-letters {
  height: 8vh;
}
</style>
<script>
import { getGameCode } from '@/lib/get-game-code';
import { getPlayerNumber } from '@/lib/get-player-number';
import { COMBINATIONS, LETTERS } from '@/components/game/plugins/master-mind/phases/common';


const countOk = (currentCombination, realCombination) =>
    currentCombination.split('')
        .map((x, idx) => realCombination[idx] === x)
        .filter(r => r === true).length;

const countMid = (currentCombination, realCombination) =>
    currentCombination.split('')
        .map((x, idx) => (realCombination[idx] !== x) && (realCombination.indexOf(x)>=0))
        .filter(r => r === true).length;

const countKo = (currentCombination, realCombination) =>
    currentCombination.split('')
        .map(x => realCombination.indexOf(x) === -1)
        .filter(r => r === true).length;

const LOCAL_STORAGE_NAME = () => `MASTERMIND-${getGameCode()}-${getPlayerNumber()}`;

export default {
  name: 'MasterMindPhase1',
  emits: ['update-phase'],
  data() {
    return {
      currentTry: '',
      tries: [],
      currentPhase: 1,
    };
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
        if (this.timesOk(this.tries.length-1) === 4) {
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
    timesOk(item) {
      if (!this.tries[item]) return 0;
      const playerNumber = getPlayerNumber() || 3;
      return countOk(this.tries[item], COMBINATIONS[playerNumber]);
    },
    timesMid(item) {
      if (!this.tries[item]) return 0;
      const playerNumber = getPlayerNumber() || 3;
      return countMid(this.tries[item], COMBINATIONS[playerNumber]);
    },
    timesKo(item) {
      if (!this.tries[item]) return 0;
      const playerNumber = getPlayerNumber() || 3;
      return countKo(this.tries[item], COMBINATIONS[playerNumber]);
    },
  }
}
</script>
