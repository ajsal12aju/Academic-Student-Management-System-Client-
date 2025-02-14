// utils/excelUtils.js
import * as XLSX from 'xlsx';

/**
 * Utility function to generate and download an Excel file from JSON data.
 * @param {Array} data - The array of data to be exported.
 * @param {string} fileName - The name of the Excel file to be downloaded.
 */
export const generateSpreadSheet = (data, fileName = 'exported_data.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Trigger file download
  XLSX.writeFile(workbook, fileName);
};
