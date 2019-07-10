<template>
  <div class="hello">
    <div>GoodsTwo</div>
    <h1>{{ goods && goods.data && goods.data.goods.title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'GoodsTwo',
  props: {
    msg: String
  },
  data() {
    return {
      goods: ''
    }
  },
  mounted() {
      // 在projectAxios里面自动绑定数据
      this.projectAxios.getComponentThis(this);
      this.projectAxios.apitwo({dataname: 'goods'});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
