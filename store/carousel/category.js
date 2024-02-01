function category() {
  document.querySelectorAll('.content_hub_capsule_ctn').forEach((value, _) => {
    const style = value.childNodes[1].getAttribute('style')
    const rgbPos = style.indexOf('rgb(')
    const rgbEndPos = style.slice(rgbPos).indexOf(')')
    const rgb = style.slice(rgbPos + 4, rgbEndPos + rgbPos)
    value.childNodes[1].setAttribute('style', 'background: rgba(' + rgb + ',0.25) 100%')
  })
}

category()
