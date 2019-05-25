
const setVar = (propertyName, value, el) => {
  if (!el) {
    document.documentElement.style.setProperty(`--vut-${propertyName}`, value)
  } else {
    el.style.setProperty(`--vut-${propertyName}`, value)
  }
}

const setColor = (colorName, color, el) => {
  function isColor (color) {
    let vutColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'dark', 'light']
    return vutColors.includes(color)
  }

  function hexToRgb (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b
    })

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  let isRGB = /^(rgb|rgba)/.test(color)
  let isHEX = /^(#)/.test(color)
  let newColor

  if (isRGB) {
    let arrayColor = color.replace(/[rgba()]/g, '').split(',')
    newColor = `${arrayColor[0]},${arrayColor[1]},${arrayColor[2]}`
    setVar(colorName, newColor, el)
  } else if (isHEX) {
    let rgb = hexToRgb(color)
    newColor = `${rgb.r},${rgb.g},${rgb.b}`
    setVar(colorName, newColor, el)
  } else if (isColor(color)) {
    var style = getComputedStyle(el)
    newColor = style.getPropertyValue('--vut-' + color)
    setVar(colorName, newColor, el)
  }
}

export {
  setVar,
  setColor,
}
