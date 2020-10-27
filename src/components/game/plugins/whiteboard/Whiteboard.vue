<template>
  <div>
    <iframe width="800" height="400"
            :src="`${publicPath}whiteboard/index.html#${getGameCode()}_${getPlayerNumber()}`"
    />
  </div>
</template>
<style>
iframe {
  width:800px;
  height:400px;
}
</style>
<script>
import { getGameCode } from '@/lib/get-game-code';
import { getPlayerNumber } from '@/lib/get-player-number';

export default {
  name: 'Whiteboard',
  data() {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  methods: {
    getGameCode() {
      return getGameCode();
    },
    getPlayerNumber() {
      return getPlayerNumber() || 0;
    }
  }
}
</script>
