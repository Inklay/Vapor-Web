function footer() {
  const valveLogo = document.querySelector('.footer_content #footer_logo')
  const steamLogo = document.querySelector('.footer_content #footer_logo_steam')
  const copyrightText = `${document.querySelectorAll('#footer_text div')[0]?.innerText} ${document.querySelectorAll('#footer_text div')[1]?.childNodes[0].textContent}`
  let twiterUrl
  let facebookUrl
  const links = []

  document.querySelectorAll('#footer_text div a').forEach(value => links.push(value))
  document.querySelectorAll('#footer .valve_links a').forEach((value, index) => {
    if (index < 5) {
      links.push(value)
    } else if (index === 6) {
      facebookUrl = value.getAttribute('href')
    } else if (index === 7) {
      twiterUrl = value.getAttribute('href')
    }
  })

  function copyright() {
    function logos() {
      const container = document.createElement('div')
      container.setAttribute('class', 'logos')
      container.appendChild(valveLogo)
      steamLogo.innerHTML = steamLogoSVG
      container.appendChild(steamLogo)

      return container
    }

    function text() {
      const container = document.createElement('div')
      container.setAttribute('class', 'copyright_text')
      container.innerHTML = copyrightText

      return container
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'copyright')
    container.appendChild(logos())
    container.appendChild(text())

    return container
  }

  function linksContainer() {
    let idx = 0

    function addColumn() {
      const container = document.createElement('div')
      container.setAttribute('class', 'link_container')

      for (let i = 0; i < 5; i++) {
        container.appendChild(links[idx])
        idx++
      }

      return container
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'links')
    for (let i = 0; i < 2; i++) {
      container.appendChild(addColumn())
    }

    return container
  }

  function socialLinks() {
    function facebook() {
      const link = document.createElement('a')
      link.setAttribute('href', facebookUrl)
      link.appendChild(createSVG('24', '24', '0 0 14 26', svg.facebook))

      return link
    }

    function twitter() {
      const link = document.createElement('a')
      link.setAttribute('href', twiterUrl)
      link.appendChild(createSVG('24', '24', '0 0 21 22', svg.twiter))

      return link
    }

    const container = document.createElement('div')
    container.setAttribute('class', 'socialLinks')
    container.appendChild(facebook())
    container.appendChild(twitter())

    return container
  }

  const container = document.createElement('div')
  container.setAttribute('class', 'vapor_footer')
  container.appendChild(copyright())
  container.appendChild(linksContainer())
  container.appendChild(socialLinks())
  document.querySelector('#footer').appendChild(container)
}

footer()
