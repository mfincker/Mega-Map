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
  free_grocery : 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'grocery' AND free = 1",
  meal : 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'meal'",
  snap_wic_retailer: 'SELECT * FROM ' + cartoDBName + " WHERE resource = 'grocery' AND free = 0"
}
