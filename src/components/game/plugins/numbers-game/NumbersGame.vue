<template>
  <div>
    <div v-for="(img, idx) in images" :key="img" :class="`divimg divimg${idx}`">
      <div :class="`animage theImage{$img}`" :style="`background-image:url('${getImgPath(img)}')`">
        <span v-if="canISee()" class="goal">{{  goal(img)  }}</span>
        <span class="current">{{  currentValue(img) }}</span>
        <span class="mysum">+{{ mySum(img) }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.divimg {
  position: fixed;
  -webkit-filter: drop-shadow(0.2vh 0.2vh 0 #fff) drop-shadow(-0.2vh -0.2vh 0 #fff);
  filter: drop-shadow(0.2vh 0.2vh 0 #fff) drop-shadow(-0.2vh -0.2vh #fff);
}

.divimg:hover {
  position: fixed;
  -webkit-filter: drop-shadow(2vh 2vh 0 rgb(13, 6, 182)) drop-shadow(-2vh -2vh rgb(13, 6, 182));
  filter: drop-shadow(2vh 2vh 0 rgb(13, 6, 182)) drop-shadow(-2vh -2vh rgb(13, 6, 182));
  cursor: pointer;
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

const IMAGE_ORDERS = [
  [0, 0, 0, 0],
  [2, 3, 1, 4], //player 1
  [4, 2, 1, 3], //player 2
  [3, 4, 2, 1]  //player 3 (or admin(
];

const EACH_PLAYER_POINT = [
  [0, 0, 0, 0], // admin (or player 3)
  [2, 1, 2, 4], // player 1
  [4, 4, 1, 2], // player 2
  [1, 2, 4, 1], // admin (or player 3)
]

const aTurn = (goals, whoSees) => ({ goals, whoSees });

const TURNS = [
  aTurn([0, 1, 2, 4], 1),
  aTurn([3, 0, 0, 4], 2),
  aTurn([0, 2, 0, 4], 3),
];

export default {
  name: 'NumbersGame',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      currentTurn: 0,
    };
  },
  computed: {
    images() {
      const playerNumber = getPlayerNumber() || 3;
      return IMAGE_ORDERS[playerNumber];
    }
  },
  mounted() {


  },
  methods: {
    getImgPath(i) {
      return `${this.publicPath}game/plugins/numbers-game/panel-${i}.png`;
    },
    mySum(img) {
      const playerNumber = getPlayerNumber() || 3;
      //return EACH_PLAYER_POINT[playerNumber][img - 1];
      if (playerNumber === 1) return 1;
      if (playerNumber === 2) return 2;
      return 4;
    },
    goal(img) {
      return TURNS[this.currentTurn].goals[img - 1];
    },
    canISee() {
      const playerNumber = getPlayerNumber() || 3;
      return TURNS[this.currentTurn].whoSees === playerNumber;
    },
    currentValue(img) {
      return '0';
    }
  }
}
</script>
