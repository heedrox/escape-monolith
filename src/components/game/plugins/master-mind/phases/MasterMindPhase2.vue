<template>
  <div>
    <div v-if="currentPhase === 2" class="codeblock">
      <div v-if="numberPlayers === 2">
        <div v-for="itm in [0,1,2,3,4,5,6,7]" :key="itm" :class="[ 'aletter', isMyLetter(itm)?'shown':'' ]">
          {{ theLetter(itm) }}
        </div>
      </div>
      <div v-if="numberPlayers === 3">
        <div v-for="itm in [0,1,2,3,4,5,6,7,8,9,10,11]" :key="itm" :class="[ 'aletter', isMyLetter(itm)?'shown':'' ]">
          {{ theLetter(itm) }}
        </div>
      </div>
      <img class="theplanet" :src="`${publicPath}game/9/mundo-pista.png`">
    </div>
  </div>
</template>
<style scoped type="text/css">
.codeblock {
  position:fixed;
  top: 40vh;
  left: 16vw;
  width: 70vw;
  text-align:center;
}
.aletter {
  width: 5vw;
  display: inline-block;
  border: 0.1vh solid #8efc80;
  font-family: 'Alien', serif;
  font-size: 5vh;
  height: 10vh;
  vertical-align: middle;
  line-height: 10vh;
}
.aletter.shown {
  color: #8efc80;
}
.aletter:nth-child(5),.aletter:nth-child(9) {
  margin-left:2.5vw;
}
.aletter.shown:hover {
  font-size:15vh;
  height: 15vh;
  width:10vw;
  margin-top:-5vh;
  margin-left:0vw;
  position:relative;
  line-height:15vh;
}
.theplanet {
  max-width:10vh;
  max-height:10vh;
  position:fixed;
  top:15vh;
  left:15vw;
  opacity: 0.4;
}
</style>
<script>
import { getNumberPlayers } from '@/lib/get-number-players';
import { getPlayerNumber } from '@/lib/get-player-number';
import { getGameCode } from '@/lib/get-game-code';
import { COMBINATIONS, LETTERS } from '@/components/game/plugins/master-mind/phases/common';

const LOCAL_STORAGE_NAME = () => `MASTERMIND-${getGameCode()}-${getPlayerNumber()}`;

export default {
  name: 'MasterMindPhase2',
  props: {
    updatedPhase: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      numberPlayers: getNumberPlayers(),
      currentPhase: 0,
      publicPath: process.env.BASE_URL,
    }
  },
  watch: {
    updatedPhase() {
      if (this.updatedPhase === 2) this.currentPhase = 2;
    }
  },
  mounted() {
    const theData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME()));
    if (theData) {
      this.currentPhase = theData.currentPhase;
    }
  },
  methods: {
    isMyLetter(itm) {
      const playerNumber = getPlayerNumber() || 3;
      if (playerNumber === 1) return (itm>=0)&&(itm<=3);
      if (playerNumber === 2) return (itm>=4)&&(itm<=7);
      if (playerNumber === 3) return (itm>=8)&&(itm<=11);
      return false;
    },
    theLetter(num) {
      const numPlayer = getPlayerNumber() || 3;
      if (this.isMyLetter(num)) {
        return COMBINATIONS[numPlayer].split('')[num%4];
      }
      return '-';
    },
  },
}
</script>
