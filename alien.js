var create_projectile = require('./projectile.js')

module.exports = function create_alien(_x,_y,parent){

  var x = _x
  var y = _y

  var base_opacity = 0.1

  //
  var svg_0 = parent.append('g')
    .attr('transform', 'translate('+x+' '+y+') scale(0.1 0.1)')
    .attr('opacity', base_opacity)

  // parent.append('circle')
  //   .attr('cx', x)
  //   .attr('cy', y)
  //   .attr('r', 10)

  ;var path_1 = svg_0.append('path')
  .attr('fill','#2A8031')
  .attr('d','M-148.1-94.6c23.7-57.3,81.1-99.9,146.6-103.1c93.9-4.6,150.7,112.2,152.4,121  C175.6,54.3,88.5,216.1,5.3,219.2C-90.9,222.7-201.9,35.6-148.1-94.6z')
  ;var path_2 = svg_0.append('path')
  .attr('fill','#FFFFFF')
  .attr('d','M-10.1,6.5C-21,27.7-56.1,22-88.4-6.2s-49.7-68.2-38.8-89.3s46-15.5,78.3,12.7S0.8-14.7-10.1,6.5z')
  ;var path_3 = svg_0.append('path')
  .attr('fill','#FFFFFF')
  .attr('d','M11.8,8.5C22.7,29.7,57.8,24,90.1-4.2s49.7-68.2,38.8-89.3c-10.9-21.2-46-15.5-78.3,12.7S0.9-12.7,11.8,8.5z  ')

  function shoot(){
    svg_0.transition().attr('opacity',1.0).transition().duration(1000).attr('opacity',base_opacity).ease('elastic')
    window.projectiles.push(create_projectile(x+window.offset_x,y+window.offset_y))
  }

  function tick(){

  }

  return {
    shoot: shoot,
    tick: tick
  }

}
