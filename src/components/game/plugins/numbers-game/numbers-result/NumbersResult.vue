<template>
  <div>
    <div class="door-open-msg">
      :)
    </div>
    <img class="theplanet" :src="`${publicPath}game/4/mundo-pista.png`">
  </div>
</template>
<style>
.door-open-msg {
  position:fixed;
  color:#8efc80;
  font-size:5vh;
  top:40vh;
  width:80vw;
}
.theplanet {
  max-width:10vh;
  max-height:10vh;
  position:fixed;
  top:15vh;
  left:15vw;
  opacity: 0.4;
}
</style>
<script>
export default {
  name: 'NumbersResult',
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>
