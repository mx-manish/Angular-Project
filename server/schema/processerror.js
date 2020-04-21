var ErrorFormatter = function () {
  return this
}

// const _forEach = require('lodash.foreachright');
const _first = require('lodash.first');
ErrorFormatter.prototype.generate = function (result, errorStore) {
  const v = _first(result);

  var errorMessage = v.stack.replace('instance.', '')
  var failedAttribute = v.name
  var prop = v.property.replace(/((.*)\.)|(\[[^\d]*(\d+)[^\d]*\])/g, '')
  var finalMessage = 'Validation failed'
  if (typeof errorStore[prop] != 'undefined' && typeof errorStore[prop][failedAttribute] != 'undefined') {
    finalMessage = errorStore[prop][failedAttribute]
  } else {
    finalMessage = errorMessage
  }

  return finalMessage

  // var errors = {}
  // _forEach(result, function (v) {
  //   var errorMessage = v.stack.replace('instance.', '')
  //   var failedAttribute = v.name
  //   var prop = v.property.replace(/((.*)\.)|(\[[^\d]*(\d+)[^\d]*\])/g, '') // .replace(//g, '') // [\[{0-9}\]']
  //   console.log(prop)
  //   var finalMessage = 'Validation failed'
  //   if (typeof errorStore[prop] != 'undefined' && typeof errorStore[prop][failedAttribute] != 'undefined') {
  //     finalMessage = errorStore[prop][failedAttribute]
  //   } else {
  //     finalMessage = errorMessage
  //   }

  //   // console.log(errorStore[prop], prop)
  //   errors[prop] = finalMessage
  // })

  // var error = {
  //   status: 400,
  //   faults: errors
  // }

  // return error
}

function processError() {
  var error = new ErrorFormatter()

  return error.generate.apply(error, Array.prototype.slice.call(arguments))
}

module.exports = exports = {
  processError
}