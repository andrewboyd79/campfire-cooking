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
    $(this).parent().fadeOut(500)});

$('#add-method-step').on('click', function(){
    $('#methods-form').append(`<i class="material-icons right method-delete">cancel</i>
    <input placeholder="Please list the method steps..." id="" name="method"
                                type="text" class="validate">`)
});

$('#add-ingredient').on('click', function(){
    $('#ingredients-form').append(`<i class="material-icons right ingredient-delete">cancel</i>
    <input placeholder="Please list the recipe ingredients..." id="" name="ingredients"
    type="text" class="validate">`)
});

$('.ingredient-delete').on('click', function(){
    $(this).next().remove();
    $(this).remove()
});

$('.method-delete').on('click', function(){
    $(this).next().remove();
    $(this).remove()
});
