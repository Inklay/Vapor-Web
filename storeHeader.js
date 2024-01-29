function storeHeader() {
  const whishlistCount = document.querySelector('#wishlist_item_count_value').innerHTML

  function createTab(url, selected, hidden, label, id = null) {
    const link = document.createElement('a')
    let className = 'tab'
    hidden ? className += hide : className += ''
    selected ? className += ' selected' : className += ''
    link.setAttribute('class', className)
    link.setAttribute('href', url)
    link.innerHTML = label

    if (id != null) {
      link.setAttribute('id', id)
    }

    return link
  }

  function tabs() {
    const container = document.createElement('div')
    container.setAttribute('class', 'tabs')
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/', false, 'Home'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', false, 'Browse'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', false, 'Discover'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', false, 'Points Shop'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', false, 'Gift Cards'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', false, 'News'))

    return container
  }

  function reverse() {
    function input() {
      const container = document.createElement('div')
      container.setAttribute('class', 'input')

      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('placeholder', 'Search...')

      container.appendChild(input)
      container.appendChild(createSVG('24', '24', '0 0 20 20', svg.search))

      return container
    }

    function settings() {
      const container = document.createElement('div')
      container.setAttribute('class', 'settings' + loggedClass)
      container.appendChild(createSVG('24', '24', '0 0 26 26', svg.options))

      return container
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'reverse')
    container.appendChild(input())
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', !isLogged, `Whishlist (${whishlistCount})`, 'whishlist-tab'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', !isLogged, 'Cart'))
    container.appendChild(settings())

    return container
  }

  const container = document.createElement('nav')
  container.appendChild(tabs())
  container.appendChild(reverse())

  addElementAfter(container, '#global_header')
}

storeHeader()
