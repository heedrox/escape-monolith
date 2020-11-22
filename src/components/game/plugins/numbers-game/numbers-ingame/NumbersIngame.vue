<template>
  <div v-if="(numberGameState.currentTurn>=0) && (numberGameState.currentTurn<3)">
    <div :class="[ 'turn', isTurnOk ? 'turnok' : '']">
      {{ numberGameState.currentTurn + 1 }} / 3
    </div>
    <div class="progressbar" :style="`width:${progressBarWidth}vw`">
    </div>
    <div v-for="(img, idx) in images" :key="img"
         :class="[ 'divimg', `divimg${idx}`, isSelected(img) ? 'imgselected' : '' ]"
    >
      <div :class="`animage theImage{$img}`"
           :style="`background-image:url('${getImgPath(img)}')`"
           @click="select(img)"
      >
        <span v-if="canISee()" class="goal">{{ goalTxt(img) }}</span>
        <span class="current">{{ (currentValue[img] === 0) ? '' : currentValue[img] }}</span>
        <span class="mysum">+{{ mySum() }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.turn {
  position:fixed;
  font-family: 'SpaceJunk', Arial, Helvetica, serif;
  color:white;
  font-size: 4vh;
  top:13vh;
  left:13vw;
}

.turnok {
  color: #8efc80;
}

.progressbar {
  position:fixed;
  background-color:#8efc80;
  top:13vh;
  left:11.1vw;
  height:5vh;
}


.divimg {
  position: fixed;
  -webkit-filter: drop-shadow(0.2vh 0.2vh 0 #fff) drop-shadow(-0.2vh -0.2vh 0 #fff);
  filter: drop-shadow(0.2vh 0.2vh 0 #fff) drop-shadow(-0.2vh -0.2vh #fff);
}

.divimg:hover {
  position: fixed;
  -webkit-filter: drop-shadow(2vh 2vh 1vh rgba(13, 6, 182, 0.5)) drop-shadow(-2vh -2vh 1vh rgba(13, 6, 182, 0.5)));
  filter: drop-shadow(2vh 2vh 1vh rgba(13, 6, 182, 0.5)) drop-shadow(-2vh -2vh 1vh rgba(13, 6, 182, 0.5));
  cursor: pointer;
}

.divimg.imgselected {
  position: fixed;
  -webkit-filter: drop-shadow(2vh 2vh 0 rgb(13, 6, 182)) drop-shadow(-2vh -2vh rgb(13, 6, 182));
  filter: drop-shadow(2vh 2vh 0 rgb(13, 6, 182)) drop-shadow(-2vh -2vh rgb(13, 6, 182));
}

.divimg .mysum {
  display: none;
}

.divimg:hover .mysum {
  display: block;
}

.divimg0 {
  left: 20vw;
  top: 20vh;
}

.divimg1 {
  left: 60vw;
  top: 20vh;
}

.divimg2 {
  left: 20vw;
  top: 50vh;
}

.divimg3 {
  left: 60vw;
  top: 50vh;
}

.animage {
  width: 20vw;
  height: 11.6vw;
  background-size: cover;
}

.goal {
  font-family: 'SpaceAge', Avenir, Helvetica, Arial, sans-serif;
  font-size: 3vw;
  color: red;
  position: absolute;
  left: 3vw;
  text-align: left;
}

.current {
  font-family: 'SpaceAge', Avenir, Helvetica, Arial, sans-serif;
  font-size: 5vw;
  color: #f5f5f5;
  position: absolute;
  left: 14vw;
  top: 6vw;
  text-align: left;
}

.mysum {
  font-family: 'SpaceAge', Avenir, Helvetica, Arial, sans-serif;
  font-size: 2vw;
  color: #9f9fff;
  position: absolute;
  left: 15vw;
  top: 4vw;
  text-align: left;
}

</style>
<script>
import { getPlayerNumber } from '@/lib/get-player-number';
import firebaseUtil from '@/lib/firebase-util';
import { isAdmin } from '@/lib/is-admin';
import NumbersResult from '@/components/game/plugins/numbers-game/numbers-result/NumbersResult';

const IMAGE_ORDERS = [
  [0, 0, 0, 0],
  [3, 2, 4, 1], //player 1
  [3, 2, 4, 1], //player 2
  [3, 2, 4, 1]  //player 3 (or admin(
];

const BLANK_GAMESTATE = {
  currentTurn: 0,
  selectedPlayer1: null,
  selectedPlayer2: null,
  selectedPlayer3: null,
  progressBar: 0,
};

const aTurn = (goals, whoSees) => ({ goals, whoSees });

const TURNS = [
  aTurn([0, 1, 2, 4], 1),
  aTurn([3, 0, 0, 4], 2),
  aTurn([0, 0, 7, 0], 3),
];

const NEXT_TURN_STATE = nextTurn => ( {
  currentTurn: nextTurn,
  selectedPlayer1: null,
  selectedPlayer2: null,
  selectedPlayer3: null
});

const pointsForImage = (gameState, imgNumber) =>
    (gameState.selectedPlayer1 === imgNumber ? 1 : 0) +
    (gameState.selectedPlayer2 === imgNumber ? 2 : 0) +
    (gameState.selectedPlayer3 === imgNumber ? 4 : 0);

export default {
  name: 'NumbersIngame',
  emits: ['complete'],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      numberGameState: {},
      progressBarWidth: 0,
    };
  },
  computed: {
    images() {
      const playerNumber = getPlayerNumber() || 3;
      return IMAGE_ORDERS[playerNumber];
    },
    currentValue() {
      //need 1,2,3,4 (o not used)
      return [ 0,
        pointsForImage(this.numberGameState, 1),
        pointsForImage(this.numberGameState, 2),
        pointsForImage(this.numberGameState, 3),
        pointsForImage(this.numberGameState, 4) ];
    },
    isTurnOk() {
      return (pointsForImage(this.numberGameState, 1) === this.goal(1)) &&
          (pointsForImage(this.numberGameState, 2) === this.goal(2)) &&
          (pointsForImage(this.numberGameState, 3) === this.goal(3)) &&
          (pointsForImage(this.numberGameState, 4) === this.goal(4));
    }
  },
  firestore: {
    numberGameState: firebaseUtil.doc('/number-game/state')
  },
  watch: {
    numberGameState() {
      if (isAdmin() && this.numberGameState === null) {
        this.$firestoreRefs.numberGameState.set(BLANK_GAMESTATE);
      }
      if (this.isTurnOk) {
        this.startCorrectProgressBar();
      }
      if (!this.isTurnOk) {
        this.stopCorrectProgressBar();
      }
      if (this.numberGameState && this.numberGameState.currentTurn >= 3) {
        this.$emit('complete');
      }
    }
  },
  mounted() {


  },
  methods: {
    getImgPath(i) {
      return `${this.publicPath}game/plugins/numbers-game/panel-${i}.png`;
    },
    mySum() {
      const playerNumber = getPlayerNumber() || 3;
      if (playerNumber === 1) return 1;
      if (playerNumber === 2) return 2;
      return 4;
    },
    goal(img) {
      if (!this.numberGameState) return '';
      const currentTurn = this.numberGameState.currentTurn || 0;
      if (currentTurn >= 3) return 0;
      return TURNS[currentTurn].goals[img - 1];
    },
    goalTxt(img) {
      if (!this.numberGameState) return '';
      const theGoal = this.goal(img);
      return (theGoal === 0) ? '' : theGoal;
    },
    canISee() {
      if (!this.numberGameState) return false;
      const currentTurn = this.numberGameState.currentTurn || 0;
      const playerNumber = getPlayerNumber() || 3;
      return TURNS[currentTurn].whoSees === playerNumber;
    },
    select(img) {
      const playerNumber = getPlayerNumber() || 3;
      const objUpdate = {};
      objUpdate[`selectedPlayer${playerNumber}`] = this.isSelected(img) ? null : img;
      this.$firestoreRefs.numberGameState.update(objUpdate);
    },
    isSelected(img) {
      const playerNumber = getPlayerNumber() || 3;
      return this.numberGameState[`selectedPlayer${playerNumber}`] === img;
    },
    startCorrectProgressBar() {
      this.startTimerDate = new Date();
      this.timer = setInterval(() => {
        const msecs = (new Date().getTime()-this.startTimerDate.getTime());
        this.progressBarWidth = msecs / 3000 * 100 * 0.79;
        if (msecs / 3000 >= 1) {
          //achieved!
          clearInterval(this.timer);
          this.setAchievedTurn();
        }
      }, 50);
    },
    stopCorrectProgressBar() {
      clearInterval(this.timer);
      this.progressBarWidth=0;
    },
    setAchievedTurn() {
      if (isAdmin()) {
        console.log('DONE!');
        const nextTurn = (this.numberGameState.currentTurn || 0) + 1;
        if (nextTurn<=3) {
          this.$firestoreRefs.numberGameState.update(NEXT_TURN_STATE(nextTurn));
        } else {
          clearInterval(this.timer);
        }
      }
    }
  },
}
</script>
