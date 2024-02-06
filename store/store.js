function createWhishlistButton(appid = undefined, whishlisted) {
  const container = document.createElement('div')
  
  if (whishlisted) {
    container.appendChild(createSVG('25', '25', '0 0 25 25', svg.whishListFull))
    container.setAttribute('class', 'whishlist whishlisted')
  } else {
    container.appendChild(createSVG('25', '25', '0 0 25 25', svg.whishListEmpty))
    container.setAttribute('class', 'whishlist')
  }
  
  container.addEventListener('mouseenter', () => {
    container.childNodes[0].childNodes[0].setAttribute('d', svg.whishListFull)
  })

  container.addEventListener('mouseleave', () => {
    if (container.getAttribute('class').search('whishlisted') === -1) {
      container.childNodes[0].childNodes[0].setAttribute('d', svg.whishListEmpty)
    }
  })

  if (appid !== undefined) {
    container.addEventListener('click', () => {
      let url
      const whishlisted = container.getAttribute('class').search('whishlisted') !== -1

      if (whishlisted) {
        url = 'https://store.steampowered.com/api/removefromwishlist'
        container.childNodes[0].childNodes[0].setAttribute('d', svg.whishListEmpty)
        container.setAttribute('class', 'whishlist')
      } else {
        url = 'https://store.steampowered.com/api/addtowishlist'
        container.childNodes[0].childNodes[0].setAttribute('d', svg.whishListFull)
        container.setAttribute('class', 'whishlist whishlisted')
      }
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.send(`sessionid=${sessionId}&appid=${appid}`)
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          updateWishlistCount(JSON.parse(xhr.response).wishlistCount)
        }
      }
    })
  }
  return container
}

function updateWishlistCount(count) {
  document.querySelector('#whishlist-tab').innerHTML = `Whishlist (${count})`
}

function updateGameData(data) {
  if (data.isDiscounted && data.priceContainer) {
    data.priceContainer.childNodes[0].childNodes[0].innerHTML = data.price
    data.priceContainer.childNodes[0].childNodes[0].setAttribute('class', 'base-price discounted')
  } else if (data.priceContainer) {
    data.priceContainer.childNodes[0].childNodes[0].setAttribute('class', 'base-price')
    data.priceContainer.childNodes[0].childNodes[0].innerHTML = data.shownPrice
  }

  if (data.whishlisted && data.whishlistContainer) {
    data.whishlistContainer.setAttribute('class', 'whishlist whishlisted')
    data.whishlistContainer.childNodes[0].childNodes[0].setAttribute('d', svg.whishListFull)
  }

  if (data.name && data.appNameContainer) {
    data.appNameContainer.innerHTML = data.name
  }
}

function getGameData(url, callback, callbackData) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.send()
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const parser = new DOMParser()
      const data = parser.parseFromString(xhr.response, 'text/html')
      let price = ''
      let whishlisted = false
      let name = ''

      if (data.querySelector('#appHubAppName')) {
        name = data.querySelector('#appHubAppName').innerHTML
      }

      if (data.querySelector('.normal_price') != null) {
        price = data.querySelector('.normal_price').innerHTML
      } else if (data.querySelector('.discount_original_price') != null) {
        price = data.querySelector('.discount_original_price').innerHTML
      }

      if (data.querySelector('#add_to_wishlist_area_success') == null || data.querySelector('#add_to_wishlist_area_success').getAttribute('style') == null) {
        whishlisted = true
      }

      callback({price, whishlisted, name, ...callbackData})
    }
  }
}

function createPrice(isDiscounted, discount, shownPrice, shownDiscountedPrice = null) {
  function discountAmount() {
    const container = document.createElement('div')
    container.setAttribute('class', 'discount-amount')
    container.innerHTML = `-${discount}%`

    return container
  }

  function price() {
    function basePrice() {
      const container = document.createElement('div')
      container.innerHTML = shownPrice
      if (shownDiscountedPrice || !isDiscounted) {
        container.innerHTML = shownPrice
      }
      if (isDiscounted) {
        container.setAttribute('class', 'base-price discounted')
      } else {
        container.setAttribute('class', 'base-price')
      }
  
      return container
    }
  
    function discountedPrice() {
      const container = document.createElement('div')
      container.setAttribute('class', 'discount-price')
      if (shownDiscountedPrice) {
        container.innerHTML = shownDiscountedPrice
      } else if (isDiscounted) {
        container.innerHTML = shownPrice
      }
  
      return container
    }
  
    const container = document.createElement('div')
    container.setAttribute('class', 'price')
    container.appendChild(basePrice())
    if (isDiscounted) {
      container.appendChild(discountedPrice())
    }
  
    return container
  }
  const container = document.createElement('div')
  container.setAttribute('class', 'priceContainer')
  container.appendChild(price())

  if (isDiscounted) {
    container.appendChild(discountAmount())
  }
  return container
}
