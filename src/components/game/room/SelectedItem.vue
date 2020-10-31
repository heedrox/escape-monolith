<template>
  <div class="zoomed-mask" @click="$emit('hide')">
    <div class="close" @click="$emit('hide')">
      X
    </div>
    <SelectedVideoItem v-if="item.type === 'VIDEO'" :src="url" />
    <SelectedAudioItem v-else-if="item.type === 'MP3'" :src="url" :thumbnail="item.thumbnail" :room-id="item.roomId" />
    <SelectedPdfItem v-else-if="item.type === 'PDF'" :src="url" />
    <SelectedPianoItem v-else-if="item.type === 'PIANO'" :alt="item.image" :src="url" />
    <SelectedPluginItem v-else-if="item.plugin" :item="item" />
    <SelectedImageItem v-else :url="url" :item="item" />
  </div>
</template>
<style scoped>
  .close {
    position: fixed;
    top:8.5vh;
    left: 90vw;
    height: 5vh;
    width: 5vh;
    background-color: rgb(13, 6, 182);
    color:#fff;
    border-radius: 50%;
    display: inline-block;
    font-size:5vh;
    z-index:2;
  }
  .zoomed-mask {
    position:fixed;
    top: 0;
    left:0;
    height:100vh;
    width:100vw;
    background: rgba(165,147,167,0.5);
  }
</style>
<script>
import SelectedVideoItem from './items/SelectedVideoItem';
import SelectedPdfItem from './items/SelectedPdfItem';
import SelectedPianoItem from './items/SelectedPianoItem';
import SelectedImageItem from './items/SelectedImageItem';
import SelectedAudioItem from './items/SelectedAudioItem';
import SelectedPluginItem from '@/components/game/room/items/SelectedPluginItem';

export default {
  name: 'SelectedItem',
  components: {
    SelectedPianoItem,
    SelectedPdfItem,
    SelectedVideoItem,
    SelectedAudioItem,
    SelectedImageItem,
    SelectedPluginItem,
  },
  props: {
    url: {
      type: String,
      default: null
    },
    item: {
      type: Object,
      default: null
    }
  },
  emits: ['hide'],
}
</script>
