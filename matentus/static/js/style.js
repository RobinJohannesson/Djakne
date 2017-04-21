
$("#kat-div").slideUp();
$(".sort").click(function () {
    $(".sort").removeClass("active");
    $(this).addClass("active");
});

$("#kategori").click(function () {
    $("#kat-div").slideToggle();
});