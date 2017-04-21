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



$(".admin_btn").click(function () {
    $(".admin_btn").removeClass("active");
    $(this).addClass("active");
});


