const table=[
  {
      "idSolution": 1,
      "idField": 85,
      "fieldName": "code",
      "caption": "部门编码",
      "visibility": true,
      "width": 90,
      "asComSearchField": true,
      "sortable": true,
      "fixed": false,
      "decimalDigits": 0,
      "isTotal": false,
      "align": "",
      "negShowRed": false,
      "isMergeCol": false,
      "format": "",
      "needSum": false,
      "idLevel": 12,
      "wfieldtype": "String",
      "fromWidget": "",
      "fromField": "",
      "dtoTb": "",
      "widget": null,
      "widField": "",
      "IsPrimary": false,
      "IsEnum": false,
      "IsSys": false,
      "orderModel": null,
      "showIndex": 1
  },
  {
      "idSolution": 1,
      "idField": 86,
      "fieldName": "name",
      "caption": "部门名称",
      "visibility": true,
      "width": 90,
      "asComSearchField": true,
      "sortable": true,
      "fixed": false,
      "decimalDigits": 0,
      "isTotal": false,
      "align": "",
      "negShowRed": false,
      "isMergeCol": false,
      "format": "",
      "needSum": false,
      "idLevel": 12,
      "wfieldtype": "String",
      "fromWidget": "",
      "fromField": "",
      "dtoTb": "",
      "widget": null,
      "widField": "",
      "IsPrimary": false,
      "IsEnum": false,
      "IsSys": false,
      "orderModel": null,
      "showIndex": 2
  },
  {
      "idSolution": 1,
      "idField": 88,
      "fieldName": "department_Name",
      "caption": "上级部门",
      "visibility": true,
      "width": 90,
      "asComSearchField": false,
      "sortable": true,
      "fixed": false,
      "decimalDigits": 0,
      "isTotal": false,
      "align": "",
      "negShowRed": false,
      "isMergeCol": false,
      "format": "",
      "needSum": false,
      "idLevel": 13,
      "wfieldtype": "DTO",
      "fromWidget": "department",
      "fromField": "idparent",
      "dtoTb": "94D9B8B99FB1D18FCB2ABB5BAB8D32B8",
      "widget": "department",
      "widField": "name",
      "IsPrimary": false,
      "IsEnum": false,
      "IsSys": false,
      "orderModel": null,
      "showIndex": 4
  },
  {
      "idSolution": 1,
      "idField": 96,
      "fieldName": "person_Name",
      "caption": "负责人",
      "visibility": true,
      "width": 90,
      "asComSearchField": false,
      "sortable": true,
      "fixed": false,
      "decimalDigits": 0,
      "isTotal": false,
      "align": "",
      "negShowRed": false,
      "isMergeCol": false,
      "format": "",
      "needSum": false,
      "idLevel": 13,
      "wfieldtype": "DTO",
      "fromWidget": "department",
      "fromField": "idPerson",
      "dtoTb": "2C434F50F11799603993BDDA9128DEDE",
      "widget": "person",
      "widField": "name",
      "IsPrimary": false,
      "IsEnum": false,
      "IsSys": false,
      "orderModel": null,
      "showIndex": 6
  },
  {
      "idSolution": 1,
      "idField": 97,
      "fieldName": "disabled",
      "caption": "停用",
      "visibility": true,
      "width": 90,
      "asComSearchField": false,
      "sortable": true,
      "fixed": false,
      "decimalDigits": 0,
      "isTotal": false,
      "align": "",
      "negShowRed": false,
      "isMergeCol": false,
      "format": "",
      "needSum": false,
      "idLevel": 12,
      "wfieldtype": "Bool",
      "fromWidget": "",
      "fromField": "",
      "dtoTb": "",
      "widget": null,
      "widField": "",
      "IsPrimary": false,
      "IsEnum": false,
      "IsSys": false,
      "orderModel": null,
      "showIndex": 7
  }
]

