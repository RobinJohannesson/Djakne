/*sorteringsknappar*/
$(".sort").click(function () {
    $(".sort").removeClass("active");
    $(this).addClass("active");
});
/* Kategori-diven */
$("#kat-div").slideUp();
$("#kategori").click(function () {
    $("#kat-div").slideToggle();
});
/* Email Sign-up form */
$("#email-form-div").slideUp();
$("#email-btn").click(function () {
    $("#email-btn").toggleClass("color-grey color-white");
    $("#email-form-div").slideToggle();
});