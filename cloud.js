module.exports = function(){

  var circle_size = 30
  var x = (0.1*window.w) + (window.w*0.8*Math.random())
  var y = (h*0.8) + Math.random()*circle_size*2

  var r = (Math.random()*(circle_size*0.5)) + (circle_size*0.5)

  var cloud = svg.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', r)
    .attr('fill', d3.rgb(255,255,255))
    .attr('fill-opacity', Math.random()*0.1+0.1)

  var node = cloud.node()

  var _bbox = node.getBoundingClientRect()

  _bbox = {
    height: r*2,
    width: r*2,
    left: (x-(r*0.5)),
    top: y-(r*0.5)
  }

  function bbox(){
    return _bbox
  }

  function explode(){
    r -= 2
    r = Math.max(r,0)
    _bbox = {
      height: r*2,
      width: r*2,
      left: x-r,
      top: y-r
    }

    cloud.transition().attr('fill', 'red').attr('r',r)

  }

  function heal(){
    r += 4
    r = Math.min(r, circle_size + (Math.random()*40))
    _bbox = {
      height: r*2,
      width: r*2,
      left: x-r,
      top: y-r
    }

    cloud.transition().attr('fill', 'green').attr('r',r).each('end', function(){
      cloud.transition().attr('fill','white')
    })

  }

  return {
    bbox: bbox,
    explode: explode,
    heal: heal
  }

}
