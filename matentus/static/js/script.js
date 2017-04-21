function showMenu() {
    var menu = document.getElementById("side_menu"),
        menu_icon = document.getElementById("burger");

    menu.style.display = "block";
    menu_icon.style.transform = "scale(0)";
}
$("#burger").click(showMenu);


function hideMenu() {
    var menu = document.getElementById("side_menu"),
        menu_icon = document.getElementById("burger");
    menu.style.display = "none";
    menu_icon.style.transform = "scale(1)";
}
$("#close_btn").click(hideMenu);
$(".category").click(hideMenu);