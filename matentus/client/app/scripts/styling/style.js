$(".sort").click(function () {
    $(".sort").removeClass("active");
    $(this).addClass("active");
});

$("#kat-div").slideUp();
$("#kategori").click(function () {
    $("#kat-div").slideToggle();
});
$("#email-form-div").slideUp();
$("#email-btn").click(function () {
    $("#email-btn").toggleClass("color-grey color-white");
    $("#email-form-div").slideToggle();
});