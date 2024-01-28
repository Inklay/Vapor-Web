function store() {
  document.querySelector('.home_page_body_ctn .home_page_content').setAttribute('class', '')
  document.querySelectorAll('.store_main_capsule .reason .main.bytags').forEach((value, _) => {
    value.childNodes.forEach((child, _) => {
      if (child.nodeType === 3) {
        child.remove()
      }
    })
  })

  document.querySelectorAll('.store_main_capsule .discount_block .discount_prices').forEach((value, _) => {
    const isDiscounted = value.parentNode.getAttribute('data-discount') != '0'
    const shownPrice = value.childNodes[0].innerHTML
    const url = value.parentNode.parentNode.parentNode.getAttribute('href')

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

    function whishlist() {
      const container = document.createElement('div')
      container.setAttribute('class', 'whishlist add')
      container.appendChild(createSVG('25', '25', '0 0 25 25', 'M19.9102 4.49004C17.2702 2.69004 14.0102 3.53004 12.2502 5.59004C10.4902 3.53004 7.23021 2.68004 4.59021 4.49004C3.19021 5.45004 2.31021 7.07004 2.25021 8.78004C2.11021 12.66 5.55021 15.77 10.8002 20.54L10.9002 20.63C11.6602 21.32 12.8302 21.32 13.5902 20.62L13.7002 20.52C18.9502 15.76 22.3802 12.65 22.2502 8.77004C22.1902 7.07004 21.3102 5.45004 19.9102 4.49004ZM12.3502 19.05L12.2502 19.15L12.1502 19.05C7.39021 14.74 4.25021 11.89 4.25021 9.00004C4.25021 7.00004 5.75021 5.50004 7.75021 5.50004C9.29021 5.50004 10.7902 6.49004 11.3202 7.86004H13.1902C13.7102 6.49004 15.2102 5.50004 16.7502 5.50004C18.7502 5.50004 20.2502 7.00004 20.2502 9.00004C20.2502 11.89 17.1102 14.74 12.3502 19.05Z'))

      return container
    }

    value.innerHTML = ''

    if (isLogged) {
      value.appendChild(whishlist())
    }
    if (isDiscounted) {
      value.appendChild(discountAmount())
    }
    value.appendChild(price())
    value.appendChild(button())
  })
}

store()
