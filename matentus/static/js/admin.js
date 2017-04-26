//show page content admin
$(document).ready(function(){
    $("#add_product_btn").click(function(){
        $("#admin_add_product").css("display", "block");
        $("#admin_request").css("display", "none");
        $("#admin_manage_product").css("display", "none");
        $("#admin_categories").css("display", "none");
    });
});

$(document).ready(function(){
    $("#product_request_btn").click(function(){
        $("#admin_request").css("display", "block");
        $("#admin_categories").css("display", "none");
        $("#admin_manage_product").css("display", "none");
        $("#admin_add_product").css("display", "none");
    });
});

$(document).ready(function(){
    $("#manage_product_btn").click(function(){
        $("#admin_manage_product").css("display", "block");
        $("#admin_request").css("display", "none");
        $("#admin_categories").css("display", "none");
        $("#admin_add_product").css("display", "none");
    });
});

$(document).ready(function(){
    $("#manage_cat_btn").click(function(){
        $("#admin_categories").css("display", "block");
        $("#admin_request").css("display", "none");
        $("#admin_manage_product").css("display", "none");
        $("#admin_add_product").css("display", "none");
    });
});

//below follows lines of code for showing the right kind of form when adding new category. 
$(document).ready(function(){
    $("#new_category").click(function(){
        $(".cat_radio_choice").css("display", "block");

    });
});

$(document).ready(function(){
    $("#main_cat_choice").click(function(){
        $(".main_cat_div").css("display", "block");
        $(".sub_cat_div").css("display", "none");
    });
});

$(document).ready(function(){
    $("#sub_cat_choice").click(function(){
        $(".sub_cat_div").css("display", "block");
        $(".main_cat_div").css("display", "none");
    });
});

//controls the menu marking. 
$(".admin_btn").click(function () {
    $(".admin_btn").removeClass("active");
    $(this).addClass("active");
});

//image preview
 function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#img_preview')
                        .attr('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

//delete alert
$(document).ready(function(){
    $(".fa-trash-o").click(function(){
        confirm("Är du säker på att du vill ta bort produkten?");
        var txt;


    });
});

//show form when pencil clicked
$(document).ready(function(){
    $(".fa-pencil").click(function(){
        $(".manage_form").css("display", "block");
        
    });
});