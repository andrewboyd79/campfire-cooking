$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.materialboxed').materialbox();
    $('.slider').slider({indicators: false, height: 550});
    
  });

$(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
})

