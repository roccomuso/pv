#!/usr/bin/env node

var PV = require('../index')
var bytes = require('bytes')
var argv = require('minimist')(process.argv.slice(2), {alias: {
  'size': 's',
  'format': 'f',
  'name': 'N',
  'version': 'v'
}})

if (argv.v) {
  console.log('v' + require('../package.json').version)
  process.exit(0)
}

var pv = PV({
  name: argv.name,
  size: bytes.parse(argv.size),
  time: 1000
})

pv.on('info', function (info) {
  var name = info.name ? info.name + ': ' : ''
  var percentage = info.percentage + '%'
  var speed = info.speed + '/s'
  var transferred = info.transferred + ' Transferred'
  var eta = (argv.format ? formatEta(info.eta) : info.eta) + ' ETA'
  stderr(`${name} ${percentage} | ${eta} | ${transferred} | ${speed}`)
})

process.stdin.pipe(pv).pipe(process.stdout)

// print on stderr
function stderr (str) {
  process.stderr.clearLine() // clear current text
  process.stderr.cursorTo(0) // move cursor to beginning of line
  process.stderr.write(str)
}

function formatEta (eta) {
  var days = Math.floor(eta / (60 * 60 * 24))
  var hours = Math.floor(eta / (60 * 60)) % 24
  var minutes = Math.floor(eta / 60) % 60
  var seconds = Math.floor(eta) % 60

  if (days) {
    return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's'
  } else if (hours) {
    return hours + 'h ' + minutes + 'm ' + seconds + 's'
  } else if (minutes) {
    return minutes + 'm ' + seconds + 's'
  } else {
    return seconds + 's'
  }
}
