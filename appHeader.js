function appheader() {
  let steamLogoUrl
  let steamLogoLabel
  let userName
  let userWallet
  let userPictureUrl
  let userProfileUrl

  function getData() {
    steamLogoUrl = document.querySelector('#logo_holder > a > img').getAttribute('src')
    steamLogoLabel = document.querySelector('#logo_holder > a > img').getAttribute('alt')
    
    if (isLogged) {
      userName = document.querySelector('#account_pulldown').innerHTML
      userWallet = document.querySelector('#header_wallet_ctn > a').innerHTML
      userPictureUrl = document.querySelector('.user_avatar > img').getAttribute('src')
      userProfileUrl = document.querySelector('#account_dropdown > div > a').getAttribute('href')
    }
  }

  function navigationArrow() {
    const container = document.createElement('div')
    container.setAttribute('class', 'navigation_arrow' + clientClass)
    container.appendChild(createSVG('24', '24', '0 0 24 24', svg.leftArrow))
    container.appendChild(createSVG('24', '24', '0 0 24 24', svg.rightArrow))
    
    return container
  }

  function nav() {
    function steamLogo() {
      const link = document.createElement('a')
      link.setAttribute('href', 'https://store.steampowered.com/')
      link.setAttribute('aria-label', steamLogoLabel)

      const img = document.createElement('img')
      img.setAttribute('src', steamLogoUrl)
      img.setAttribute('alt', steamLogoLabel)

      link.appendChild(img)

      return link
    }

    function createTab(url, selected, hidden, label) {
      const link = document.createElement('a')
      let className = ''
      hidden ? className += hide : className += ''
      selected ? className += ' tab-selected' : className += ''
      link.setAttribute('href', url)
      link.setAttribute('class', className)
      link.innerHTML = label

      return link
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'nav')
    container.appendChild(steamLogo())
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href.search('store.steampowered.com') != -1, false, 'store'))
    container.appendChild(createTab('https://steamcommunity.com/', window.location.href.search('steamcommunity.com') != -1 && window.location.href.search('steamcommunity.com/id') == -1, false, 'community'))
    container.appendChild(createTab(userProfileUrl, window.location.href.search(userProfileUrl) != -1, !isLogged, userName))
    container.appendChild(createTab('/client/library', window.location.href.search('/client/library') != -1, !isClient, 'library'))
    container.appendChild(createTab('/client/downloads', window.location.href.search('/client/downloads') != -1, !isClient, 'downloads'))
  
    return container
  }

  function action() {
    function user() {
      function friends() {
        const container = document.createElement('div')
        container.setAttribute('class', 'icon')
        container.appendChild(createSVG('24', '24', '0 0 25 25', svg.friends))

        return container
      }

      function notification() {
        const container = document.createElement('div')
        container.setAttribute('class', 'icon')
        container.appendChild(createSVG('24', '24', '0 0 25 25', svg.notification))

        return container
      }

      function account() {
        function img() {
          const img = document.createElement('img')
          img.setAttribute('class', 'user-image')
          img.setAttribute('width', '30')
          img.setAttribute('height', '30')
          img.setAttribute('alt', userName)
          img.setAttribute('src', userPictureUrl)

          return img
        }

        function name() {
          const container = document.createElement('div')
          container.setAttribute('class', 'user-name')
          container.innerHTML = userName

          return container
        }

        function wallet() {
          const container = document.createElement('div')
          container.setAttribute('class', 'user-wallet')

          const link = document.createElement('a')
          link.setAttribute('href', 'https://store.steampowered.com/account/store_transactions/')
          link.innerHTML = userWallet

          container.appendChild(link)

          return container
        }

        function options() {
          const container = document.createElement('div')
          container.setAttribute('class', 'options')
          container.appendChild(createSVG('20', '21', '0 0 20 21', svg.downArrow))

          return container
        }

        const container = document.createElement('div')
        container.setAttribute('class', 'account')
        container.appendChild(img())
        container.appendChild(name())
        container.appendChild(wallet())
        container.appendChild(options())

        return container
      }

      const container = document.createElement('div')
      container.setAttribute('class', 'user' + loggedClass)
      container.appendChild(friends())
      container.appendChild(notification())
      container.appendChild(account()) 

      return container
    }

    function application() {
      function help() {
        const container = document.createElement('div')
        container.innerHTML = 'help'

        return container
      }

      function view() {
        const container = document.createElement('div')
        container.setAttribute('class', clientClass)
        container.innerHTML = 'View'
        container.appendChild(createSVG('20', '21', '0 0 20 21', svg.downArrow))

        return container
      }

      function minimize() {
        const container = document.createElement('div')

        container.setAttribute('class', 'window' + clientClass)
        container.setAttribute('id', 'minimize')
        container.appendChild(createSVG('25', '25', '0 0 25 25', svg.minimize))

        return container
      }

      function maximize() {
        const container = document.createElement('div')
        container.setAttribute('class', 'window' + clientClass)
        container.setAttribute('id', 'maximize')
        container.appendChild(createSVG('25', '25', '0 0 25 25', svg.maximize))

        return container
      }

      function close() {
        const container = document.createElement('div')
        container.setAttribute('class', 'window' + clientClass)
        container.setAttribute('id', 'close')
        container.appendChild(createSVG('25', '25', '0 0 25 25', svg.close))

        return container
      }

      const container = document.createElement('div')
      container.setAttribute('class', 'application')
      container.appendChild(help())
      container.appendChild(view())
      container.appendChild(minimize())
      container.appendChild(maximize())
      container.appendChild(close())

      return container
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'action')
    container.appendChild(user())
    container.appendChild(application())

    return container
  }

  getData()

  const container = document.createElement('div')
  container.setAttribute('class', 'header')
  container.appendChild(navigationArrow())
  container.appendChild(nav())
  container.appendChild(action())

  addElement(container, '#global_header')
}

appheader()
