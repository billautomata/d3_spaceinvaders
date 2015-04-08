var d3 = require('d3')

var create_alien = require('./alien.js')
var create_cloud = require('./cloud.js')

// global game objects
window.projectiles = []
// window.bboxes = []
window.clouds = []

window.w = 1024
window.h = 768

window.svg = d3.select('body').append('svg')
  .attr('width', 1024)
  .attr('height', 768)
  .style('background-color','green')

window.rng = d3.random.normal(0,0.5)

// ////////////////////////////////////
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

window.offset_x = (0.5*(w-alien_w))
window.offset_y = (h*0.1)
var shift_x_dir = 1

var g_alien_parent = svg.append('g')
  .attr('transform', 'translate('+offset_x+' ' +offset_y+')')

for(var i = 0; i < n_aliens; i++){

  var alien_row = Math.floor(i/aliens_per_row)
  var alien_col = i - (alien_row * aliens_per_row)
  aliens.push(create_alien(scale_x_alien(alien_col),scale_y_alien(alien_row),g_alien_parent))

}

// ////////////////////////////////////
// clouds
var n_clouds = 8

var clouds_w = w * 0.8
var clouds_h = h * 0.1

var circle_size = w*0.02

var g_clouds_parent = svg.append('g')
  .attr('transform', 'translate('+(0.5*(w-clouds_w))+' ' +(h*0.8)+')')

var scale_x_clouds = d3.scale.linear().domain([0,n_clouds-1]).range([0,clouds_w])

for(i = 0; i < n_clouds; i++){

  var g_local_clouds = g_clouds_parent.append('g')
    .attr('transform', 'translate('+(scale_x_clouds(i)) +' '+(0)+')')

  for(var j = 0; j < 16; j++){

    window.clouds.push(create_cloud(g_local_clouds))
  }

}

svg.on('mousemove', function(){
})

// ////////////////////////////////////
// player
var player = {}

// ////////////////////////////////////
// ////////////////////////////////////
// ////////////////////////////////////
function game_tick(){

  aliens.forEach(function(alien){

    if(Math.random()<0.01){
      alien.shoot(window.projectiles)
    }

  })

  window.offset_x += shift_x_dir
  if(window.offset_x > w*0.5){
    window.offset_x = w*0.5
    shift_x_dir *= -1

    window.offset_y += 10

  } else if (window.offset_x < 0){
    window.offset_x = 0
    shift_x_dir *= -1

    window.offset_y += 10

  }

  // shift the alien parent box
  g_alien_parent.attr('transform', 'translate('+window.offset_x+' ' +window.offset_y+')')

  window.projectiles = window.projectiles.filter(function(e){
    return e.alive();
  })

  // console.log('projectiles count ' + projectiles.length)

  // tick all the alive projectiles
  window.projectiles.forEach(function(p){
    p.tick()
  })

  window.requestAnimationFrame(game_tick)
}
game_tick()
