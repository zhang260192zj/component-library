<template>
  <div id="app">
    <input type="text" v-model="start" >
    <Calculator ref="commentDelRef"  @getData="getdata"/>
    <br>
    <button @click="doDel">计算器</button>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'App',
  data(){
    return{
      start:0
    }
  },
  components: {
    Calculator
  },
  methods:{
    doDel (params) {
      this.$refs.commentDelRef.open(params)
    },
    getdata(val) {
    this.start = val
},
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
