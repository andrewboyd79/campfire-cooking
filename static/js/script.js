$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.carousel').carousel();
    $('select').formSelect();
    
  });

$(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
})

