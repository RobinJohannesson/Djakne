

function showMenu(){
	var menu = document.getElementById("side_menu")
    var menu_icon = document.getElementById("menu_btn")
	if(menu.style.display == "block"){
		menu.style.display = "none";
        
	}else{
		menu.style.display = "block";
        menu_icon.style.display = "none";
	}  
    console.log("hej")
}
document.getElementById("menu_btn").addEventListener("click", showMenu);


function hideMenu(){
	var menu = document.getElementById("side_menu")
    var menu_icon = document.getElementById("menu_btn")
    menu.style.display = "none";
    menu_icon.style.display = "";
    
	}
   
document.getElementById("close_btn").addEventListener("click", hideMenu);




