#!/usr/bin/env node

const PV = require('../index')
const bytes = require('bytes')
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    size: 's',
    name: 'N',
    version: 'v'
  }
})

if (argv.v) {
  console.log('v' + require('../package.json').version)
  process.exit(0)
}

const pv = PV({
  name: argv.name,
  size: bytes.parse(argv.size),
  time: 1000
})

pv.on('info', (info) => {
  const name = info.name ? info.name + ': ' : ''
  const percentage = info.percentage + '%'
  const speed = info.speed + '/s'
  const transferred = info.transferred + ' Transferred'
  const eta = info.eta + ' ETA'
  stderr(`${name} ${percentage} | ${eta} | ${transferred} | ${speed}`)
})

process.stdin.pipe(pv).pipe(process.stdout)

// print on stderr
function stderr (str) {
  if (process.stderr.isTTY) {
    process.stderr.clearLine() // clear current text
    process.stderr.cursorTo(0) // move cursor to beginning of line
    process.stderr.write(str)
  } else {
    // no cursor control available (e.g. stderr redirected to a file/pipe),
    // so fall back to one line per update instead of crashing
    process.stderr.write(str + '\n')
  }
}
