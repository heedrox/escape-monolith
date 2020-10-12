<template>
  <div>
    <p>Escape del</p>
    <h1>Monolito</h1>
    <a class="start" href="#" @click="$emit('start')">Empezar</a>
  </div>
</template>
<style scoped>
  p {
    padding-top: 10vh;
    font-size: 3em;
    color: white;
  }

  h1 {
    padding-top: 2vh;
    font-size: 8em;
    color: #ff6c7a;
  }

  a.start {
    font-family:'SpaceJunk', Arial, Helvetica,serif;
    display: block;
    font-size: 4em;
    color: #8efc80;
    text-decoration: underline;
    position: absolute;
    bottom: 5vh;
    text-align: center;
    width:100%;
  }
</style>
<script>
export default {
  name: 'WelcomeTitle',
  emits: ['start'],
}
</script>
