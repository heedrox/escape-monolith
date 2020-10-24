<template>
  <div>
    <div v-if="gameState && gameState.ready" class="all-items">
      <div class="items-container">
        <RoomItem v-for="item in visibleItemsInRoom"
                  :key="item.id"
                  :item="item"
                  :is-unlocked="isUnlocked(item.id)"
                  @select-image="selectImage($event)"
                  @toggle-lock="adminToggleLock(item.id)"
        />
      </div>
    </div>
    <div v-if="!gameState || !gameState.ready" class="waiting">
      <p>Humanos,</p>
      <p><br /><br /></p>
      <p>Demostradnos lo que valéis</p>
      <p>
        <button v-if="isAdmin()" @click="createGamecode()">
          RESET CODIGO
        </button>
      </p>
    </div>
    <SelectedItem v-if="selectedItem"
                  :item="selectedItem"
                  :url="getUrl(selectedItem)"
                  @hide="hideImage()"
    />
  </div>
</template>
<style>
  .all-items, .waiting {
    padding: 5vh 3vw;
    height: 80vh;
    overflow-y: auto;
  }

  .waiting p {
    font-size: 10vh;
    color: #fff;
  }
  .all-items::-webkit-scrollbar {
    background: #b5b5b5;
  }

  .all-items::-webkit-scrollbar-thumb {
    background: #a593a7;
    -webkit-border-radius: 0.2ex;
    -webkit-box-shadow: 0px 1px 2px rgba(77, 58, 18, 0.75);
  }

  .items-container {
    display: grid;
    grid-template-columns: 3.3fr 3.3fr 3.3fr;
    grid-column-gap: 2vw;
    grid-row-gap: 5vh;
  }
</style>
<script>
import SelectedItem from './SelectedItem';
import RoomItem from './RoomItem';
import { isAdmin } from '../../../lib/is-admin';
import { isVisibleForMe } from '../../../lib/is-visible-destinatary';
import firebaseUtil from '../../../lib/firebase-util';
import { getPlayerNumber } from '@/lib/get-player-number';
import { getNumberPlayers } from '@/lib/get-number-players';

export default {
  name: 'Room',
  components: {
    SelectedItem,
    RoomItem,
  },
  props: {
    activeRoom: {
      type: Number,
      default: 0,
    },
    gameConfig: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      gameState: {
        unlockedItems: [],
        ready: false,
      },
      selectedItem: null
    }
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
  },
  computed: {
    visibleItemsInRoom() {
      return this.gameConfig.items
          .filter(item => (item.roomId === this.activeRoom))
          .filter(item => !item.invisible);
    }
  },
  watch: {
    gameState() {
      this.closeImageIfOpen();
    },
  },
  methods: {
    isAdmin() {
      return isAdmin();
    },
    adminToggleLock(itemId) {
      if (this.isUnlocked(itemId)) {
        this.gameState.unlockedItems.splice(this.gameState.unlockedItems.indexOf(itemId), 1);
      } else {
        this.gameState.unlockedItems.push(itemId);
      }
      this.$firestoreRefs.gameState.update( { unlockedItems: this.gameState.unlockedItems });
    },
    getUrl(item) {
      if (item.corrupted && !isAdmin() && isVisibleForMe(item.destinataries)) {
        return `${this.publicPath}game/common/corrupted-image.jpg`;
      }
      if (item.different) {
        return isVisibleForMe(item.destinataries) ?
          `${this.publicPath}game/${item.roomId}/${item.imageA}` :
          `${this.publicPath}game/${item.roomId}/${item.imageB}`;
      }
      if (item.differentMultiple) {
        const playerNumber = getPlayerNumber() || (getNumberPlayers());
        const byImageForMe = img => img.whoSees.indexOf(playerNumber) >= 0;
        const theImage = item.images.filter(byImageForMe)[0].image;
        return `${this.publicPath}game/${item.roomId}/${theImage}`;
      }
      return `${this.publicPath}game/${item.roomId}/${item.image}`
    },
    selectImage(item) {
      this.selectedItem = item;
    },
    hideImage() {
      this.selectedItem = null;
    },
    isUnlocked(itemId) {
      return this.gameState.unlockedItems.indexOf(itemId) >= 0;
    },
    createGamecode() {
      if (window.confirm('Esto reseteará todo el juego. ¿Seguro?')) {
        this.$firestoreRefs.gameState.set({ ready: true, unlockedItems: [], unlockedRooms: [2]});
      }
    },
    closeImageIfOpen() {
      if (!this.gameState) return;
      if (!this.selectedItem) return;
      if (this.gameState.unlockedItems.indexOf(this.selectedItem.id) === -1) {
        this.selectedItem = null;
      }
    }
  },
}
</script>
