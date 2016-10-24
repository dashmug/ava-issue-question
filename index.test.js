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
    // result is null
    t.truthy(err)
    t.falsy(result)
    // It should already fail on the following line.
    t.true(_.has(result, 'data'))
    // AVA raises a "TypeError: Cannot read property 'data' of undefined" on the
    // next line. Why? Shouldn't it fail in the previous line?
    t.is(result.data, 'Success')
    t.end()
  })
})
