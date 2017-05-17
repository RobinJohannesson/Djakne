/*sorteringsknappar*/
$(".sort-btn").click(function () {
    alert("Kay");
    $(".sort-btn").removeClass("sort-active");
    $(this).addClass("sort-active");
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