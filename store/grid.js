function createGrid(classId) {
  const prices = []
  const gameUrls = []
  const gameNames = []
  const discountedPrices = []
  const discountAmounts = []
  const platforms = []
  const appIds = []
  const whishlisted = []
  let idx = 0
  const title = document.querySelector(`${classId}_trigger`).innerText

  function getItemData(element) {
    gameUrls.push(element.getAttribute('href'))
    appIds.push(element.getAttribute('data-ds-appid'))
    gameNames.push(element.querySelector('.tab_item_name').innerText)
    whishlisted.push(element.querySelector('.ds_flag.ds_wishlist_flag') != null)

    let price = element.querySelector('.discount_original_price')
    if (price !== null) {
      prices.push(price.innerText)
      discountedPrices.push(element.querySelector('.discount_final_price').innerText)
      discountAmounts.push(element.querySelector('.discount_block.tab_item_discount').getAttribute('data-discount'))
    } else {
      prices.push(element.querySelector('.discount_final_price').innerText)
      discountedPrices.push(null)
      discountAmounts.push(0)
    }
  }

  function createContentContainer() { 
    function createItemContainer() {
      const container = document.createElement('div')
      container.setAttribute('class', 'grid_item_container')

      return container
    }

    function createItem() {
      function createImage() {
        const img = document.createElement('img')
        img.setAttribute('src', `https://cdn.cloudflare.steamstatic.com/steam/apps/${appIds[idx]}/header_292x136.jpg`)
        
        const link = document.createElement('a')
        link.setAttribute('href', gameUrls[idx])
        link.appendChild(img)

        return link
      }

      function appInfo() {
        function appName() {
          const container = document.createElement('a')
          container.setAttribute('class', 'app_name')
          container.setAttribute('href', gameUrls[idx])
          container.innerHTML = gameNames[idx]
      
          return container
        }

        function appData() {
          const container = document.createElement('div')
          container.setAttribute('class', 'discount_prices')
          container.append(createPrice(discountAmounts[idx] != 0, discountAmounts[idx], prices[idx], discountedPrices[idx]))
          if (isLogged) {
            container.appendChild(createWhishlistButton(appIds[idx], whishlisted[idx]))
          }

          return container
        }

        const container = document.createElement('div')
        container.append(appName())
        container.append(appData())
        container.setAttribute('class', 'app_info')

        return container
      }

      const container = document.createElement('div')
      container.append(createImage())
      container.append(appInfo())
      container.setAttribute('class', 'grid_item')

      return container
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'home_page_content grid')

    const titleContainer = document.createElement('h2')
    titleContainer.setAttribute('class', 'home_page_content_title')
    titleContainer.innerHTML = title
    container.appendChild(titleContainer)

    for (let i = 0; i < 5; i++) {
      const itemContainer = createItemContainer()

      for (let j = 0; j < 2; j++) {
        itemContainer.appendChild(createItem())
        idx++
      }

      container.appendChild(itemContainer)
    }

    return container
  }

  document.querySelectorAll(`${classId} > a`).forEach((value, _) => {
    getItemData(value)
  })

  const container = document.createElement('div')
  container.setAttribute('class', 'home_ctn')
  container.appendChild(createContentContainer())
  return container
}

addElementAfter(createGrid('#tab_topsellers_content'), '#home_broadcast_scroll_target')
addElementAfter(createGrid('#tab_newreleases_content'), '#home_broadcast_scroll_target')
