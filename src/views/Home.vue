<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>This is home page</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem')
  },
  beforeCreate() {
    if (this.$ssrContext) {
      this.$ssrContext.title = '首页'
    }
  },
  mounted() {
    this.$store.dispatch('fetchItem')
  },
  components: {
    
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    msg () {
      return this.$store.state.msg;
    }
  }
}
</script>
