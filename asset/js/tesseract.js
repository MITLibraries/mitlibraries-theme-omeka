import accessibleMenu from "https://esm.sh/accessible-menu@4.0.1";

document.addEventListener("DOMContentLoaded", () => {
  var nav = document.querySelector("#navbar-container");
  var menuElement = nav.querySelector("ul");
  var controllerElement = nav.querySelector("#navbar-toggle");

  var menu = new accessibleMenu.Menubar({
    menuElement,
    submenuItemSelector: ".dropdown",
    containerElement: nav,
    controllerElement,
    optionalKeySupport: true,
    hoverType: "off" // "on", "dynamic"
  });
});
