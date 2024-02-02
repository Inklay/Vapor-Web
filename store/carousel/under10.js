function under10() {
  document.querySelectorAll('.specials_under10 .carousel_items .store_capsule > div:not([class])').forEach((value, _) => {
    function appName() {
      const container = document.createElement('a')
      container.setAttribute('class', 'app_name')
      container.setAttribute('href', gameUrl)
      container.innerHTML = gameName
  
      return container
    }

    function info() {
      const info = document.createElement('div')
      info.setAttribute('class', 'discount_prices')
      if (isLogged) {
        info.appendChild(whishlistContainer)
      }
      info.appendChild(priceContainer)
  
      const container = document.createElement('div')
      container.setAttribute('class', 'discount_block_inline')
      container.appendChild(info)
  
      return container
    }

    const gameUrl = value.parentElement.getAttribute('href')
    const shownPrice = value.querySelector('.discount_final_price').innerHTML
    const discount = value.querySelector('.discount_block').getAttribute('data-discount')
    const whishlisted = value.parentElement.querySelector('.ds_flag.ds_wishlist_flag') != null
    const appId = value.parentElement.getAttribute('data-ds-appid')
    const isDiscounted = discount != '0'
    const gameName = value.parentElement.querySelector('.capsule > img').getAttribute('alt')
    const whishlistContainer = createWhishlistButton(appId, whishlisted)
    const priceContainer = createPrice(isDiscounted, discount, shownPrice)

    getGameData(gameUrl, updateGameData, {shownPrice, whishlistContainer, priceContainer, isDiscounted})

    value.innerHTML = ''
    value.appendChild(appName())
    value.appendChild(info())
  })
}

under10()
