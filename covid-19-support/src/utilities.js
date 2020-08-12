export function businessIcon(business) {
  switch (business.resource) {
    case 'mental_health':
      return 'fas fa-hand-holding-heart'
    case 'legal_services':
      return 'fas fa-balance-scale-left'
    case 'medical':
      return 'fas fa-briefcase-medical'
    case 'grocery':
      if (business.farmers_market == 1) {
        return 'fas fa-store'
      }
      return 'fas fa-shopping-basket'
    default:
  }

  var cuisine = business.cuisine
  var item = cuisine.indexOf(',') > 0 ? cuisine.toLowerCase().substr(0, cuisine.indexOf(',')).trim() : cuisine.toLowerCase().trim()
  switch (item) {
    case 'burgers':
      return 'fas fa-hamburger'
    case 'cheese':
      return 'fas fa-cheese'
    case 'beer':
    case 'craft beer':
      return 'fas fa-beer'
    case 'pizza':
      return 'fas fa-pizza-slice'
    case 'mexican':
      return 'fas fa-pepper-hot'
    case 'wine':
      return 'fas fa-wine-glass-alt'
    case 'fish':
    case 'seafood':
      return 'fas fa-fish'
    case 'ice cream':
      return 'fas fa-ice-cream'
    case 'texan':
      return 'fas fa-hat-cowboy'
    case 'chicken':
      return 'fas fa-drumstick-bite'
    case 'sandwiches':
      return 'fas fa-bread-slice'
    case 'american':
      return 'fas fa-flag-usa'
    case 'vegan':
    case 'vegetarian':
      return 'fas fa-carrot'
    case 'market':
      return 'fas fa-store'
    default:
      return 'fas fa-utensils'
  }
}

// See: https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript

/**
 * Calculates the haversine distance between point A, and B.
 * @param {number[]} latlngA [lat, lng] point A
 * @param {number[]} latlngB [lat, lng] point B
 * @param {boolean} isMiles If we are using miles, else km.
 */
export function haversineDistance([lat1, lon1], [lat2, lon2], isMiles = false) {
  const toRadian = (angle) => (Math.PI / 180) * angle
  const distance = (a, b) => (Math.PI / 180) * (a - b)
  const RADIUS_OF_EARTH_IN_KM = 6371

  const dLat = distance(lat2, lat1)
  const dLon = distance(lon2, lon1)

  lat1 = toRadian(lat1)
  lat2 = toRadian(lat2)

  // Haversine Formula
  const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.asin(Math.sqrt(a))

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c

  if (isMiles) {
    finalDistance /= 1.60934
  }

  return finalDistance
}

export function sortByName(a, b) {
  var nameA = a.marker.provider_name.toUpperCase() // ignore upper and lowercase
  var nameB = b.marker.provider_name.toUpperCase() // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

export function sortByDistance(a, b) {
  if (a.distance < b.distance) {
    return -1
  }
  if (a.distance > b.distance) {
    return 1
  }

  // names must be equal
  return 0
}

export function addOrRemove(array, item) {
  const exists = array.includes(item)
  if (exists) {
    return array.filter((c) => {
      return c !== item
    })
  } else {
    const result = array
    result.push(item)
    return result
  }
}
