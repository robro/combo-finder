function compare(a, b, invert=false) {
  var result = 0
  if (a < b) result = -1
  if (b < a) result = 1
  if (invert) result *= -1
  return result
}

export default compare