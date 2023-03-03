<template>
  <!-- <el-dialog width="380px" size="" :visible="visible" @close="closeDelDialog"> -->
    <Dropdown trigger="custom"  :transfer="transfer" :visible="visible" style="z-index:99999" >
      <Input v-model="start"   @click.native="handleOpen"  icon="ios-calculator"  style="`width: ${width}px`"></Input>
      <Dropdown-menu slot="list"  style="width:200px;height:230px;">
        <div class="calculator"  style="height:220px;" >
          <div class="input">
            <input type="text" v-model="equation">
          </div>
          <div class="two">
            <button @click="clear">C</button>
            <button @click="del"><b>←</b></button>
          </div>
          <div class="three">
            <button @click="rooting">Sqrt</button>
            <button @click="append('/')">/</button>
            <button @click="append(9)">9</button>
            <button @click="append(8)">8</button>
            <button @click="append(7)">7</button>
          </div>
          <div class="four">
            
            <button @click="cent">1/X</button>
            <button @click="append('x')">*</button>
            <button @click="append(6)">6</button>
            <button @click="append(5)">5</button>
            <button @click="append(4)">4</button>
            
          </div>
          <div class="five">
            <button @click="calculatePercentage">%</button>
            <button @click="append('-')">-</button>
            <button @click="append(3)">3</button>
            <button @click="append(2)">2</button>
            <button @click="append(1)">1</button>
           
          </div>
          <div class="six">
            <button @click="calculate">=</button>
            <button @click="append('+')">+</button>
            <button @click="append('.')">.</button>
            <button @click="calculateToggle">+/-</button>
            <button @click="append(0)">0</button>
          </div>
          <div class="seven">
            <button @click="cancel">取消</button>
            <button @click="ok" style="color:black">确定</button>
          </div>
      </div>
      </Dropdown-menu>
  </Dropdown>
    <!-- <Modal
     style="position:fixed;z-index:99999"
      :closable="false"
      v-model="delModal"
      width="230px">
      
  </Modal> -->
    
  <!-- </el-dialog> -->
</template>

<script>
export default {
  name: 'CalculatorPage',
  props:{
    width: {
     type: Number,
     default: 115
    },
    transfer: {
     type: Boolean,
     default: false
    }
  },
  data () {
    return {
      show:false,
      start:0,
      visible: false,
      delModal: false,
      params: '',
      equation: '0',
      isDecimalAdded: false,
      isOperatorAdded: false,
      isStarted: false,
    }
  },
  methods: {
    handleOpen () {
                this.visible = true;
            },
    del(){
      const arr = this.equation.split('')
      arr.pop()
      this.equation=arr.join('')
      console.log(this.equation);
    },
    //开方
    rooting(){
      if (this.isOperatorAdded || !this.isStarted) {
      return
    }
    
    this.equation = Math.sqrt(this.equation)
    // this.calculate()
    },
    //1/X
    cent(){
      if (this.isOperatorAdded || !this.isStarted) {
      return
    }
    this.equation = 1/this.equation 
    // this.calculate()
    },
  // Check if the character is + / - / × / ÷
  isOperator(character) {
    return ['+', '-', 'x', '÷'].indexOf(character) > -1
  },
  // When pressed Operators or Numbers
  append(character) {
    // Start
    if (this.equation === '0' && !this.isOperator(character)) {
      if (character === '.') {
        this.equation += '' + character
        this.isDecimalAdded = true
      } else {
        this.equation = '' + character
      }
      
      this.isStarted = true
      return
    }
    
    // If Number
    if (!this.isOperator(character)) {
      if (character === '.' && this.isDecimalAdded) {
        return
      }
      
      if (character === '.') {
        this.isDecimalAdded = true
        this.isOperatorAdded = true
      } else {
        this.isOperatorAdded = false
      }
      
      this.equation += '' + character
    }
    
    // Added Operator
    if (this.isOperator(character) && !this.isOperatorAdded) {
      this.equation += '' + character
      this.isDecimalAdded = false
      this.isOperatorAdded = true
    }
  },
  // When pressed '='
  calculate() {
    let result = this.equation.replace(new RegExp('x', 'g'), '*').replace(new RegExp('÷', 'g'), '/')
    console.log(eval(result));
    this.equation = parseFloat(eval(result).toFixed(9)).toString()
    
    this.isDecimalAdded = false
    this.isOperatorAdded = false
  },
  // When pressed '+/-'
  calculateToggle() {
    if (this.isOperatorAdded || !this.isStarted) {
      return
    }
    
    this.equation = this.equation + '* -1'
    this.calculate()
  },
  // When pressed '%'
  calculatePercentage() {
    if (this.isOperatorAdded || !this.isStarted) {
      return
    }
    
    this.equation = this.equation + '* 0.01'
    this.calculate()
  },
  // When pressed 'AC'
  clear() {
    this.equation = '0'
    this.isDecimalAdded = false
    this.isOperatorAdded = false
    this.isStarted = false
  },
  // open (params) {
  //   this.delModal = !this.delModal
  //   this.params = params
  // },
  ok () {
      // this.$Message.info('点击了确定');
      this.calculate()
      if(this.show==false) this.start=this.equation
      this.equation = '0'
      this.visible = false;
     },
  cancel () {
      this.equation = '0'
      this.visible = false;
     }
},
  // props: {
  //   visible: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
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
  height:20px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
}
.two button{
  float: right;
  margin-right: 5px;
  width: 30px;
  height: 25px;
  font-size: 13px;
  color: #e90000;
}
.three button{
  float: right;
  margin-right: 5px;
  width: 30px;
  height: 25px;
  font-size: 13px;
}
div button:nth-child(2){
  color:#e90000;
}
.four button{
  float: right;
  margin-right: 5px;
  width: 30px;
  height: 25px;
  font-size: 13px;
}
.five button{
  float: right;
  margin-right: 5px;
  width: 30px;
  height: 25px;
  font-size: 13px;
}
.six button{
  float: right;
  margin-right: 5px;
  width: 30px;
  height: 25px;
  font-size: 13px;
}
.seven button{
  float: right;
  margin-right: 5px;
  width: 30px;
  height: 25px;
  font-size: 13px;
  line-height: 10px;
}
.seven button{
  float: right;
  margin-right: 15px;
  width: 40px;
  height: 20px;
  font-size: 14px;
  line-height: 10px;
}
</style>
