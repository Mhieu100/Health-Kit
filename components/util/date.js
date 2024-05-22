var inputDate = new Date();
var formattedDate = inputDate.toISOString().slice(0, 16).replace("T", " ");
export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    // Đảm bảo rằng các số ngày và tháng có định dạng hai chữ số (ví dụ: 01, 02, ..., 09)
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    
    return `${formattedDay}/${formattedMonth}`;
  }

 export function formatDatePost(dateTimeStr) {
    const date = new Date(dateTimeStr);
  
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${formattedDate} ${hours}:${minutes}`;
  }
  
export default formattedDate;