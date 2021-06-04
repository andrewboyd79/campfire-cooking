/*
Materialize jQuery - taken from materializecss.com
*/
$(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.materialboxed').materialbox();
    $('.slider').slider({indicators: false, height: 550});
    $('.modal').modal();
    $('.tooltipped').tooltip()
    
  });

/*
Code taken & amended from stackoverflow post/solution 
(https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter)
*/
$(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
})

$('#flash-close').on('click',function(){
    $(this).parent().fadeOut(500)})