const data=[
    {
        "rownumber": 1,
        "code": "001",
        "name": "财务部",
        "idparent": 0,
        "idPerson": null,
        "disabled": false,
        "grade": 1,
        "endGrade": false,
        "madeDate": "2023-03-03T23:02:16.47",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 1,
        "department_Name": null,
        "person_Name": null
    },
    {
        "rownumber": 2,
        "code": "001001",
        "name": "财务一处",
        "idparent": 1,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:22:07.713",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 4,
        "department_Name": "财务部",
        "person_Name": null
    },
    {
        "rownumber": 3,
        "code": "001002",
        "name": "财务二处",
        "idparent": 1,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:22:32.44",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 5,
        "department_Name": "财务部",
        "person_Name": null
    },
    {
        "rownumber": 4,
        "code": "001003",
        "name": "财务三处",
        "idparent": 1,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:22:56.003",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 6,
        "department_Name": "财务部",
        "person_Name": null
    },
    {
        "rownumber": 5,
        "code": "002",
        "name": "技术部",
        "idparent": 0,
        "idPerson": null,
        "disabled": false,
        "grade": 1,
        "endGrade": false,
        "madeDate": "2023-03-03T23:02:26.55",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 2,
        "department_Name": null,
        "person_Name": null
    },
    {
        "rownumber": 6,
        "code": "002001",
        "name": "技术一处",
        "idparent": 2,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:23:11.913",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 7,
        "department_Name": "技术部",
        "person_Name": null
    },
    {
        "rownumber": 7,
        "code": "002002",
        "name": "技术二处",
        "idparent": 2,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:23:22.58",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 8,
        "department_Name": "技术部",
        "person_Name": null
    },
    {
        "rownumber": 8,
        "code": "002003",
        "name": "技术三处",
        "idparent": 2,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:23:30.167",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 9,
        "department_Name": "技术部",
        "person_Name": null
    },
    {
        "rownumber": 9,
        "code": "003",
        "name": "设备部",
        "idparent": 0,
        "idPerson": null,
        "disabled": false,
        "grade": 1,
        "endGrade": false,
        "madeDate": "2023-03-03T23:02:32.52",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 3,
        "department_Name": null,
        "person_Name": null
    },
    {
        "rownumber": 10,
        "code": "003001",
        "name": "设备一处",
        "idparent": 3,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:23:45.847",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 10,
        "department_Name": "设备部",
        "person_Name": null
    },
    {
        "rownumber": 11,
        "code": "003002",
        "name": "设备二处",
        "idparent": 3,
        "idPerson": null,
        "disabled": false,
        "grade": 2,
        "endGrade": true,
        "madeDate": "2023-03-03T23:23:56.563",
        "madeBy": 1,
        "updateDate": null,
        "updateBy": null,
        "ID": 11,
        "department_Name": "设备部",
        "person_Name": null
    }
]
function header(){
  let arr= []
  table.forEach(item=>{
      arr.push({header:item.caption})
  })
  console.log(arr);
  return arr
}
header()
function allData(){
    let arr=data.map(item=>{
        let obj = [
          item.code,
          item.name,
          item.department_Name,
          item.idPerson,
          item.disabled?'是' : '否',
        ]
        return obj
    })
    console.log(data);
    return arr
}
allData()
const ExcelJS = require('exceljs');
// 创建一个新的工作簿
export default function exportData(){
    const workbook = new ExcelJS.Workbook();

// 添加一个新的工作表
const worksheet = workbook.addWorksheet('My Sheet');

worksheet.columns =  header()
// 设置单元格的值和样式
 worksheet.addRows(allData());
// 设置单元格的格式
worksheet.getColumn('A').numFmt ='@'

// table.forEach(item=>{
//   if(item.wfieldtype =='Bool'){
  worksheet.getColumn(header().length).eachCell((cell, rowNumber) => {
    if (rowNumber > 1) {
      cell.dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"是,否"']
      };
    }
  });
//   }
// })
// 导出Excel文件
workbook.xlsx.writeBuffer().then((buffer) => {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'my-file.xlsx';
  link.click();
});
}