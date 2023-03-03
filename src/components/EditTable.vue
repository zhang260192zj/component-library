<template>
  <el-table :data="tableData" :row-key="row => row.id" ref="table"  @cell-click="onCellClick" border 
      :cell-style="{padding:'0px'}" text-align="center" highlight-current-row :cell-class-name="tableCellClassName">
      <el-table-column fixed type="index" label="序号" align="center"  width="110" v-if="tableColumns.length>0">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>                
      </el-table-column>
      <template v-for="(item, index) in tableColumns">
          <el-table-column v-if="item.cType=='CheckBox'" width="110" :prop="item.fieldName" :label="item.caption" :key="index" :align="'center'">
              <template slot-scope="scope"> 
                  <input  @keyup="nextFocus(index,0,scope.$index)" :ID="'chk_s_'+scope.row.rownumber+scope.column.property"  :ref="'chk_s_'+scope.row.rownumber+scope.column.property"
                  type="checkbox"  v-model="scope.row[scope.column.property]" 
                  class="chx"  :fieldName="item.fieldName"  /> 
                 <span :fieldName="item.fieldName" :tindex="(parseInt(scope.row.index)+1)*100+index" style="display:none"></span> 
               </template>
           </el-table-column> 
           <el-table-column v-if="item.cType=='TextBox'" width="110" :prop="item.fieldName" :label="item.caption" :key="index" :align="'center'">
              <template slot-scope="scope">                
                  <Input  @keyup.enter.native="nextFocus(index,0,scope.$index)"   :ref="'etxt_s_'+item.fieldName"
                   v-model="scope.row[scope.column.property]" v-if="scope.row.rownumber===tablePara.curCellIndex&& tablePara.curCellField===scope.column.property" type="text"> </Input>
                  <span class="spantxt" v-else  :fieldName="item.fieldName" :tindex="(parseInt(scope.row.index)+1)*100+index" :title="scope.row[scope.column.property]">
                      {{scope.row[scope.column.property] | ellipsis}}
                  </span>
               </template>
           </el-table-column> 
           <el-table-column v-if="item.cType=='ComboBox'" width="110" :prop="item.fieldName" :label="item.caption" :key="index" :align="'center'">
              <template slot-scope="scope">                
                  <el-select  size="mini" style="width:110px !important" @keyup.enter.native="nextFocus(index,0,scope.$index)"   :ref="'selct_s_'+item.fieldName" v-if="scope.row.rownumber===tablePara.curCellIndex&& tablePara.curCellField===scope.column.property" type="text" :transfer="true" > </el-select>
                  <span class="spantxt" v-else  :fieldName="item.fieldName" :tindex="(parseInt(scope.row.index)+1)*100+index" :title="scope.row[scope.column.property]">
                      {{scope.row[scope.column.property] | ellipsis}}
                  </span>
               </template>
           </el-table-column> 
           <el-table-column v-if="item.cType=='NumTextBox'" width="110"  :prop="item.fieldName" :label="item.caption" :key="index" :align="'center'">
              <template slot-scope="scope">                
                  <Input  :ID="'sINM_s_'+item.fieldName" style="width:110px" :ref="'sINM_s_'+item.fieldName"  @keyup.enter.native="nextFocus(index,0,scope.$index)" :transfer="true" v-if="scope.row.rownumber===tablePara.curCellIndex&& tablePara.curCellField===scope.column.property">
                  </Input>
                  <span class="spantxt" v-else  :fieldName="item.fieldName" :tindex="(parseInt(scope.row.index)+1)*100+index" :title="scope.row[scope.column.property]">
                      {{scope.row[scope.column.property] | ellipsis}}
                  </span>
               </template>
           </el-table-column> 
           <el-table-column v-if="item.cType=='RefComboBox'" width="110" :prop="item.fieldName" :label="item.caption" :key="index" :align="'center'">
              <template slot-scope="scope">                
                  <Input   @keyup.enter.native="nextFocus(index,0,scope.$index)"  :ref="'rcomb_r_'+item.fieldName"
                   v-model="scope.row[scope.column.property]" v-if="scope.row.rownumber===tablePara.curCellIndex&& tablePara.curCellField===scope.column.property" type="text"></Input>
                  <span class="spantxt" v-else  :fieldName="item.fieldName" :tindex="(parseInt(scope.row.index)+1)*100+index" :title="scope.row[scope.column.property]">
                      {{scope.row[scope.column.property] | ellipsis}}
                  </span>    
               </template>
           </el-table-column>
           <el-table-column v-if="item.cType=='DateDropDown'"   width="110" :prop="item.fieldName" :label="item.caption" :key="index" :align="'center'">
              <template slot-scope="scope">
                  <Date-picker :ref="'dpk_s_'+item.fieldName"  @keyup.enter.native="nextFocus(index,0,scope.$index)" @on-change="dateChange"  v-model="scope.row[scope.column.property]" v-if="scope.row.rownumber===tablePara.curCellIndex && tablePara.curCellField===scope.column.property" style="width:110px;" :transfer="true" type="date" placeholder="选择日期"></Date-picker>
                  <span class="spantxt" v-else  :fieldName="item.fieldName" :tindex="(parseInt(scope.row.index)+1)*100+index" :title="scope.row[scope.column.property]">
                      <!-- {{scope.row[scope.column.property]|| ellipsis}} -->
                      {{scope.row[scope.column.property]?changeTimeFormat(scope.row[scope.column.property]):scope.row[scope.column.property]|| ellipsis}}
                  </span>
               </template>
           </el-table-column>
    </template>           
   </el-table>  
