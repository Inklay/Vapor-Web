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
    container.appendChild(createSVG('24', '24', '0 0 24 24', 'M14.71 15.88L10.83 12L14.71 8.11998C15.1 7.72998 15.1 7.09998 14.71 6.70998C14.32 6.31998 13.69 6.31998 13.3 6.70998L8.70998 11.3C8.31998 11.69 8.31998 12.32 8.70998 12.71L13.3 17.3C13.69 17.69 14.32 17.69 14.71 17.3C15.09 16.91 15.1 16.27 14.71 15.88Z'))
    container.appendChild(createSVG('24', '24', '0 0 24 24', 'M9.29002 8.12002L13.17 12L9.29002 15.88C8.90002 16.27 8.90002 16.9 9.29002 17.29C9.68002 17.68 10.31 17.68 10.7 17.29L15.29 12.7C15.68 12.31 15.68 11.68 15.29 11.29L10.7 6.70002C10.31 6.31002 9.68002 6.31002 9.29002 6.70002C8.91002 7.09002 8.90002 7.73002 9.29002 8.12002Z'))
    
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
    container.appendChild(createTab('https://store.steampowered.com/', window.location.href.search(userProfileUrl) != -1, !isLogged, userName))
    container.appendChild(createTab('/client/library', window.location.href.search('/client/library') != -1, !isClient, 'library'))
    container.appendChild(createTab('/client/downloads', window.location.href.search('/client/downloads') != -1, !isClient, 'downloads'))
  
    return container
  }

  function action() {
    function user() {
      function friends() {
        const container = document.createElement('div')
        container.setAttribute('class', 'icon')
        container.appendChild(createSVG('24', '24', '0 0 25 25', 'M16.6665 11.4585C18.3957 11.4585 19.7811 10.0627 19.7811 8.3335C19.7811 6.60433 18.3957 5.2085 16.6665 5.2085C14.9373 5.2085 13.5415 6.60433 13.5415 8.3335C13.5415 10.0627 14.9373 11.4585 16.6665 11.4585ZM8.33317 11.4585C10.0623 11.4585 11.4478 10.0627 11.4478 8.3335C11.4478 6.60433 10.0623 5.2085 8.33317 5.2085C6.604 5.2085 5.20817 6.60433 5.20817 8.3335C5.20817 10.0627 6.604 11.4585 8.33317 11.4585ZM8.33317 13.5418C5.90609 13.5418 1.0415 14.7606 1.0415 17.1877V18.7502C1.0415 19.3231 1.51025 19.7918 2.08317 19.7918H14.5832C15.1561 19.7918 15.6248 19.3231 15.6248 18.7502V17.1877C15.6248 14.7606 10.7603 13.5418 8.33317 13.5418ZM16.6665 13.5418C16.3644 13.5418 16.0207 13.5627 15.6561 13.5939C15.6769 13.6043 15.6873 13.6252 15.6978 13.6356C16.8853 14.5002 17.7082 15.6564 17.7082 17.1877V18.7502C17.7082 19.1147 17.6353 19.4689 17.5207 19.7918H22.9165C23.4894 19.7918 23.9582 19.3231 23.9582 18.7502V17.1877C23.9582 14.7606 19.0936 13.5418 16.6665 13.5418Z'))

        return container
      }

      function notification() {
        const container = document.createElement('div')
        container.setAttribute('class', 'icon')
        container.appendChild(createSVG('24', '24', '0 0 25 25', 'M12.5002 22.9165C13.6461 22.9165 14.5836 21.979 14.5836 20.8332H10.4169C10.4169 21.979 11.344 22.9165 12.5002 22.9165ZM18.7502 16.6665V11.4582C18.7502 8.26025 17.0419 5.58317 14.0627 4.87484V4.1665C14.0627 3.30192 13.3648 2.604 12.5002 2.604C11.6357 2.604 10.9377 3.30192 10.9377 4.1665V4.87484C7.94815 5.58317 6.25024 8.24984 6.25024 11.4582V16.6665L4.90649 18.0103C4.25024 18.6665 4.70857 19.7915 5.63565 19.7915H19.3544C20.2815 19.7915 20.7502 18.6665 20.094 18.0103L18.7502 16.6665Z'))

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
          container.appendChild(createSVG('20', '21', '0 0 20 21', 'M6.76644 8.2418L9.99977 11.4751L13.2331 8.2418C13.5581 7.9168 14.0831 7.9168 14.4081 8.2418C14.7331 8.5668 14.7331 9.0918 14.4081 9.4168L10.5831 13.2418C10.2581 13.5668 9.73311 13.5668 9.40811 13.2418L5.58311 9.4168C5.25811 9.0918 5.25811 8.5668 5.58311 8.2418C5.90811 7.92513 6.44144 7.9168 6.76644 8.2418Z'))

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
      container.setAttribute('class', 'user')
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
        container.appendChild(createSVG('20', '21', '0 0 20 21', 'M6.76644 8.2418L9.99977 11.4751L13.2331 8.2418C13.5581 7.9168 14.0831 7.9168 14.4081 8.2418C14.7331 8.5668 14.7331 9.0918 14.4081 9.4168L10.5831 13.2418C10.2581 13.5668 9.73311 13.5668 9.40811 13.2418L5.58311 9.4168C5.25811 9.0918 5.25811 8.5668 5.58311 8.2418C5.90811 7.92513 6.44144 7.9168 6.76644 8.2418Z'))

        return container
      }

      function minimize() {
        const container = document.createElement('div')

        container.setAttribute('class', 'window' + clientClass)
        container.setAttribute('id', 'minimize')
        container.appendChild(createSVG('25', '25', '0 0 25 25', 'M7.29167 11.6264H17.7083C18.2812 11.6264 18.75 12.0952 18.75 12.6681C18.75 13.241 18.2812 13.7097 17.7083 13.7097H7.29167C6.71875 13.7097 6.25 13.241 6.25 12.6681C6.25 12.0952 6.71875 11.6264 7.29167 11.6264Z'))

        return container
      }

      function maximize() {
        const container = document.createElement('div')
        container.setAttribute('class', 'window' + clientClass)
        container.setAttribute('id', 'maximize')
        container.appendChild(createSVG('25', '25', '0 0 25 25', 'M8.31931 5.05627H19.9344C21.0959 5.05627 21.3423 5.68301 21.3423 6.44903V15.5019C21.3423 15.8849 21.2191 16.3497 20.6383 16.3497C20.0576 16.3497 19.9344 15.8849 19.9344 15.5019V7.1454C19.9344 6.7624 19.4593 6.44903 18.8785 6.44903H8.31931C7.73856 6.44903 7.2634 6.13566 7.2634 5.75265C7.2634 5.36964 7.73856 5.05627 8.31931 5.05627ZM5.15158 7.84181H16.7667C17.9282 7.84181 18.5265 8.46855 18.5265 9.23456V18.9838C18.5265 19.7498 17.9282 20.3766 16.7667 20.3766H5.15158C3.99006 20.3766 3.74364 19.7498 3.74364 18.9838V9.23456C3.74364 8.46855 3.99006 7.84181 5.15158 7.84181ZM6.20749 18.9838H15.7108C16.2915 18.9838 16.7667 18.6705 16.7667 18.2875V9.93094C16.7667 9.54793 16.2915 9.23456 15.7108 9.23456H6.20749C5.62674 9.23456 5.15158 9.54793 5.15158 9.93094V18.2875C5.15158 18.6705 5.62674 18.9838 6.20749 18.9838Z'))

        return container
      }

      function close() {
        const container = document.createElement('div')
        container.setAttribute('class', 'window' + clientClass)
        container.setAttribute('id', 'close')
        container.appendChild(createSVG('25', '25', '0 0 25 25', 'M19.0625 5.94786C18.6562 5.54161 18 5.54161 17.5937 5.94786L12.5 11.0312L7.40625 5.93744C7 5.53119 6.34375 5.53119 5.9375 5.93744C5.53125 6.34369 5.53125 6.99994 5.9375 7.40619L11.0312 12.4999L5.9375 17.5937C5.53125 17.9999 5.53125 18.6562 5.9375 19.0624C6.34375 19.4687 7 19.4687 7.40625 19.0624L12.5 13.9687L17.5937 19.0624C18 19.4687 18.6562 19.4687 19.0625 19.0624C19.4687 18.6562 19.4687 17.9999 19.0625 17.5937L13.9687 12.4999L19.0625 7.40619C19.4583 7.01036 19.4583 6.34369 19.0625 5.94786Z'))

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

document.querySelector('#minimize > svg').addEventListener('click', () => {
  if (isClient) {
    window.ipcRenderer.send('minimizeApp')
  }
})
