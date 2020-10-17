<template>
  <div>
    <GameActions></GameActions>
    <Counter class="left-top box"></Counter>
    <Map class="left-middle box" :active-room="activeRoom" @change-room="changeRoom($event)"></Map>
    <CodeBreaker class="left-bottom box" :game-config="gameConfig"></CodeBreaker>
    <Room class="right box" :active-room="activeRoom" :game-config="gameConfig"></Room>
  </div>
</template>
<style scoped>
    .left-top {
      position: absolute;
      top: 5vh;
      left: 3vw;
      background-color: #000;
      width: 33vw;
      height: 9vh;
    }
    .left-middle {
        position: absolute;
        top: 18vh;
        left: 3vw;
        background-color: #000;
        width: 33vw;
        height: 37vh;
     }
    .left-bottom {
        position: absolute;
        top: 59vh;
        left: 3vw;
        background-color: #000;
        width: 33vw;
        height: 37vh;
    }
    .right {
        position: fixed;
        top: 5vh;
        left: 38vw;
        background-color: #000;
        width: 58vw;
        height: 90vh;
    }
</style>
<script>
import Map from './map/Map';
import Room from './room/Room';
import GAME_CONFIG from '../../config/game-config.js';
import CodeBreaker from './code-breaker/CodeBreaker';
import Counter from './counter/Counter';
import GameActions from './game-actions/GameActions';
import { isAdmin } from '../../lib/is-admin';

export default {
  name: 'Game',
  components: {
    GameActions,
    Counter,
    CodeBreaker,
    Map,
    Room
  },
  data() {
    return {
      activeRoom: GAME_CONFIG.defaultActiveRoom,
      gameConfig: GAME_CONFIG
    }
  },
  methods: {
    changeRoom(room) {
      this.activeRoom = room;
    },
    isAdmin() {
      return isAdmin();
    }
  }
}
</script>
