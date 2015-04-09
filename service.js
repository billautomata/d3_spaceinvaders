var icon = require('./icons.js')
var service_list = require('./services_list.js')

module.exports = function(){

  var circle_size = 30
  var _bbox = null
  var x = (0.1*window.w) + (window.w*0.8*Math.random())
  var y = (h*0.9)
  var dead = false

  var r = (Math.random()*(circle_size*0.5)) + (circle_size*0.5)
  var scale = 1

  var service = svg.append('g').attr('transform', 'translate('+x+' '+(y+100)+')')
  var g_scale_parent = service.append('g').attr('transform', 'scale(1 1)')
  icon(g_scale_parent,service_list[Math.floor(Math.random()*service_list.length)])

  var node = service.node()

  service.transition()
    .duration(Math.random()*300+1000)
    .ease('bounce')
    .attr('transform', 'translate('+x+' '+y+')')
    .each('end', function(){

      console.log(node.offsetX)
      var _readonlybbox = node.getBoundingClientRect()

      _bbox = {
        width: _readonlybbox.width,
        height: _readonlybbox.height,
        top: _readonlybbox.top ,
        left: _readonlybbox.left - window.offset_left
      }

      // _bbox.left -= _bbox.width * 0.5
      // _bbox.top += _bbox.height * 0.45

    })

  function alive(){
    return !dead;
  }

  function bbox(){
    return _bbox;
  }

  function explode(){

    service.transition().attr('transform', 'translate('+(x)+' '+(y+200)+')')
      .each('end', function(){
        dead = true
      })

  }

  return {
    bbox: bbox,
    explode: explode,
    alive: alive
  }

}
