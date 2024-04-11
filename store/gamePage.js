const addToWishlistText = document.querySelector('#add_to_wishlist_area > a > span')?.innerText.trim()
const addedToWishlistText = document.querySelector('#add_to_wishlist_area_success > a > span')?.innerText.trim()
let whislistedElementStyle = document.querySelector('#add_to_wishlist_area')?.getAttribute('style')
let isWhislisted
let appId

if (whislistedElementStyle) {
  isWhislisted = whislistedElementStyle.search('none') !== -1
} else {
  isWhislisted = false
}

function appHeader() {
  const whishlist = createWhishlistButton(appId, isWhislisted, addToWishlistText, addedToWishlistText)
  addElementAfter(whishlist, '.apphub_OtherSiteInfo')
}

if (document.querySelector('#appHubAppName') != null) {
  appId = document.querySelector('.game_page_background.game').getAttribute('data-miniprofile-appid')
  console.log(appId)
  appHeader()
}
