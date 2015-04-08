var d3 = require('d3')

var w = 1024
var h = 768

var svg = d3.select('body').append('svg')
  .attr('width', 1024)
  .attr('height', 768)
  .style('background-color','green')

var rng = d3.random.normal(0,0.5)

// aliens
var alien_w = w * 0.4
var alien_h = h * 0.3

var aliens = []
var n_aliens = 32
var aliens_per_row = 8

var cols = aliens_per_row
var rows = n_aliens / aliens_per_row

var scale_x_alien = d3.scale.linear().domain([0,cols-1]).range([0,alien_w])
var scale_y_alien = d3.scale.linear().domain([0,rows-1]).range([0,alien_h])

var offset_x = (0.5*(w-alien_w))
var offset_y = (h*0.1)
var shift_x_dir = 1

var g_alien_parent = svg.append('g')
  .attr('transform', 'translate('+offset_x+' ' +offset_y+')')

for(var i = 0; i < n_aliens; i++){

  var alien_row = Math.floor(i/aliens_per_row)
  var alien_col = i - (alien_row * aliens_per_row)
  aliens.push(create_alien(scale_x_alien(alien_col),scale_y_alien(alien_row)))

}


function create_alien(_x,_y){

  var x = _x
  var y = _y

  g_alien_parent.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 10)

  function shoot(){
    projectiles.push(create_projectile(x+offset_x,y+offset_y))
  }

  function tick(){

  }

  return {
    shoot: shoot,
    tick: tick
  }

}


// clouds
var n_clouds = 8

var clouds_w = w * 0.8
var clouds_h = h * 0.1

var circle_size = w*0.02

var g_clouds_parent = svg.append('g')
  .attr('transform', 'translate('+(0.5*(w-clouds_w))+' ' +(h*0.8)+')')

var scale_x_clouds = d3.scale.linear().domain([0,n_clouds-1]).range([0,clouds_w])

var clouds = []

for(i = 0; i < n_clouds; i++){

  var g_local_clouds = g_clouds_parent.append('g')
    .attr('transform', 'translate('+(scale_x_clouds(i)) +' '+(0)+')')

  for(var j = 0; j < 16; j++){

    var cloud = g_local_clouds.append('circle')
      .attr('cx', rng()*circle_size*2)
      .attr('cy', rng()*circle_size*2)
      .attr('r', (Math.random()*(circle_size*0.5)) + (circle_size*0.5))
      .attr('fill', 'white')
      .attr('fill-opacity', 0.6)

    clouds.push(cloud)
  }

  // clouds.push(g_local_clouds)

}

var bboxes = []

clouds.forEach(function(cloud){
  var node = cloud.node()
  // console.log(node.clientTop,node.offsetTop)
  // console.log(node.getBoundingClientRect())
  console.log(node.scrollWidth)
  bboxes.push(node.getBoundingClientRect())
  // console.log(Object.keys(d3.select(this).node()))

})

bboxes.forEach(function(bbox){
  return;
  // console.log(bbox.left)

  svg.append('rect')
    .attr('x', bbox.left)
    .attr('y', bbox.top)
    .attr('width', bbox.width)
    .attr('height', bbox.height)
    .attr('fill', 'rgba(0,0,0,0.5)')

})

svg.on('mousemove', function(){
  console.log(d3.event)

  var x = d3.event.x
  var y = d3.event.y

  bboxes.forEach(function(e,idx){

    if(x > e.left && x < (e.left+e.width)){
      if(y > e.top && y < (e.top+e.height)){
        clouds[idx].transition().attr('fill','red')
      }
    }

  })

})


var projectiles = []

function create_projectile(_x,_y){

  var x = _x
  var y = _y
  var speed = Math.random()*3+2
  var dead = false

  var g = svg.append('circle')
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

    bboxes.forEach(function(e,idx){

      if(x > e.left && x < (e.left+e.width)){
        if(y > e.top && y < (e.top+e.height)){
          dead = true
          g.transition().attr('r', 30).attr('fill-opacity',0).remove()
          clouds[idx].transition().attr('fill','red')
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

window.foo = function(){
  projectiles.push(create_projectile(Math.random()*w, 100))
}


var player = {}

function game_tick(){

  aliens.forEach(function(alien){

    if(Math.random()<0.01){
      alien.shoot()
    }

  })

  offset_x += shift_x_dir
  if(offset_x > w*0.5){
    offset_x = w*0.5
    shift_x_dir *= -1

    offset_y += 10

  } else if (offset_x < 0){
    offset_x = 0
    shift_x_dir *= -1

    offset_y += 10

  }

  g_alien_parent
    .attr('transform', 'translate('+offset_x+' ' +offset_y+')')



  // if(Math.random()<0.05){
    //window.foo(Math.random()*w, 100)
  // }

  projectiles = projectiles.filter(function(e){
    return e.alive();
  })

  // console.log('projectiles count ' + projectiles.length)

  // tick all the alive projectiles
  projectiles.forEach(function(p){
    p.tick()
  })

  window.requestAnimationFrame(game_tick)
}
game_tick()