</template>

<script>
export default {
name:'EditTable',
data() {
  return {
      tablePara:{
          loading: false,
          height: 0,
          HoverIndex: -1,
          readRowIndex:-1,
          readColField: "",
          curCellIndex:null,
          curCellField: "",
          triggerBlur:true,
          widgetID: "",
          widget: "",
          ///当前编辑的table数据
          ndata:{},
          Rows: [],
          TableCols: [],
          coderule:{"prefixion":"","serialNum": "01","code":"01" },
          dpAttr: {},
          refAttr: {},
          notFields: "",
          enumFields: "",
          enumArr:[],
          toolsShow:false           
      },
      tableData:[
    {
        "rownumber": 1,
        "code": "0100001",
        "name": "李芊",
        "shorthand": "LQ",
        "id_position": 315,
        "isSalesman": false,
        "isNavigator": false,
        "creditDate": null,
        "creditQty": null,
        "aRBalance": null,
        "aPBalance": null,
        "birthday": "1991-02-05",
        "id_gender": 99,
        "nativePlace": "安徽省合肥市",
        "id_education": 105,
        "id_identificationType": 108,
        "identityNo": "",
        "officePhoneNo": "",
        "familyPhoneNo": "",
        "mobilePhoneNo": "13866312548",
        "emailAddr": "",
        "qqcode": "",
        "msnAddr": "",
        "webChartNo": "",
        "postAddr": "",
        "disabled": false,
        "ID": 2,
        "position": "科员",
        "gender": "女",
        "education": "本科",
        "identificationType": "身份证"
    },
    {
        "rownumber": 2,
        "code": "0100002",
        "name": "张斌",
        "shorthand": "ZB",
        "id_position": 315,
        "isSalesman": false,
        "isNavigator": false,
        "creditDate": null,
        "creditQty": null,
        "aRBalance": null,
        "aPBalance": null,
        "birthday": "1989-06-07",
        "id_gender": 100,
        "nativePlace": "江苏南京市",
        "id_education": 105,
        "id_identificationType": 108,
        "identityNo": "250102198503210055",
        "officePhoneNo": "",
        "familyPhoneNo": "",
        "mobilePhoneNo": "13359152738",
        "emailAddr": "",
        "qqcode": "",
        "msnAddr": "",
        "webChartNo": "",
        "postAddr": "",
        "disabled": false,
        "ID": 3,
        "position": "科员",
        "gender": "男",
        "education": "本科",
        "identificationType": "身份证"
    },
    {
        "rownumber": 3,
        "code": "0100003",
        "name": "王菲",
        "shorthand": "WF",
        "id_position": 315,
        "isSalesman": false,
        "isNavigator": false,
        "creditDate": null,
        "creditQty": null,
        "aRBalance": null,
        "aPBalance": null,
        "birthday": "1999-06-15",
        "id_gender": 99,
        "nativePlace": "",
        "id_education": 105,
        "id_identificationType": 108,
        "identityNo": "",
        "officePhoneNo": "",
        "familyPhoneNo": "",
        "mobilePhoneNo": "",
        "emailAddr": "",
        "qqcode": "",
        "msnAddr": "",
        "webChartNo": "",
        "postAddr": "",
        "disabled": false,
        "ID": 4,
        "position": "科员",
        "gender": "女",
        "education": "本科",
        "identificationType": "身份证"
    },
    {
        "rownumber": 4,
        "code": "0100004",
        "name": "李霞",
        "shorthand": "LX",
        "id_position": 97,
        "isSalesman": false,
        "isNavigator": false,
        "creditDate": null,
        "creditQty": null,
        "aRBalance": null,
        "aPBalance": null,
        "birthday": null,
        "id_gender": 99,
        "nativePlace": "",
        "id_education": 105,
        "id_identificationType": 0,
        "identityNo": "",
        "officePhoneNo": "",
        "familyPhoneNo": "",
        "mobilePhoneNo": "",
        "emailAddr": "",
        "qqcode": "",
        "msnAddr": "",
        "webChartNo": "",
        "postAddr": "",
        "disabled": false,
        "ID": 5,
        "position": "经理",
        "gender": "女",
        "education": "本科",
        "identificationType": null
    },
    {
        "rownumber": 5,
        "code": "0100005",
        "name": "测试",
        "shorthand": "CS",
        "id_position": 315,
        "isSalesman": true,
        "isNavigator": true,
        "creditDate": null,
        "creditQty": null,
        "aRBalance": null,
        "aPBalance": null,
        "birthday": "1974-01-18",
        "id_gender": 100,
        "nativePlace": "",
        "id_education": 0,
        "id_identificationType": 0,
        "identityNo": "",
        "officePhoneNo": "",
        "familyPhoneNo": "",
        "mobilePhoneNo": "13329152738",
        "emailAddr": "",
        "qqcode": "",
        "msnAddr": "",
        "webChartNo": "",
        "postAddr": "",
        "disabled": false,
        "ID": 14,
        "position": "科员",
        "gender": "男",
        "education": null,
        "identificationType": null
    }
],
     tableColumns: [
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 90,
      "fieldName": "code",
      "fieldType": "String",
      "caption": "员工编码",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": true,
      "uniqueType": null,
      "maxLength": 40,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 91,
      "fieldName": "name",
      "fieldType": "String",
      "caption": "员工名称",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 50,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 92,
      "fieldName": "shortHand",
      "fieldType": "String",
      "caption": "拼音码",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 50,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 94,
      "fieldName": "department_Name",
      "fieldType": "DTO",
      "caption": "上级部门",
      "visibility": true,
      "idCType": 45,
      "cType": "RefComboBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 50,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": "BA_Department",
      "widget": "department",
      "widField": "name",
      "fromWidget": "person",
      "fromField": "idDepartment",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 104,
      "fieldName": "position",
      "fieldType": "Enum",
      "caption": "职位",
      "visibility": true,
      "idCType": 44,
      "cType": "ComboBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 105,
      "fieldName": "isSalesman",
      "fieldType": "Bool",
      "caption": "业务员",
      "visibility": true,
      "idCType": 41,
      "cType": "CheckBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 106,
      "fieldName": "isNavigator",
      "fieldType": "Bool",
      "caption": "导购员",
      "visibility": true,
      "idCType": 41,
      "cType": "CheckBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 107,
      "fieldName": "creditDate",
      "fieldType": "Int",
      "caption": "信用天数",
      "visibility": true,
      "idCType": 61,
      "cType": "NumTextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 108,
      "fieldName": "creditQty",
      "fieldType": "Decimal",
      "caption": "信用额度",
      "visibility": true,
      "idCType": 61,
      "cType": "NumTextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 13,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 109,
      "fieldName": "aRBalance",
      "fieldType": "Decimal",
      "caption": "应收余额",
      "visibility": true,
      "idCType": 61,
      "cType": "NumTextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 13,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 110,
      "fieldName": "aPBalance",
      "fieldType": "Decimal",
      "caption": "应付余额",
      "visibility": true,
      "idCType": 61,
      "cType": "NumTextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 13,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 2,
      "idField": 122,
      "fieldName": "disabled",
      "fieldType": "Bool",
      "caption": "停用",
      "visibility": true,
      "idCType": 41,
      "cType": "CheckBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 0,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 111,
      "fieldName": "birthday",
      "fieldType": "DateTime",
      "caption": "出生日期",
      "visibility": true,
      "idCType": 42,
      "cType": "DateDropDown",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 112,
      "fieldName": "gender",
      "fieldType": "Enum",
      "caption": "性别",
      "visibility": true,
      "idCType": 44,
      "cType": "ComboBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 113,
      "fieldName": "nativePlace",
      "fieldType": "String",
      "caption": "籍贯",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 50,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 114,
      "fieldName": "education",
      "fieldType": "Enum",
      "caption": "学历",
      "visibility": true,
      "idCType": 44,
      "cType": "ComboBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 115,
      "fieldName": "identificationType",
      "fieldType": "Enum",
      "caption": "证件类型",
      "visibility": true,
      "idCType": 44,
      "cType": "ComboBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 0,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 116,
      "fieldName": "identityNo",
      "fieldType": "String",
      "caption": "证件号码",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 80,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 117,
      "fieldName": "officePhoneNo",
      "fieldType": "String",
      "caption": "办公电话",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 50,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 118,
      "fieldName": "mobilePhoneNo",
      "fieldType": "String",
      "caption": "手机号码",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 50,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 119,
      "fieldName": "qqcode",
      "fieldType": "String",
      "caption": "QQ号",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 30,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 120,
      "fieldName": "webChartNo",
      "fieldType": "String",
      "caption": "微信号",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 50,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      "tabSource": 2,
      "idTab": 3,
      "idField": 121,
      "fieldName": "address",
      "fieldType": "String",
      "caption": "地址",
      "visibility": true,
      "idCType": 40,
      "cType": "TextBox",
      "addROnly": false,
      "editROnly": false,
      "width": 220,
      "allowNull": true,
      "uniquely": false,
      "uniqueType": null,
      "maxLength": 200,
      "isRecord": false,
      "lbWidth": 105,
      "left": 0,
      "top": 0,
      "dtoTb": null,
      "widget": "0",
      "widField": "",
      "fromWidget": "",
      "fromField": "",
      "isPrimary": false,
      "isEnum": false,
      "isSys": false,
      "defaultVal": ""
  },
  {
      
  }
],
  }
},
filters: {
    ellipsis: function (value, limit) {
        if (!value)
            return "";
        if (value.length > limit) {
            return value.slice(0, limit) + "...";
        }
        return value;
    }
},
methods:{
  tableCellClassName(obj){
      obj.row.index = obj.rowIndex;
      obj.column.index = obj.columnIndex;
    },
  nextFocus(index,kind,row){
      let nextColumns;
      nextColumns=this.tableColumns[index+1];
      console.log(this.tableColumns.length);
      console.log(index,kind,row+1);
      console.log(this.tableColumns[index].fieldName);
      this.tablePara.curCellIndex = row+1;
      this.tablePara.curCellField = this.tableColumns[index+1].fieldName;
      if(this.tableColumns.length==index+2){
          this.tablePara.curCellIndex = row+2;
          this.tablePara.curCellField = this.tableColumns[0].fieldName;
          nextColumns=this.tableColumns[0];
     }
      console.log(nextColumns);
      this.$nextTick(async ()=>{
          // if(",TextBox,RefComboBox,RefTextBox,MulRefTextBox,ComboBox,NumTextBox,DateDropDown,".indexOf(","+nextColumns.cType+",")>-1){
              if(nextColumns.cType=="NumTextBox"){
                      this.$refs['sINM_s_'+nextColumns.fieldName][0].focus();
                      document.querySelector("#sINM_s_"+nextColumns.fieldName+" .ivu-input-number-input").select();
              }else if(nextColumns.cType==="DateDropDown"){
                      this.$refs['dpk_s_'+nextColumns.fieldName][0].focus();
                      document.querySelector("#dpk_s_"+nextColumns.fieldName+" .ivu-input").select();
              }else if(nextColumns.cType==="TextBox"){
                      console.log(111);
                      console.log(this.$refs['etxt_s_'+nextColumns.fieldName]);
                      this.$refs['etxt_s_'+nextColumns.fieldName][0].focus();
                      document.querySelector("#etxt_s_"+nextColumns.fieldName+" .ivu-input").select();
              }else if(nextColumns.cType==="RefComboBox"){
                      this.$refs['rcomb_r_'+nextColumns.fieldName][0].focus();
                      document.querySelector("#rcomb_r_"+nextColumns.fieldName+" .ivu-input").select();
              }
              else if(nextColumns.cType==="ComboBox"){
                      this.$refs['selct_s_'+nextColumns.fieldName][0].focus();
                      document.querySelector("#selct_s_"+nextColumns.fieldName+" .el-input__inner").select();
              }
  //    }
              else if(nextColumns.cType=="CheckBox"){
                  console.log(this.$refs['chk_s_'+`${row+1}`+this.tableColumns[index+1].fieldName][0]);
                  this.$refs['chk_s_'+`${row+1}`+this.tableColumns[index+1].fieldName][0].focus();
                  document.querySelector("#chk_s_"+`${row+1}`+this.tableColumns[index+1].fieldName).select();
              }
      })
  },
  //显示弹出窗体
  changeTimeFormat (str) {
          if ((str + '').indexOf('-') != -1) {
          str = str.replace(new RegExp(/-/gm), '/')
          }
          let d = new Date(str)
          let newDateYear = d.getFullYear()
          let newDateMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
          let newDateDay = d.getDate() + '' < 10 ? '0' + d.getDate() + '' : d.getDate() + ''
          return newDateYear + '-' + newDateMonth + '-' + newDateDay
  },
  onCellClick(row, column,cell){
      console.log(row.rownumber, column.property)
      this.tablePara.curCellIndex = row.rownumber;
      this.tablePara.curCellField = column.property;
      this.$nextTick(()=>{
          const input = cell.querySelector('input')
          input.focus()
          console.log(input);
      })
  }
},
mounted(){
  
},
components: {
  
},
}
</script>

<style scoped>

.el-button {
width: 60px;            
margin: 3px 0px 3px 5px;
}
.lbtxt {
text-align:right !important;
width:105px !important;
height: 22px !important;
line-height: 22px !important;
left:0px !important;       
position:relative !important;  
}
.div_TabHead .el-input__inner{
  height: 24px;
  line-height: 24px;
}
.el-input-number--mini {
line-height: 26px;
height: 26px;
}
input, textarea {
box-sizing: border-box;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
}
.el-carousel__container{
height: 220px !important;
}
.el-upload {
width:24px;
height:24px;        
}

.el-table /deep/ .cell {
  width: 110px;
  height: 32px;
  padding: 0;
  line-height: 31px;
}
.el-table /deep/ .el-table__cell{
  padding: 0;
}

.el-icon-upload {
font-size: 67px;
color: #409eff;
margin:7px 5px 5px 25px;
line-height: 50px;
}
.el-upload-list__item-name,.el-upload-list__item-status-label{
display:none !important;   
}
.queryBox .el-upload{
width:100%;
}
.replace-img-button span{        
display: block;
border: 1px solid #ccc;
margin: 0px 14px;         
}       

</style>