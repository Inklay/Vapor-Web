const addToWishlistText = document.querySelector('#add_to_wishlist_area > a > span')?.innerText.trim()
const addedToWishlistText = document.querySelector('#add_to_wishlist_area_success > a > span')?.innerText.trim()
let whislistedElementStyle = document.querySelector('#add_to_wishlist_area')?.getAttribute('style')
let isWhislisted

if (whislistedElementStyle) {
  isWhislisted = whislistedElementStyle.search('none') !== -1
} else {
  isWhislisted = false
}
