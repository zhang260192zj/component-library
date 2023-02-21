<template>
  <div id="app">
    <Calculator  @getData="getdata"/>
    <Calculator  @getData="getdata"/>
    <Calculator  @getData="getdata"/>
    <Calculator  @getData="getdata"/>
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
