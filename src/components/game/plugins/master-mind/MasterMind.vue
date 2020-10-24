<template>
  <div>
    <master-mind-phase1 @update-phase="updatePhase()"></master-mind-phase1>
    <master-mind-phase2 :updated-phase="updatedPhase"></master-mind-phase2>
  </div>
</template>

<script>
import MasterMindPhase1 from '@/components/game/plugins/master-mind/phases/MasterMindPhase1';
import MasterMindPhase2 from '@/components/game/plugins/master-mind/phases/MasterMindPhase2';


export default {
  name: 'MasterMind',
  components: { MasterMindPhase1, MasterMindPhase2 },
  data() {
    return {
      updatedPhase : 0,
    };
  },
  methods: {
    updatePhase() {
      this.updatedPhase = 2;
    }
  }
};
</script>
