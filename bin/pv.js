#!/usr/bin/env node

var PV = require('../index')
var bytes = require('bytes')
var argv = require('minimist')(process.argv.slice(2), {alias: {
  'size': 's',
  'name': 'N'
}})

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
  var eta = info.eta + ' ETA'
  stderr(`${name} ${percentage} | ${eta} | ${transferred} | ${speed}`)
})

process.stdin.pipe(pv).pipe(process.stdout)

// print on stderr
function stderr (str) {
  process.stderr.clearLine() // clear current text
  process.stderr.cursorTo(0) // move cursor to beginning of line
  process.stderr.write(str)
}
