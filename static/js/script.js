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

  validateMaterializeSelect();

  function validateMaterializeSelect() {
      let classValid = {
          "border-bottom": "1px solid #4caf50",
          "box-shadow": "0 1px 0 0 #4caf50"
      };
      let classInvalid = {
          "border-bottom": "1px solid #f44336",
          "box-shadow": "0 1px 0 0 #f44336"
      };
      if ($("select.validate").prop("required")) {
          $("select.validate").css({
              "display": "block",
              "height": "0",
              "padding": "0",
              "width": "0",
              "position": "absolute"
          });
      }
      $(".select-wrapper input.select-dropdown").on("focusin", function () {
          $(this).parent(".select-wrapper").on("change", function () {
              if ($(this).children("ul").children("li.selected:not(.disabled)").on("click", function () {})) {
                  $(this).children("input").css(classValid);
              }
          });
      }).on("click", function () {
          if ($(this).parent(".select-wrapper").children("ul").children("li.selected:not(.disabled)").css("background-color") === "rgba(0, 0, 0, 0.03)") {
              $(this).parent(".select-wrapper").children("input").css(classValid);
          } else {
              $(".select-wrapper input.select-dropdown").on("focusout", function () {
                  if ($(this).parent(".select-wrapper").children("select").prop("required")) {
                      if ($(this).css("border-bottom") != "1px solid rgb(76, 175, 80)") {
                          $(this).parent(".select-wrapper").children("input").css(classInvalid);
                      }
                  }
              });
          }
      });
  };