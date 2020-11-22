<template>
  <div>
    <span v-for="(idx, itm) in Array(timesOk(theTry)).fill(0)" :key="`ok-${itm}-${idx}`" class="resok">
      &#9679;
    </span>
    <span v-for="(idx, itm) in Array(timesMid(theTry)).fill(0)" :key="`mid-${itm}-${idx}`" class="resmid">
      &#9680;
    </span>
    <span v-for="(idx, itm) in Array(timesKo(theTry)).fill(0)" :key="`ko-${itm}-${idx}`" class="resko">
      &#9675;
    </span>
  </div>
</template>

<style scoped>
.resok {
  color: #8efc80;
}

.resko {
  color: #ff6c7a;
}

.resmid {
  color: #ffb36c;
}
</style>
<script>
import { timesKo, timesMid, timesOk } from '@/components/game/plugins/master-mind/phases/common';

export default {
  name: 'MasterMindPhase1Result',
  props: {
    theTry: {
      type: String,
      default: ''
    },
  },
  methods: {
    timesOk(rowTry) {
      return timesOk(rowTry)
    },
    timesMid(rowTry) {
      return timesMid(rowTry)
    },
    timesKo(rowTry) {
      return timesKo(rowTry)
    },
  }
};
</script>
