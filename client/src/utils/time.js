export function dateFormat(date) {
  return date.replace("T", " ").substring(0, 16);
}

export function timeFormat(date) {
  return date.substring(0, 5);
}
