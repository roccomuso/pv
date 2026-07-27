const bytes = require('bytes')
const progress = require('progress-stream')

module.exports = (opts = {}) => {
  const str = progress({
    length: opts.size,
    time: opts.time || 100 // ms
  })

  str.on('progress', (progress) => {
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
