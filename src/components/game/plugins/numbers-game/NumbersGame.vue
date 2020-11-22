<template>
  <div>
    <NumbersIngame v-if="state === 'INGAME'" @complete="state = 'COMPLETED'"></NumbersIngame>
    <NumbersResult v-else></NumbersResult>
  </div>
</template>

<script>
import NumbersResult from '@/components/game/plugins/numbers-game/numbers-result/NumbersResult';
import NumbersIngame from '@/components/game/plugins/numbers-game/numbers-ingame/NumbersIngame';

const STATES = {
  INGAME: 'INGAME',
  COMPLETED: 'COMPLETED',
};

export default {
  name: 'NumbersGame',
  components: { NumbersIngame, NumbersResult },
  data() {
    return {
      state: STATES.INGAME,
    }
  }
}
</script>
