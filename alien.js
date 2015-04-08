var create_projectile = require('./projectile.js')

module.exports = function create_alien(_x,_y,parent){

  var x = _x
  var y = _y

  parent.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 10)

  function shoot(){
    window.projectiles.push(create_projectile(x+window.offset_x,y+window.offset_y))
  }

  function tick(){

  }

  return {
    shoot: shoot,
    tick: tick
  }

}
