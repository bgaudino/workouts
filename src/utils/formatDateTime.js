export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US");
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

export function formatDateForInput(date) {
  return new Date(date).toISOString().split("T")[0];
}