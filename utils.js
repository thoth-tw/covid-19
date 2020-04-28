export function commaNum(x) {
  try {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch {
    return "0";
  }
}
