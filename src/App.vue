<template>
  <div id="app">
    <GoodsOne />
    <GoodsTwo />
  </div>
</template>

<script>
import GoodsOne from './components/goodsOne.vue'
import GoodsTwo from './components/goodsTwo.vue'

export default {
  name: 'app',
  components: {
    GoodsOne,
    GoodsTwo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
