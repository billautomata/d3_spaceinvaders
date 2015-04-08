module.exports = function(parent){

  var circle_size = 30
  var x = w * Math.random()
  var y = (h*0.8) + Math.random()*circle_size*2

  var r = (Math.random()*(circle_size*0.5)) + (circle_size*0.5)

  var cloud = svg.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', r)
    .attr('fill', 'white')
    .attr('fill-opacity', 0.6)

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
    r = r - 1
    _bbox = {
      height: r*2,
      width: r*2,
      left: x-r,
      top: y-r
    }

    cloud.transition().attr('fill', 'red').attr('r',r)

  }

  return {
    bbox: bbox,
    explode: explode
  }


}
