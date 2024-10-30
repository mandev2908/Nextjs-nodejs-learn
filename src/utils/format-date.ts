export function toCustomISOString(date: Date): string {
  return date.toISOString().split('T')[0]; // Kết quả: YYYY-MM-DD
}

export function convertToISOString(dateString: string): string {
  // Tạo đối tượng Date từ chuỗi YYYY-MM-DD
  const date = new Date(dateString);
  // Kiểm tra xem ngày hợp lệ hay không
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date format. Please use YYYY-MM-DD.');
  }
  // Trả về chuỗi ISO
  return date.toISOString(); // Kết quả: '2024-10-30T00:00:00.000Z'
}
