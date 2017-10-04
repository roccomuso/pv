var bytes = require('bytes')
var progress = require('progress-stream')

/*
Options:
 - size: length of the stream
 - time: print speed updated every tot ms (default: 100ms)
*/

module.exports = function (opts) {
  opts = opts || {}
  var str = progress({
    length: opts.size,
    time: opts.time || 100 // ms
  })

  str.on('progress', function (progress) {
/*
{
  percentage: 9.05,
  transferred: 949624,
  length: 10485760,
  remaining: 9536136,
  eta: 42,
  runtime: 3,
  delta: 295396,
  speed: 949624
}
*/
    str.emit('info', {
      name: opts.name || null,
      percentage: progress.percentage <= 100
        ? progress.percentage.toFixed(2)
        : 100,
      speed: bytes(Math.floor(progress.speed)),
      transferred: bytes(progress.transferred),
      eta: progress.eta || 0
    })
  })

  return str
}
