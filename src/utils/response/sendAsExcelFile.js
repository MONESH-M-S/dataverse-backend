const ExcelJS = require("exceljs");

module.exports = async (res, table, Filename, data) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("");

  worksheet.columns = table.columns;

  data.forEach((item) => {
    if(table.dimension && table.dimension === 'Product') {
      worksheet.addRow(item);
    } else {
      worksheet.addRow(item.toJSON());
    }

  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + Filename
  );

  await workbook.xlsx.write(res);

  res.end();
};
