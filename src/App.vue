<template>
  <div id="app">
    <Calculator/>
    <Calculator/>
    <Calculator/>
    <Calculator/>
    <EditTable></EditTable>
  </div>
</template>

<script>
import Calculator from './components/Calculator.vue'
import EditTable from './components/EditTable.vue'

export default {
  name: 'App',
  data(){
    return{
      start:0
    }
  },
  components: {
    Calculator,
    EditTable
  },
  methods:{
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
