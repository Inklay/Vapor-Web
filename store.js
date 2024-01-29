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
      } else {
        url = 'https://store.steampowered.com/api/addtowishlist'
      }
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.send(`sessionid=${sessionId}&appid=${appid}`)
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          updateWishlistCount(JSON.parse(xhr.response).wishlistCount)
          updateWishlistCount(JSON.parse(xhr.response).wishlistCount)
          if (whishlisted) {
            container.setAttribute('class', 'whishlist')
            container.childNodes[0].childNodes[0].setAttribute('d', svg.whishListEmpty)
          } else {
            container.setAttribute('class', 'whishlist whishlisted')
            container.childNodes[0].childNodes[0].setAttribute('d', svg.whishListFull)
          }
        }
      }
    })
  }
  return container
}

function updateWishlistCount(count) {
  document.querySelector('#whishlist-tab').innerHTML = `Whishlist (${count})`
}

function store() {
  document.querySelector('.home_page_body_ctn .home_page_content').setAttribute('class', '')
  document.querySelectorAll('.store_main_capsule .reason .main.bytags').forEach((value, _) => {
    value.childNodes.forEach((child, _) => {
      if (child.nodeType === 3) {
        child.remove()
      }
    })
  })

  document.querySelectorAll('.store_main_capsule .info .discount_block .discount_prices').forEach((value, _) => {
    const isDiscounted = value.parentNode.getAttribute('data-discount') != '0'
    const shownPrice = value.childNodes[0].innerHTML
    const url = value.parentNode.parentNode.parentNode.getAttribute('href')
    const whishlisted = value.parentNode.parentNode.parentNode.childNodes[2].getAttribute('class').search('ds_wishlist_flag') !== -1
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

    function discountAmount() {
      const container = document.createElement('div')
      container.setAttribute('class', 'discount-amount')
      container.innerHTML = `-${value.parentNode.getAttribute('data-discount')}%`

      return container
    }

    function price() {
      function basePrice() {
        const container = document.createElement('div')
        if (isDiscounted) {
          const xhr = new XMLHttpRequest()
          xhr.open('GET', url, true)
          xhr.send()
          xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              const parser = new DOMParser()
              const data = parser.parseFromString(xhr.response, 'text/html')
              if (data.querySelector('.normal_price') != null) {
                container.innerHTML = data.querySelector('.normal_price').innerHTML
              } else {
                container.innerHTML = data.querySelector('.discount_original_price').innerHTML
              }
            }
          }

          container.setAttribute('class', 'base-price discounted')
        } else {
          container.setAttribute('class', 'base-price')
          container.innerHTML = shownPrice
        }

        return container
      }

      function discountedPrice() {
        const container = document.createElement('div')
        container.setAttribute('class', 'discount-price')
        container.innerHTML = shownPrice

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

    function button() {
      const button = document.createElement('button')
      button.setAttribute('class', 'button primary')
      button.innerText = 'Buy Now'

      return button
    }

    value.innerHTML = ''

    if (isLogged) {
      value.appendChild(createWhishlistButton(appid, whishlisted))
    }
    if (isDiscounted) {
      value.appendChild(discountAmount())
    }
    value.appendChild(price())
    value.appendChild(button())
  })
}

store()
