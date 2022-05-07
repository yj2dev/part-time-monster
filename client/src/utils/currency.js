export function intOfKr(value = 0) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function phoneFormat(value = 0) {
  return value.toString().replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}
