function featured() {
  document.querySelector('.home_page_body_ctn .home_page_content')?.setAttribute('class', '')
  document.querySelectorAll('.store_main_capsule .reason .main.bytags').forEach((value, _) => {
    value.childNodes.forEach((child, _) => {
      if (child.nodeType === 3) {
        child.remove()
      }
    })
  })

  document.querySelectorAll('.store_main_capsule .info .discount_block .discount_prices').forEach((value, _) => {
    const isDiscounted = value.parentNode.getAttribute('data-discount') != '0'
    const shownPrice = value.querySelector('.discount_final_price').innerHTML
    const url = value.parentNode.parentNode.parentNode.getAttribute('href')
    const appid = value.parentNode.parentNode.parentNode.getAttribute('data-ds-appid')

    value.parentNode.parentNode.childNodes[2].insertAdjacentElement('afterEnd', value.parentNode.parentNode.childNodes[4])

    // carousel container
    value.parentNode.parentNode.parentNode.removeAttribute('href')

    // game banner
    transformTag(value.parentNode.parentNode.parentNode.childNodes[0], 'a')
    value.parentNode.parentNode.parentNode.childNodes[0].setAttribute('href', url)

    // game name
    transformTag(value.parentNode.parentNode.childNodes[0], 'a')
    value.parentNode.parentNode.childNodes[0].setAttribute('href', url)

    function button() {
      const button = document.createElement('button')
      button.setAttribute('class', 'button primary')
      button.innerText = 'Buy Now'

      return button
    }

    value.innerHTML = ''
    if (isLogged) {
      value.appendChild(createWhishlistButton(appid, false))
    }

    const priceContainer = createPrice(isDiscounted, value.parentNode.getAttribute('data-discount'), shownPrice)
    getGameData(url, updateGameData, {shownPrice, priceContainer, whishlistContainer: value.childNodes[0], isDiscounted})

    value.appendChild(priceContainer)
    value.appendChild(button())
  })
}

featured()
