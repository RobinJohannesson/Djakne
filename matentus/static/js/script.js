function showMenu() {
    var menu = document.getElementById("side_menu"),
        menu_icon = document.getElementById("menu_btn");
    if (menu.style.display == "block") {
        menu.style.display = "none";

    } else {
        menu.style.display = "block";
        menu_icon.style.display = "none";
    }
    console.log("hej");
}
$("#menu_btn").click(showMenu);


function hideMenu() {
    var menu = document.getElementById("side_menu"),
        menu_icon = document.getElementById("menu_btn");
    menu.style.display = "none";
    menu_icon.style.display = "";

}

$("#close_btn").click(hideMenu);
$(".category").click(hideMenu);
