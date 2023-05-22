const ExcelJS = require("exceljs");

module.exports = async (res, table, whereClause, data) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("");

  worksheet.columns = table.columns;

  data.forEach((item) => {
    worksheet.addRow(item.toJSON());
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + whereClause.Filename
  );

  await workbook.xlsx.write(res);

  res.end();
};