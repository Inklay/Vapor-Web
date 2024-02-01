function createCarouselSelector(isFocus, className) {
  let container = document.createElement('div')
  container.addEventListener('click', () => {
    let idx = 0

    while (container.previousSibling != null) {
      container = container.previousSibling
      idx++
    }
    const carousel = document.querySelector(`.vapor.carousel_container.${className}`)
    const focusedItem = getCurrentCarouselItem(carousel)
    const items = carousel.querySelectorAll('.carousel_items > div')
    const selectors = carousel.querySelectorAll('.carousel_thumbs > div')
    const itemClass = items[idx].getAttribute('class')
    
    items[focusedItem].setAttribute('class', itemClass)
    selectors[focusedItem].setAttribute('class', '')
    items[idx].setAttribute('class', `${itemClass} focus`)
    selectors[idx].setAttribute('class', 'focus')
  })

  if (isFocus) {
    container.setAttribute('class', 'focus')
  }

  return container
}

function getCurrentCarouselItem(carousel) {
  let focusedItem

  carousel.querySelectorAll('.carousel_items > div').forEach((child, idx) => {
    if (child.getAttribute('class').indexOf(' focus') !== -1) {
      focusedItem = idx
    }
  })

  return focusedItem
}

function createCarouselContainer(className) {
  function createDiv(className) {
    const container = document.createElement('div')
    container.setAttribute('class', className)

    return container
  }

  function createArrow(className, carousel) {
    const container = document.createElement('div')
    container.setAttribute('class', 'arrow ' + className)
    container.appendChild(document.createElement('div'))
    container.addEventListener('click', () => {
      const itemNumber = carousel.childNodes[0].childNodes.length
      let focusedItem = getCurrentCarouselItem(carousel)
      carousel.childNodes[0].childNodes[focusedItem].setAttribute('class', carousel.childNodes[0].childNodes[focusedItem].getAttribute('class').replace(' focus', ''))
      carousel.childNodes[1].childNodes[focusedItem].setAttribute('class', '')

      if (className == 'right') {
        focusedItem++
        if (focusedItem == itemNumber) {
          focusedItem = 0
        }
      } else {
        focusedItem--
        if (focusedItem == -1) {
          focusedItem = itemNumber - 1
        }
      }

      carousel.childNodes[0].childNodes[focusedItem].setAttribute('class', `${carousel.childNodes[0].childNodes[focusedItem].getAttribute('class')} focus`)
      carousel.childNodes[1].childNodes[focusedItem].setAttribute('class', 'focus')
    })

    return container
  }
  
  const container = document.createElement('div')
  container.setAttribute('class', 'carousel_container vapor ' + className)
  container.appendChild(createDiv('carousel_items responsive_scroll_snap_ctn'))
  container.appendChild(createDiv('carousel_thumbs'))
  container.appendChild(createArrow('left', container))
  container.appendChild(createArrow('right', container))

  return container
}

function createLargeCarouselItem(gameUrl, imgUrl, shownPrice, appId, discount) {
  function createImage() {
    const link = document.createElement('a')
    link.setAttribute('href', gameUrl)

    const img = document.createElement('img')
    img.setAttribute('src', imgUrl)

    link.appendChild(img)
    return link
  }

  function appName() {
    const container = document.createElement('a')
    container.setAttribute('class', 'app_name')
    container.setAttribute('href', gameUrl)

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

  const isDiscounted = discount != '0'
  const appNameContainer = appName()
  const whishlistContainer = createWhishlistButton(appId, false)
  const priceContainer = createPrice(isDiscounted, discount, shownPrice)
  getGameData(gameUrl, updateGameData, {appNameContainer, shownPrice, whishlistContainer, priceContainer, isDiscounted})

  const container = document.createElement('div')
  container.setAttribute('class', 'large')
  container.appendChild(createImage())
  container.appendChild(appNameContainer)
  container.appendChild(info())

  return container
}
