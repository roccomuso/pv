var bytes = require('bytes')
var progress = require('progress-stream')
var noop = function(){}

/*
Options:
 - size: length of the stream
 - time: print speed updated every tot ms (default: 100ms)
*/

module.exports = function (opts) {
  opts = opts || {}
  var str = progress({
	length: opts.size,
	time: opts.time || 100 /* ms */
   })

  str.on('progress', function(progress){
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
     percentage: progress.percentage <= 100 ? progress.percentage.toFixed(2) : 100,
     speed: bytes(Math.floor(progress.speed)),
     transferred: bytes(progress.transferred),
     eta: progress.eta || 0
   })
})

  return str

}

if (!module.parent){
  var PV = module.exports;
  var pv = PV({
    size: 100000000, // TODO: taken from argv
    time: 1000
  })


  // TODO: standalone usage
  pv.on('info', function(info){
    var percentage = info.percentage + '%'
    var speed = info.speed + '/s'
    var transferred = info.transferred + ' Transferred'
    var eta = info.eta + ' ETA'
    stderr(`${percentage} | ${eta} | ${transferred} | ${speed}`)
  })

  process.stdin.pipe(pv).pipe(process.stdout)

  function stderr(str){
    process.stderr.clearLine()  // clear current text
    process.stderr.cursorTo(0)  // move cursor to beginning of line
    process.stderr.write(str)   // print on stderr
  }

}
