<template>
  <div class="hello">
    <div>GoodsOne</div>
    <button @click="reqApiOne">请求</button>
    <h1>{{ goods.title }}</h1>
  </div>
</template>

<script>
export default {
  name: "GoodsOne",
  props: {
    msg: String
  },
  data() {
    return {
      goods: ""
    };
  },
  mounted() {
    // 不在projectAxios里面做数据自动绑定
    // this.projectAxios.getComponentThis(this);
    this.projectAxios.apione({
      dataname: "helloWorld",
      success: res => {
        this.goods = res && res.data && res.data.goods;
      }
    });
  },
  methods: {
    reqApiOne() {
      this.projectAxios.apione({
        dataname: "helloWorld",
        success: res => {
          this.goods = res && res.data && res.data.goods;
        }
      });
    }
  }
};
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
