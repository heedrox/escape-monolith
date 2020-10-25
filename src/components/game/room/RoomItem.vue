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
import { isAdmin } from '@/lib/is-admin';
import { imageUrlResolve } from '@/components/game/room/image-url-resolve';

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
      return imageUrlResolve(item, this.publicPath, true);
    },
    selectImage(item) {
      this.$emit('select-image', item);
    },
  }
}
</script>
