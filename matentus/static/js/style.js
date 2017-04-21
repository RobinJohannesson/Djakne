$(".sort").click(function () {
    $(".sort").removeClass("active");
    $(this).addClass("active");
});

$("#kat-div").slideUp();
$("#kategori").click(function () {
    $("#kat-div").slideToggle();
});