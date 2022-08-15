var flag_nav = false
var flag_panel = false

function openNav() {
  flag_nav = true;
  if (flag_panel === true) {
    closePanel()
  }
  document.getElementById("mySidenav").style.width = "13%";
  document.getElementById("map").style.width = "87%";
}

function closeNav() {
  flag_nav = false;
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("map").style.width = "99%";
}

function openPanel() {
  flag_panel = true;
  if (flag_panel === true) {
    closeNav()
  }
  document.getElementById("mySidepanel").style.width = "26%";
  document.getElementById("map").style.width = "74%";
}

function closePanel() {
  flag_panel = false;
  document.getElementById("mySidepanel").style.width = "0";
  document.getElementById("map").style.width = "99%";
}