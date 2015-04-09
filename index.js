var d3 = require('d3')

var create_alien = require('./alien.js')
var create_cloud = require('./cloud.js')
var create_service = require('./service.js')
var create_player = require('./player.js')
// global game objects
window.projectiles = []
window.clouds = []
window.services = []

window.w = 1024
window.h = 768

window.svg = d3.select('body').append('div').append('svg')
  .attr('width', window.w)
  .attr('height', window.h)
  .attr('viewBox', '0 0 1024 768')
  .attr('preserveAspectRatio', 'xMidYMid')
  .style('background-color', d3.rgb(244,244,244))
  .style('width', Math.floor(window.w)+'px')
  .style('height', Math.floor(window.h)+'px')
  .style('display', 'block')
  .style('margin', 'auto')

window.offset_left = document.getElementsByTagName('svg')[0].offsetLeft


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
// services
for(var k = 0; k < 12; k++){
  window.services.push(create_service())
}

// ////////////////////////////////////
// clouds
for(var j = 0; j < 64; j++){
  // window.clouds.push(create_cloud())
}




// ////////////////////////////////////
// player
var player = create_player()





// ////////////////////////////////////
// ////////////////////////////////////
// ////////////////////////////////////
function game_tick(){

  aliens.forEach(function(alien){

    if(Math.random()<0.01){
      alien.shoot(window.projectiles)
    }

  })

  if(Math.random()<0.01){
    window.services.push(create_service())
  }


  window.offset_x += shift_x_dir
  if(window.offset_x > w*0.65){
    window.offset_x = w*0.65
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

  window.services = window.services.filter(function(e){
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
