export const dayAny = 7

export const weekdays = [
  { day: 'any', pos: dayAny },
  { day: 'monday', pos: 1 },
  { day: 'tuesday', pos: 2 },
  { day: 'wednesday', pos: 3 },
  { day: 'thursday', pos: 4 },
  { day: 'friday', pos: 5 },
  { day: 'saturday', pos: 6 },
  { day: 'sunday', pos: 0 }
]

export const weekdaysJs = [
  { day: 'sunday' },
  { day: 'monday' },
  { day: 'tuesday' },
  { day: 'wednesday' },
  { day: 'thursday' },
  { day: 'friday' },
  { day: 'saturday' }
]

export const weekdayHours = [
  { day: 'monday' },
  { day: 'tuesday' },
  { day: 'wednesday' },
  { day: 'thursday' },
  { day: 'friday' },
  { day: 'saturday' },
  { day: 'sunday' }
]

export const openStreetMapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

export const dayFilters = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat'].map((attr) => `${attr}`)
export const seniorDayFilters = ['sun', 'mon', 'tues', 'wed', 'thr', 'fri', 'sat'].map((attr) => `sp_${attr}`)

export const booleanFilters = [
  'in_store_pickup',
  'curbside',
  'special_hours',
  'meal_student',
  'meal_public',
  'family_meal',
  'order_online',
  'pay_online',
  'must_preorder',
  'discount_medical',
  'delivery',
  'free_produce',
  'free_groceries',
  'farm_pick_up',
  'farmers_market',
  'free',
  'wic',
  'snap',
  'call_in_advance',
  'seniors',
  'children',
  'public'
]

// Combination of boolean filters
export const complexFilters = [
  { name: 'curbside_or_delivery', columns: ['curbside', 'delivery'], combine: ([a, b]) => a || b },
  { name: 'safe_pick_up', columns: ['curbside', 'delivery'], combine: ([a, b]) => a || b },
]

// CARTO DB VARIABLES
export const cartoBaseURL = 
  // 'https://mfincker.carto.com/api/v2/sql?api_key=' + process.env.VUE_APP_CARTO_API_KEY
  'https://mfincker.carto.com/api/v2/sql?'

export const cartoDBName = 'mega_map_db'

export const sqlQueries = {
  free_grocery : 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'grocery' AND free = 1 AND status = 1",
  meal : 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'meal'",
  snap_wic_retailer: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'grocery' AND free = 0 AND status = 1",
  // legal_general_info: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'legal_general_info'",
  legal_assistance: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'legal_assistance' AND status = 1",
  mental_health: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'mental_health' AND status = 1",
  medical_in_person: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'medical_in_person' AND status = 1",
  medical_telehealth: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'medical_telehealth' AND status = 1"
}

export const countyLatLon = {
  'anywhere': { lat: 37.594, lon: -122.223, zoom: 8 },
  'alameda': { lat: 37.8097, lon: -122.25328, zoom: 11 },
  'contra-costa': { lat: 37.897914, lon: -122.070408, zoom: 11 },
  'marin': { lat: 38.031900, lon: -122.665367, zoom: 11 },
  'napa': { lat: 38.417836, lon: -122.380023, zoom: 11 },
  'san-francisco': { lat: 37.7749, lon: -122.4194, zoom: 11 },
  'san-mateo': { lat: 37.529076, lon: -122.308764, zoom: 11 },
  'santa-clara': { lat: 37.308325, lon: -121.859261, zoom: 11 },
  'solano': { lat: 38.258686, lon: -122.014371, zoom: 11 },
  'sonoma': { lat: 38.481106, lon: -122.797838, zoom: 11 },
}




