'use strict'
const _ = require('lodash')
const test = require('ava')


function handler(isError, callback) {
  if (isError) {
    return setTimeout(callback, 10, "Error")
  }
  return setTimeout(callback, 10, null, 'Success')
}


test.cb('handler(false) should succeed', t => {
  handler(false, (err, result) => {
    // err is null
    t.is(err, null)
    t.is(result, 'Success')
    t.end()
  })
})


test.cb('handler(true) should succeed', t => {
  handler(true, (err, result) => {
    // err is "Error"
    t.truthy(err)
    t.falsy(result)
    t.true(_.has(result, 'data'))
    t.is(result.data, 'Success')
    t.end()
  })
})
