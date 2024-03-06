function specialOffers() {
  const carouselName = 'spotlight'
  const carouselContainer = createCarouselContainer(carouselName)
  document.querySelector('.home_page_content.special_offers')?.appendChild(carouselContainer)
  const itemContainer = carouselContainer.childNodes[0]
  const selectorContainer = carouselContainer.childNodes[1]
  const gameUrls = []
  const imgUrls = []
  const prices = []
  const appIds = []
  const discounts = []
  let idx = 0

  function createCarouselItemPage(i) {
    const container = document.createElement('div')
    const selector = createCarouselSelector(i == 0, carouselName)
    let className = 'home_special_offers_group'

    if (i == 0) {
      className += ' focus'
    }

    container.setAttribute('class', className)

    for (let i = 0; i < 3; i++) {
      container.appendChild(createLargeCarouselItem(gameUrls[idx], imgUrls[idx], prices[idx], appIds[idx], discounts[idx]))
      idx++
    }

    itemContainer.appendChild(container)
    selectorContainer.appendChild(selector)
  }

  document.querySelectorAll('.home_special_offers_group > div').forEach((child, _) => {
    const childClass = child.getAttribute('class')
    if (childClass != null && childClass.indexOf('home_area_spotlight') !== -1) {
      const url = child.childNodes[1].childNodes[1].getAttribute('href')
      if (url.indexOf('/sale/') !== -1) {
        return
      }
      gameUrls.push(url)
      imgUrls.push(`https://cdn.cloudflare.steamstatic.com/steam/apps/${child.getAttribute('data-ds-appid')}/header.jpg`)
      prices.push(child.querySelector('.discount_final_price').innerHTML)
      appIds.push(child.getAttribute('data-ds-appid'))
      discounts.push(child.querySelector('.discount_block').getAttribute('data-discount'))
    } else {
      child.childNodes.forEach((spotlightChild, _) => {
        if (spotlightChild.getAttribute('class').indexOf('daily_deal') !== -1) {
          gameUrls.push(spotlightChild.getAttribute('href'))
          imgUrls.push(spotlightChild.childNodes[0].childNodes[0].getAttribute('src'))
          appIds.push(spotlightChild.getAttribute('data-ds-appid'))
        } else {
          gameUrls.push(spotlightChild.childNodes[0].getAttribute('href'))
          imgUrls.push(spotlightChild.childNodes[0].childNodes[0].childNodes[0].getAttribute('src'))
          appIds.push(spotlightChild.childNodes[0].getAttribute('data-ds-appid'))
        }
        prices.push(spotlightChild.querySelector('.discount_final_price')?.innerHTML)
        discounts.push(spotlightChild.querySelector('.discount_block').getAttribute('data-discount'))
      })
    }
  })

  for (let i = 0; i < gameUrls.length / 3; i ++) {
    createCarouselItemPage(i)
  }
}

specialOffers()
