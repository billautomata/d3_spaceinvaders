var icon = require('./icons.js')

module.exports = function create_player(){

  var x = window.w * 0.5
  var y = window.h * 0.9

  var sx = 100
  var sy = sx*0.1

  var g_parent = svg.append('g')
    .attr('transform', 'translate('+x+' '+y+')')

  g_parent.append('rect')
    .attr('x', -sx*0.5)
    .attr('y', -sy*0.5)
    .attr('width', sx)
    .attr('height', sy)
    .attr('fill', 'green')
    .attr('fill-opacity',0)

  var icon_home = g_parent.append('g').attr('transform', 'translate(-50 0)')

  icon(icon_home,'Custom')

  d3.select(window).on('mousemove', function(){
    // console.log(d3.event.x)

    // ['clientX']

    // Object.keys(d3.event).forEach(function(k){
    //   if(k.toLowerCase().indexOf('x') !== -1){
    //     // console.log(k+' : '+d3.event[k])
    //   }
    // })

    // console.log(d3.event)
    x = d3.event.clientX
    g_parent.attr('transform', 'translate('+x+' '+y+')')


  })


}
