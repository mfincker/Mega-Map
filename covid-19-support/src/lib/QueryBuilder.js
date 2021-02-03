import { cartoDBName } from '../constants'

class QueryBuilder {
  _selections = []
  _conditions = []
  _databaseName = cartoDBName

  constructor(databaseName = cartoDBName) {
    this._databaseName = databaseName
  }

  /**
   *
   * @param  {...string} args
   */
  select(...args) {
    if (args.length === 0) {
      throw new Error('Cannot make empty selections')
    }
    this._selections = this._selections.concat(args)
    return this
  }

  /**
   *  Pairs of arguments like ['status', 1]
   * @param  {...any} args
   */
  condition(...args) {
    if (args.length === 0) {
      throw new Error('Cannot create empty conditions')
    }

    const compiledKeys = new Map()
    let compiledStrings = []

    args.forEach(function ([key, val], index) {
      if (compiledKeys.has(key)) {
        compiledKeys.get(key).duplicates.push([key, val, index])
        return
      }

      compiledKeys.set(key, {
        key,
        val,
        index,
        duplicates: []
      })
    })

    compiledKeys.forEach(function (value, key) {
      if (value.duplicates.length >= 1) {
        // handle cases with duplicate values for the same key
        let searchValues = [value.val]
        value.duplicates.forEach(function (duplicatePair) {
          searchValues.push(duplicatePair[1])
        })
        compiledStrings.push(`${key} IN (${searchValues.join(',')})`)
        return
      }
      // handle fields with no duplicates
      compiledStrings.push(`${value.key} = ${value.val}`)
    })

    this._conditions = compiledStrings.map((formattedString, index) => {
      if (index === 0) {
        return `WHERE ${formattedString}`
      }
      return `AND ${formattedString}`
    })

    return this
  }

  genStringSelectQuery() {
    if (this._selections.length <= 0) {
      throw new Error('Selections are necessary choose * if you want everything sent back')
    }

    // return a simple selection or join an array of them
    const selectionString = this._selections.length === 1 ? this._selections[0] : this._selections.join(', ')
    // return a simple condition or join an array of them
    const conditionString = this._conditions.length === 1 ? this._conditions[0] : this._conditions.join(' ')
    return `SELECT ${selectionString} FROM ${this._databaseName} ${conditionString}`
  }
}

export default QueryBuilder
