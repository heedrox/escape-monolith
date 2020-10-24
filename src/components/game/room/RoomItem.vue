<template>
  <div v-if="isAdmin() || isUnlocked">
    <img v-if="isAdmin() || isUnlocked" :class="adminGetClass()" src="../../../assets/common/round-items.png"
         :style="{ backgroundImage: 'url(' + getUrl(item) + ')' }"
         @click.stop="selectImage(item)"
    />
    <div v-if="isAdmin()">
      <a v-if="!isUnlocked" href="#" class="adminUnlock" @click="toggleLock">Unlock</a>
      <a v-if="isUnlocked" href="#" class="adminLock" @click="toggleLock">Lock</a>
    </div>
  </div>
</template>
<style>
  .item {
    width: 100%;
    background-size: cover;
    background-position: center;
  }

  .item:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
  .adminUnlock {
    font-family: Helvetica,serif;
    color: #555;
  }
  .adminLock {
    font-family: Helvetica,serif;
    color: #efefef;
  }
  .lockedItem {
    opacity: 0.1;
  }
  .videolink {
    color: #efefef;
    font-size: 1.2em;
  }
</style>
<script>
import { isAdmin } from '../../../lib/is-admin';
import { isVisibleForMe } from '../../../lib/is-visible-destinatary';
import { getPlayerNumber } from '@/lib/get-player-number';
import { getNumberPlayers } from '@/lib/get-number-players';

export default {
  name: 'RoomItem',
  props: {
    item: {
      type: Object,
      default: null,
    },
    isUnlocked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-lock', 'select-image'],
  data() {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  methods: {
    isAdmin() {
      return isAdmin();
    },
    adminGetClass() {
      return {
        "item": true,
        "lockedItem": isAdmin() && !this.isUnlocked
      }
    },
    toggleLock(item) {
      this.$emit('toggle-lock', item);
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
      if (item.type === 'VIDEO') return `${this.publicPath}game/common/play-video.jpg`;
      if (item.type === 'MP3') return `${this.publicPath}game/common/play-audio-thumb.jpg`;
      if (item.type === 'PDF') return `${this.publicPath}game/common/file.png`;

      return `${this.publicPath}game/${item.roomId}/${item.image}`;
    },
    selectImage(item) {
      this.$emit('select-image', item);
    },
  }
}
</script>
