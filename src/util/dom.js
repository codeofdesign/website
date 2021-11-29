let docFontSize = undefined

export const remToPx = (rem) => {
  if (!docFontSize) docFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rem * docFontSize
}

export const parseContent = (c, tag) => {
  // replace all newline characters with closing and opening
  // paragraph tags - *unless* it's all the way at the end
  const t = tag || 'p'
  return `<${t}>` + c.replace(/(?!\n$)\n/g, `</${t}><${t}>`) + `</${t}>`
}