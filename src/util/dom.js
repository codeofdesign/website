let docFontSize = undefined

export const remToPx = (rem) => {
  if (!docFontSize) docFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rem * docFontSize
}