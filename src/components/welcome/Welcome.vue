<template>
  <div class="welcome">
    <welcome-title v-if="state === 'SHOW_WELCOME'" @start="showScroll()"></welcome-title>
    <welcome-scroll v-if="state === 'SHOW_SCROLL'" @start="doStart()">
      Humanos,<br /><br />
      Os hacemos entrega de este presente, con objeto de sellar una futura alianza con nuestra raza.<br /><br />
      Demostradnos que sois dignos de esta alianza.<br /><br />
      Tenéis <b>UNA HORA</b> para hacerlo. <br /><br />
      Os vemos.
    </welcome-scroll>
  </div>
</template>

<script>
import WelcomeTitle from './WelcomeTitle';
import WelcomeScroll from './WelcomeScroll';

const STATES = {
  SHOW_WELCOME: 'SHOW_WELCOME',
  SHOW_SCROLL: 'SHOW_SCROLL',
};

export default {
  name: 'Welcome',
  components: {
    WelcomeTitle,
    WelcomeScroll
  },
  emits: ['start'],
  data() {
    return {
      state: STATES.SHOW_WELCOME,
    }
  },
  mounted() {
  },
  methods: {
    showScroll() {
      this.state = STATES.SHOW_SCROLL;
    },
    doStart() {
      this.$emit('start');
    }
  }
}
</script>

<style scoped>
</style>
