function storeHeader() {
  function createTab(url, selected, label) {
    const link = document.createElement('a')
    link.setAttribute('class', selected ? 'tab selected' : 'tab')
    link.setAttribute('href', url)
    link.innerHTML = label

    return link
  }

  function tabs() {
    const container = document.createElement('div')
    container.setAttribute('class', 'tabs')
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/', 'Home'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', 'Browse'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', 'Discover'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', 'Points Shop'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', 'Gift Cards'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', 'News'))

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
      container.appendChild(createSVG('24', '24', '0 0 20 20', 'M12.9167 11.6666H12.2584L12.025 11.4416C13.025 10.275 13.5417 8.68331 13.2584 6.99164C12.8667 4.67497 10.9334 2.82497 8.60003 2.54164C5.07503 2.10831 2.10837 5.07497 2.5417 8.59997C2.82503 10.9333 4.67503 12.8666 6.9917 13.2583C8.68337 13.5416 10.275 13.025 11.4417 12.025L11.6667 12.2583V12.9166L15.2084 16.4583C15.55 16.8 16.1084 16.8 16.45 16.4583C16.7917 16.1166 16.7917 15.5583 16.45 15.2166L12.9167 11.6666ZM7.9167 11.6666C5.8417 11.6666 4.1667 9.99164 4.1667 7.91664C4.1667 5.84164 5.8417 4.16664 7.9167 4.16664C9.9917 4.16664 11.6667 5.84164 11.6667 7.91664C11.6667 9.99164 9.9917 11.6666 7.9167 11.6666Z'))

      return container
    }

    function settings() {
      const container = document.createElement('div')
      container.setAttribute('class', 'settings')
      container.appendChild(createSVG('24', '24', '0 0 26 26', 'M21.0492 14.0617C21.0926 13.715 21.1251 13.3684 21.1251 13C21.1251 12.6317 21.0926 12.285 21.0492 11.9384L23.3351 10.1509C23.5409 9.98835 23.5951 9.69585 23.4651 9.45752L21.2984 5.70919C21.1684 5.47085 20.8759 5.38419 20.6376 5.47085L17.9401 6.55419C17.3767 6.12085 16.7701 5.76335 16.1092 5.49252L15.6976 2.62169C15.6651 2.36169 15.4376 2.16669 15.1667 2.16669H10.8334C10.5626 2.16669 10.3351 2.36169 10.3026 2.62169L9.8909 5.49252C9.23007 5.76335 8.6234 6.13169 8.06007 6.55419L5.36257 5.47085C5.1134 5.37335 4.83174 5.47085 4.70174 5.70919L2.53507 9.45752C2.39424 9.69585 2.45924 9.98835 2.66507 10.1509L4.9509 11.9384C4.90757 12.285 4.87507 12.6425 4.87507 13C4.87507 13.3575 4.90757 13.715 4.9509 14.0617L2.66507 15.8492C2.45924 16.0117 2.40507 16.3042 2.53507 16.5425L4.70174 20.2909C4.83174 20.5292 5.12424 20.6159 5.36257 20.5292L8.06007 19.4459C8.6234 19.8792 9.23007 20.2367 9.8909 20.5075L10.3026 23.3784C10.3351 23.6384 10.5626 23.8334 10.8334 23.8334H15.1667C15.4376 23.8334 15.6651 23.6384 15.6976 23.3784L16.1092 20.5075C16.7701 20.2367 17.3767 19.8684 17.9401 19.4459L20.6376 20.5292C20.8867 20.6267 21.1684 20.5292 21.2984 20.2909L23.4651 16.5425C23.5951 16.3042 23.5409 16.0117 23.3351 15.8492L21.0492 14.0617ZM13.0001 16.7917C10.9092 16.7917 9.2084 15.0909 9.2084 13C9.2084 10.9092 10.9092 9.20835 13.0001 9.20835C15.0909 9.20835 16.7917 10.9092 16.7917 13C16.7917 15.0909 15.0909 16.7917 13.0001 16.7917Z'))

      return container
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'reverse' + loggedClass)
    container.appendChild(input())
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', 'Whishlist'))
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href == 'https://store.steampowered.com/*', 'Cart'))
    container.appendChild(settings())

    return container
  }

  const container = document.createElement('nav')
  container.appendChild(tabs())
  container.appendChild(reverse())

  addElementAfter(container, '#global_header')
}

storeHeader()
