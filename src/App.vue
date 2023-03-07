<template>
  <div id="app">
    <!-- <Calculator/>
    <Calculator/>
    <Calculator/>
    <Calculator/>
    <EditTable></EditTable> -->
    <button @click="excel">导出</button>
  </div>
</template>

<script>
// import Calculator from './components/Calculator.vue'
// import EditTable from './components/EditTable.vue'
import exportData from '@/lib/excel'
export default {
  name: 'App',
  data(){
    return{
      start:0
    }
  },
  components: {
    // Calculator,
    // EditTable
  },
  methods:{
   excel(){
    exportData()
   }
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
