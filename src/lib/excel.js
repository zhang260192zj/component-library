const ExcelJS = require('exceljs');
// 创建一个新的工作簿
const ExcelJS = require('exceljs');

function matchLetter(num) {
  const letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 检查 num 是否为数字
  if (typeof num !== 'number') {
    return 'Please enter a valid number';
  }

  // 检查 num 是否在 0-25 范围内
  if (num < 0 || num > 25) {
    return 'Please enter a number between 0 and 25';
  }

  // 返回对应的字母
  return letterArray[num];
}

// 创建一个新的工作簿
console.log(ExcelJS);

export function exportData(header, allData, excelName, table, list, sheetName, title) {
  console.log(header, table);
  const workbook = new ExcelJS.Workbook();
  console.log(table);
  table.forEach((element, i) => {

    // 添加一个新的工作表
    const worksheet = workbook.addWorksheet(`${sheetName}${i}`);
    worksheet.columns = header[i]
    // 设置单元格的值和样式
    worksheet.addRows(allData);
    // 设置单元格的格式
    console.log(title);
    if (title) {
      worksheet.spliceRows(1, 0, []);
      worksheet.mergeCells(`${matchLetter(0)+'1'}:${matchLetter(element.length-1)+'1'}`);
      worksheet.getCell('A1').value = `${title}`;
      worksheet.getRow(1).height = 30;
      worksheet.getRow(1).eachCell((cell) => {
        cell.note = 'FirstRowTip'
        cell.font = {
          color: {
            argb: 'FFFF0000'
          }
        }
      });
      worksheet.getRow(1).alignment = {
        vertical: 'middle'
      };
      const headerStyle = {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: 'FFC0C0C0'
          }
        }
      };
      worksheet.getRow(2).eachCell((cell) => {
        cell.fill = headerStyle.fill;
        cell.font = {
          bold: true
        }
      });
    } else {
      const headerStyle = {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {
            argb: 'FFC0C0C0'
          }
        }
      };
      worksheet.getRow(1).eachCell((cell) => {
        cell.fill = headerStyle.fill;
        cell.font = {
          bold: true
        }
      });
    }
    console.log(element);
    element.forEach((item, index) => {
      let nums = 1
      if (title) {
        nums = 2
        worksheet.getCell(matchLetter(index) + "2").note = item.fieldName
        if (allData.length == 0) {
          let sign = matchLetter(index) + '3'
          console.log(sign);
          worksheet.getCell(sign).value = ' '

          if (item.allowNull == false) {
            worksheet.getCell(matchLetter(index) + '2').font = {
              color: {
                argb: 'FFFF0000'
              },
            };
          }
          worksheet.duplicateRow(3, 3665, false);
        }
      } else {
        nums = 1
        worksheet.getCell(matchLetter(index) + "1").note = item.fieldName
        if (allData.length == 0) {
          let sign = matchLetter(index) + '2'
          console.log(sign);
          worksheet.getCell(sign).value = ' '
          if (item.allowNull == false) {
            worksheet.getCell(matchLetter(index) + '1').font = {
              color: {
                argb: 'FFFF0000'
              },
            };
          }
          worksheet.duplicateRow(2, 3665, false);
        }
      }
      worksheet.getColumn(index + 1).eachCell(function (cell, rowNumber) {
        if (rowNumber > nums) {
          if (item.maxLength != 0) {
            cell.dataValidation = {
              type: 'textLength',
              operator: 'lessThan',
              allowBlank: true,
              showInputMessage: true,
              formulae: [`${item.maxLength}`],
              promptTitle: '录入说明',
              prompt: `${item.maxLength}字符`
            };
          }
        }
      })
      if (item.fieldType == 'Bool') {
        worksheet.getColumn(index + 1).eachCell(function (cell, rowNumber) {
          if (rowNumber > nums) {
            cell.dataValidation = {
              type: 'list',
              allowBlank: true,
              showInputMessage: true,
              formulae: ['"0,1"'],
              promptTitle: '录入说明',
              prompt: '0-否 1-是'
            };
          }
        })
      } else if (item.fieldType == 'String') {
        worksheet.getColumn(index + 1).numFmt = '@'
      } else if (item.fieldType == 'Number') {
        worksheet.getColumn(index + 1).numFmt = '0'
      } else if (item.fieldType == 'DateTime') {
        worksheet.getColumn(index + 1).numFmt = 'yyyy-mm-dd'
        worksheet.getColumn(index + 1).eachCell(function (cell, rowNumber) {
          if (rowNumber > nums) {
            cell.dataValidation = {
              type: 'custom',
              allowBlank: true,
              showInputMessage: true,
              formulae: [],
              promptTitle: '录入说明',
              prompt: '请输入日期类型             XXXX-XX-XX'
            };
          }
        })
      } else if (item.fieldType == 'Int') {
        worksheet.getColumn(index + 1).eachCell(function (cell, rowNumber) {
          if (rowNumber > nums) {
            cell.dataValidation = {
              type: 'custom',
              allowBlank: true,
              showInputMessage: true,
              formulae: [],
              promptTitle: '录入说明',
              prompt: '数字项 范围   -9999~99999'
            };
          }
        })
      } else if (item.fieldType == 'Decimal') {
        worksheet.getColumn(index + 1).eachCell(function (cell, rowNumber) {
          if (rowNumber > nums) {
            cell.dataValidation = {
              type: 'custom',
              allowBlank: true,
              showInputMessage: true,
              formulae: [],
              promptTitle: '录入说明',
              prompt: '数字项 范围 -9999999999.99~9999999999.99',
            };
          }
        })
      } else if (item.fieldType == 'Enum') {
        if (list.length != 0) {
          console.log(list);
          let arr = []
          let sum = []
          list.forEach(ele => {
            if (item.fieldName == ele.enumname) {
              arr.push(ele.ID)
              let num = arr.join(',').split('-')
              let sign = `"${num[0]}"`
              console.log(sign.split('-'));
              let array = `${ele.ID}-${ele.caption}                   `
              sum.push(array)
              console.log(sum.join(' '));
              worksheet.getColumn(index + 1).eachCell(function (cell, rowNumber) {
                if (rowNumber > nums) {
                  cell.dataValidation = {
                    type: 'list',
                    allowBlank: true,
                    showInputMessage: true,
                    formulae: sign.split('-'),
                    promptTitle: '录入说明',
                    prompt: sum.join(' '),
                  };
                }
              })
            }
          })
        }
      } else {
        worksheet.getColumn(index + 1).numFmt = '@'
      }
    })
    // 导出Excel文件
  });
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${excelName}`;
    link.click();
  });
}