
const hide = ' -hide'
const isClient = window.ipcRenderer !== undefined
const clientClass = isClient ? '' : hide
const isLogged = document.querySelector('#global_action_menu > .global_action_link') !== undefined


function deleteElement(selector) {
  const element = document.querySelector(selector)

  if (element) {
    element.remove()
  }
}

function addElement(element, parentSelector) {
  const parent = document.querySelector(parentSelector)

  if (parent) {
    parent.appendChild(element)
  }
}

function createSVG(width, height, viewBox, d) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', width)
  svg.setAttribute('height', height)
  svg.setAttribute('viewBox', viewBox)
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', d)

  svg.appendChild(path)
  return svg
}
