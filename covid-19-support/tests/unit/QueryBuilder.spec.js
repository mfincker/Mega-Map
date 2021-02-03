import QueryBuilder from '../../src/lib/QueryBuilder'

//only the order and context of the resulting string should matter so we lower everything and remove all whitespace
const TEST_STRING = "SELECT cartodb_id, the_geom, provider_name FROM airtable WHERE provider_name = 'Community Mobile Clinics by Santa Clara County and Valley Medical Center' AND resource = 'health'"
  .toLowerCase()
  .replace(/\s+/g, '')

const DUPLICATE_KEY_TEST_STRING = "SELECT cartodb_id, the_geom, provider_name FROM airtable WHERE status = 1 AND resource IN ('grocery','meal')"
  .toLowerCase()
  .replace(/\s+/g, '')

describe('Query Builder Tests', () => {
  it('Should generate a select query with direct values', () => {
    const generatedQueryString = new QueryBuilder()
      .select('cartodb_id', 'the_geom', 'provider_name')
      .condition(['provider_name', `'Community Mobile Clinics by Santa Clara County and Valley Medical Center'`], ['resource', `'health'`])
      .genStringSelectQuery()
    expect(generatedQueryString.toLowerCase().replace(/\s+/g, '')).toBe(TEST_STRING)
  })

  it('Should generate a select query with passed in values', () => {
    const extraSelections = ['the_geom', 'provider_name']
    const resourcePair = ['resource', `'health'`]
    const generatedQueryString = new QueryBuilder()
      .select('cartodb_id', ...extraSelections)
      .condition(['provider_name', `'Community Mobile Clinics by Santa Clara County and Valley Medical Center'`], resourcePair)
      .genStringSelectQuery()
    expect(generatedQueryString.toLowerCase().replace(/\s+/g, '')).toBe(TEST_STRING)
  })

  it("Should throw 'Selections are necessary choose * if you want everything sent back' Error", () => {
    expect(() => {
      new QueryBuilder()
        .condition(
          ['provider_name', `'Community Mobile Clinics by Santa Clara County and Valley Medical Center'`],
          ['resource', `'health'`]
        )
        .genStringSelectQuery()
    }).toThrow('Selections are necessary choose * if you want everything sent back')
  })

  it("Should throw 'Cannot make empty selections' Error", () => {
    expect(() => {
      new QueryBuilder()
        .select()
        .condition(
          ['provider_name', `'Community Mobile Clinics by Santa Clara County and Valley Medical Center'`],
          ['resource', `'health'`]
        )
        .genStringSelectQuery()
    }).toThrow('Cannot make empty selections')
  })

  it("Should throw 'Cannot create empty conditions' Error", () => {
    expect(() => {
      new QueryBuilder().select('*').condition().genStringSelectQuery()
    }).toThrow('Cannot create empty conditions')
  })

  it('Should compile query with duplicate keys using WHERE IN', () => {
    const generatedQueryString = new QueryBuilder()
      .select('cartodb_id', 'the_geom', 'provider_name')
      .condition(['status', 1], ['resource', `'grocery'`], ['resource', `'meal'`])
      .genStringSelectQuery()
    expect(generatedQueryString.toLowerCase().replace(/\s+/g, '')).toBe(DUPLICATE_KEY_TEST_STRING)
  })
})
