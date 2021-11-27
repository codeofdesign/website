export const map = (val, om, ox, m, x) => {
  return ((val - om) * (x - m)) / (ox - om) + m
}

export const lerp = (a, b, n = 0.06) => {
  return (1 - n) * a + n * b
}

export const clamp = (val, min, max) => {
  return Math.min(Math.max(val, min), max)
}

export const mapClamp = (...args) => {
  const [ val, min, max ] = [args[0], args[3], args[4]]
  return clamp(val, min, max)
}