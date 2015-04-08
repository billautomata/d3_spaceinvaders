module.exports = function(parent){

  var circle_size = 30
  var x = window.rng()*circle_size*2
  var y = window.rng()*circle_size*2

  var cloud = parent.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', (Math.random()*(circle_size*0.5)) + (circle_size*0.5))
    .attr('fill', 'white')
    .attr('fill-opacity', 0.6)

  var node = cloud.node()

  var _bbox = node.getBoundingClientRect()

  function bbox(){
    return _bbox
  }

  function explode(){
    cloud.transition().attr('fill', 'red')
  }

  return {
    bbox: bbox,
    explode: explode
  }


}
