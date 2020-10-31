<template>
  <div class="room-container">
    <div v-if="isAdmin()" class="adminBox">
      Unlock room:
      <a v-if="existsRoom(1)" href="#" :class="adminGetClassFor(1)" @click.prevent="adminUnlock(1)">1</a>
      <a v-if="existsRoom(2)" href="#" :class="adminGetClassFor(2)" @click.prevent="adminUnlock(2)">2</a>
      <a v-if="existsRoom(3)" href="#" :class="adminGetClassFor(3)" @click.prevent="adminUnlock(3)">3</a>
      <a v-if="existsRoom(4)" href="#" :class="adminGetClassFor(4)" @click.prevent="adminUnlock(4)">4</a>
      <a v-if="existsRoom(5)" href="#" :class="adminGetClassFor(5)" @click.prevent="adminUnlock(5)">5</a>
      <a v-if="existsRoom(6)" href="#" :class="adminGetClassFor(6)" @click.prevent="adminUnlock(6)">6</a>
      <a v-if="existsRoom(7)" href="#" :class="adminGetClassFor(7)" @click.prevent="adminUnlock(7)">7</a>
      <a v-if="existsRoom(8)" href="#" :class="adminGetClassFor(8)" @click.prevent="adminUnlock(8)">8</a>
      <a v-if="existsRoom(9)" href="#" :class="adminGetClassFor(9)" @click.prevent="adminUnlock(9)">9</a>
    </div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>

    <div class="separator"></div>
    <div class="room box room1" :class="getClassForRoom(1)" @click="changeRoom(1)"></div>
    <div class="separator" :class="getClassForSeparator('horizontal', 1,2)"></div>
    <div class="room box room2" :class="getClassForRoom(2)" @click="changeRoom(2)"></div>
    <div class="separator" :class="getClassForSeparator('horizontal', 2,3)"></div>
    <div class="room box room3" :class="getClassForRoom(3)" @click="changeRoom(3)"></div>
    <div class="separator"></div>

    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator" :class="getClassForSeparator('vertical', 2,5)"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>

    <div class="separator"></div>
    <div class="room box room4" :class="getClassForRoom(4)" @click="changeRoom(4)"></div>
    <div class="separator" :class="getClassForSeparator('horizontal', 4,5)"></div>
    <div class="room box room5" :class="getClassForRoom(5)" @click="changeRoom(5)"></div>
    <div class="separator" :class="getClassForSeparator('horizontal', 5,6)"></div>
    <div class="room box room6" :class="getClassForRoom(6)" @click="changeRoom(6)"></div>
    <div class="separator"></div>

    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator" :class="getClassForSeparator('vertical', 5,8)"></div>
    <div class="separator"></div>
    <div class="separator" :class="getClassForSeparator('vertical', 6,9)"></div>
    <div class="separator"></div>

    <div class="separator"></div>
    <div class="room box room7" :class="getClassForRoom(7)" @click="changeRoom(7)"></div>
    <div class="separator" :class="getClassForSeparator('horizontal', 7,8)"></div>
    <div class="room box room8" :class="getClassForRoom(8)" @click="changeRoom(8)"></div>
    <div class="separator"></div>
    <div class="room box room9" :class="getClassForRoom(9)" @click="changeRoom(9)"></div>
    <div class="separator"></div>


    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
    <div class="separator"></div>
  </div>
</template>
<script>
import { isAdmin } from '../../../lib/is-admin';
import firebaseUtil from '../../../lib/firebase-util';
import config from '../../../config/game-config';

export default {
  name: 'Map',
  props: {
    activeRoom: {
      type: Number,
      default: 2,
    }
  },
  emits: ['change-room'],
  data() {
    return {
      mapState: {
        unlockedRooms: [],
      },
    };
  },
  firestore: {
    mapState: firebaseUtil.doc('/'),
  },
  methods: {
    isAdmin() {
      return isAdmin();
    },
    adminUnlock(room) {
      if (this.isUnlocked(room)) {
        this.mapState.unlockedRooms.splice(this.mapState.unlockedRooms.indexOf(room), 1);
      } else {
        this.mapState.unlockedRooms.push(room);
      }
      this.$firestoreRefs.mapState.update( { unlockedRooms: this.mapState.unlockedRooms });
    },
    adminGetClassFor(room) {
      return {
        'adminUnlocked': this.isUnlocked(room),
        'adminLocked': !this.isUnlocked(room),
      };
    },
    changeRoom(room) {
      if (this.isUnlocked(room)) {
        this.$emit('change-room', room);
      }
    },
    getClassForRoom(room) {
      return {
        'active': (this.activeRoom === room),
        'unlocked': this.isUnlocked(room),
        'locked': !this.isUnlocked(room)
      };
    },
    getClassForSeparator(classname, roomA, roomB) {
      return {
        [classname]: this.isUnlocked(roomA) && this.isUnlocked(roomB)
      };
    },
    isUnlocked(room) {
      if (this.mapState === null) return false;
      return this.mapState.unlockedRooms.indexOf(room) >= 0;
    },
    existsRoom(room) {
      return config.availableRooms.indexOf(room) >= 0;
    }
  }
}
</script>
<style scoped>
  .adminBox {
    position: absolute;
    font-size: 1.5em;
    font-family: Consolas, Courier, serif;
    padding-top: 0.5vh;
    padding-left: 1vw;
    color: #efefef;
  }

  .adminBox a {
    color: #fff;
    display: inline-block;
    padding-right: 1vw;
  }

  .adminBox a.adminUnlocked {
    color: #fff;
  }

  .adminBox a.adminLocked {
    color: #333;
  }

  .room-container {
    display: grid;
    grid-template-columns: 10% 20% 10% 20% 10% 20% 10%;
    grid-template-rows: 10% 20% 10% 20% 10% 20% 10%;
  }

  .room.unlocked {
    border: solid 0.5vh #fff;
  }

  .room.locked {
    border: solid 0.5vh #000;
  }

  .room.active {
    border: solid 1vh rgb(13, 6, 182);
  }

  .separator {
  }

  .horizontal:before {
    content: '';
    position: relative;
    display: block;
    top: 50%;
    left: 0;
    border-top: 3px solid white;
    background: transparent;
    width: 100%;
  }

  .vertical:before {
    content: '';
    position: relative;
    display: block;
    top: 0;
    left: 50%;
    border-left: 3px solid white;
    background: transparent;
    width: 100%;
    height: 100%;
  }
</style>
