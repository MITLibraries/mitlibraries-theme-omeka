/*
This file relates to the site navigation provided by the theme. This
feature is described in the theme documentation at:

docs/reference/navigation.md
*/

import accessibleMenu from "https://esm.sh/accessible-menu@4.0.1";

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#navbar-container nav");
  const menuElement = nav.querySelector("ul");
  const controllerElement = nav.querySelector("#navbar-toggle");

  const menu = new accessibleMenu.TopLinkDisclosureMenu({
    menuElement,
    submenuItemSelector: ".dropdown",
    submenuSubtoggleSelector: "button",
    containerElement: nav,
    controllerElement,
    optionalKeySupport: true,
    hoverType: "off" // "on", "dynamic"
  });
});
