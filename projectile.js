module.exports = function create_projectile(_x,_y){

  var x = _x
  var y = _y
  var speed = Math.random()*3+2
  var dead = false

  var g = window.svg.append('circle')
    .attr('cx',x)
    .attr('cy',y)
    .attr('r',3)
    .attr('fill','blue')
    .attr('fill-opacity',1)

  function tick(){

    y += speed

    if(y > h){
      dead = true
    }

    g.attr('cy',y)

    window.clouds.forEach(function(element,idx){

      var e = element.bbox()

      if(x > e.left && x < (e.left+e.width)){
        if(y > e.top && y < (e.top+e.height)){
          dead = true
          g.transition().attr('r', 30).attr('fill-opacity',0).remove()
          element.explode()
        }
      }

    })
  }

  function alive(){
    return !dead;
  }


  return {
    tick: tick,
    alive: alive
  }

}
