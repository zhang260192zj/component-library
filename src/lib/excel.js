const ExcelJS = require('exceljs');
// 创建一个新的工作簿
export default function exportData(){
    const workbook = new ExcelJS.Workbook();

// 添加一个新的工作表
const worksheet = workbook.addWorksheet('My Sheet');

// 设置单元格的值和样式
worksheet.getCell('A1').value = 'Name';
worksheet.getCell('A1').font = { bold: true };
worksheet.getCell('B1').value = 'Age';
worksheet.getCell('B1').font = { bold: true };

worksheet.getCell('A2').value = 'John';
worksheet.getCell('B2').value = 25;

worksheet.getCell('A3').value = 'Jane';
worksheet.getCell('B3').value = 30;

// 设置单元格的格式
worksheet.getColumn('B').numFmt ='@'

// 导出Excel文件
workbook.xlsx.writeBuffer().then((buffer) => {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'my-file.xlsx';
  link.click();
});
}