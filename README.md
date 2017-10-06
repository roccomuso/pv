# pv

[![NPM Version](https://img.shields.io/npm/v/pv.svg)](https://www.npmjs.com/package/pv)
[![Dependency Status](https://david-dm.org/roccomuso/pv.png)](https://david-dm.org/roccomuso/pv)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<span class="badge-patreon"><a href="https://patreon.com/roccomuso" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>

Unix Pipe Viewer (pv) utility in Node.js

> Pipe viewer is a terminal-based tool for monitoring the progress of data through a pipeline. It can be inserted into any normal pipeline between two processes to give a visual indication of how quickly data is passing through, how long it has taken, how near to completion it is, and an estimate of how long it will be until completion.


## Install

    $ npm install -g pv

## Example usage

    $ cat /dev/urandom | pv --size 100MB > /dev/null

Example output:

    45.02% | 5 ETA | 42.94MB Transferred | 9.54MB/s

Stats are updated every second.

## Available CLI options

- `-s, --size <size>`: Assume the total amount of data to be transferred is SIZE. You can provide a size in bytes or using units (`b, kb, mb, gb, tb`).
- `-N, --name <name>`: Prefix the output information with NAME.

## Programmatic usage

```javascript
var PV = require('pv');
var pv = PV({
  size: /* ... */,
  name: /* ... */,
  time: /* Sets how often progress events are emitted in ms. If omitted then the default is to do so every time a chunk is received. */
})

pv.on('info', function(str){
  process.stderr.write(JSON.stringify(str))
  /*
  {
    name: 'test',
    percentage: 9.05,
    transferred: 949624,
    eta: 42,
    speed: 949624
  }
  */
})

process.stdin.pipe(pv).pipe(process.stdout)
```

## Author

Rocco Musolino ([@roccomuso](https://twitter.com/roccomuso))

## License

MIT
