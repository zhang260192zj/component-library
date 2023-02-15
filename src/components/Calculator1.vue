<template>
  <el-dialog title="计算器" width="380px" size="" :visible="visible" @close="closeDelDialog">
    <div class="calculator" style="height:360px">
        <div class="input">
          <input type="text" v-model="current">
        </div>
        <div class="two">
          <button @click="clear">C</button>
          <button @click="del"><b>←</b></button>
        </div>
        <div class="three">
          <button @click="rooting">Sqrt</button>
          <button @click="divide('/')">/</button>
          <button @click="append(9)">9</button>
          <button @click="append(8)">8</button>
          <button @click="append(7)">7</button>
        </div>
        <div class="four">
          
          <button @click="cent">1/X</button>
          <button @click="times('*')">*</button>
          <button @click="append(6)">6</button>
          <button @click="append(5)">5</button>
          <button @click="append(4)">4</button>
          
        </div>
        <div class="five">
          <button @click="percent('%')">%</button>
          <button @click="minus('-')">-</button>
          <button @click="append(3)">3</button>
          <button @click="append(2)">2</button>
          <button @click="append(1)">1</button>
         
        </div>
        <div class="six">
          <button @click="equal">=</button>
          <button @click="add('+')">+</button>
          <button @click="dot('.')">.</button>
          <button @click="sign">+/-</button>
          <button @click="append(0)">0</button>
        </div>
        <!-- <div class="seven">
          <button>取消</button>
          <button style="color:black">确定</button>
        </div> -->
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CalculatorPage',
  data () {
    return {
      previous: null,        // 前一个操作数
      current: '',             // 当前操作数
      operator: null,          // 运算函数
      operatorClicked: false ,// 是否点击了操作符
      operatorSign:''
    }
  },
  methods: {
    clear() { // 清理显示
      this.current = ''
    },
    //开方
    rooting(){
      if(this.current!=='') this.current = `${ Math.sqrt(parseFloat(this.current))}`
    },
    //1/X
    cent(){
      if(this.current!=='')  this.current = `${ 1/ parseFloat(this.current)}`
    },
    sign() { // 设置正负号
       this.current = this.current.charAt(0) === '-' ? this.current.slice(1) : `-${this.current}`
    },
    percent() { // 百分比
      if(this.current!=='')  this.current = `${parseFloat(this.current) / 100}`
    },
    append(number) { // 数字操作
      // if (this.operatorClicked) { //当已点击过操作符时将前次输入的数清空
      //   this.current = ''
      //   this.operatorClicked = false
      // }
      this.current = `${this.current}${number}`
      console.log(this.current);
    },
    dot(m) { // 点号操作
      if(this.current!=='') this.append(m)
    },
    setPrevious() {
      this.previous = this.current
      this.operatorClicked = true
    },
    divide(m) { // 除法
      // 创建一函数对象
      if(this.current!=='') {

        // this.current = this.current.split(`${this.operatorSign}`)[0] + m
        this.current = this.current + m
        this.operatorSign = m
        this.operator = (arr) => {
          let sum =arr[0]
          for (let i =1;i<arr.length-1;i++){
              sum/=arr[i]
          }
          return sum
        };
        this.setPrevious();
      }
      
    },
    times(m) { 
      // 乘法
      if(this.current!=='') {

        // this.current = this.current.split(`${this.operatorSign}`)[0] + m
        this.current = this.current + m
        this.operatorSign = m
        this.operator = (arr) => {
          let sum =1
          arr.forEach(item => {
             sum*=item
          });
          return sum
        };
        this.setPrevious();
      }
    },
    minus(m) { // 减法
      if(this.current!=='') {

        // this.current = this.current.split(`${this.operatorSign}`)[0] + m
        this.current = this.current + m
        this.operatorSign = m
        this.operator = (arr) => {
          let sum =arr[0]
          for (let i =1;i<arr.length;i++){
              sum-=arr[i]
          }
          return sum
        };
        this.setPrevious();
      }
    },
    add(m) { // 加法
      if(this.current!=='') {
        // this.current = this.current.split(`${this.operatorSign}`)[0] + m
        this.current = this.current + m
        this.operatorSign = m
        this.operator = (arr) => {
          let sum =0
          arr.forEach(item=>{
            sum+=+item
          })
          return sum
        };
        this.setPrevious()
      }
    },
    equal() { // 等号计算结果
// 执行计算，+号为快速转换成数值类型
      console.log(this.previous.split(`${this.operatorSign}`),this.current.split(`${this.operatorSign}`));
      this.current = this.operator(this.current.split(`${this.operatorSign}`))
      let num =this.current.split(`${this.operatorSign}`)
      this.calculator(num)
      this.previous = null
    },
    del(){
      let arr =this.current.split('')
      arr.pop()
      this.current = arr.join('')
      console.log(this.current.split(''));
    },
    closeDelDialog(){
      this.$emit('close')
    },
    // calculator(num){
        
    // }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
input{
  width: 100%;
  height:30px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
}
.two button{
  float: right;
  margin-right: 5px;
  width: 80px;
  height: 35px;
  font-size: 20px;
  color: #e90000;
}
.three button{
  float: right;
  margin-right: 5px;
  width: 60px;
  height: 35px;
  font-size: 20px;
}
div button:nth-child(2){
  color:#e90000;
}
.four button{
  float: right;
  margin-right: 5px;
  width: 60px;
  height: 35px;
  font-size: 20px;
}
.five button{
  float: right;
  margin-right: 5px;
  width: 60px;
  height: 35px;
  font-size: 20px;
}
.six button{
  float: right;
  margin-right: 5px;
  width: 60px;
  height: 35px;
  font-size: 20px;
}
.seven button{
  float: right;
  margin-right: 5px;
  width: 80px;
  height: 35px;
  font-size: 20px;
}
</style>
