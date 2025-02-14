export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Check if the date is valid
  if (isNaN(date)) {
    return 'Invalid/No Date'; // Or handle it as you need
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
