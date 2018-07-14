;(function(){
  $('.play').click(function(){
    console.log('click')
    $('.vid').css('display', 'block').get(0).play()
  })
})() 