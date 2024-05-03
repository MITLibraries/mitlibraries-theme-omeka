/*
This file relates to the navigation menu. It expects to find simple markup, like
what Omeka builds by default. It then builds the markup needed for the user to
interact with, and attaches event listeners to the elements which were just
built.
*/

let i = 1;

// This function defines the button element which acts as the toggle for showing
// and hiding a sub-menu. It includes the creation of any ARIA attributes needed
// as well as any event listeners.
function NewToggle(visibility, labelValue) {
    const toggle = document.createElement('button');
    toggle.classList.add('toggle');
    toggle.setAttribute('aria-expanded', visibility);
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-labelledby', labelValue);
    toggle.addEventListener("click", CatchButton);
    return toggle;
}

// This is the primary function called to make the entire menu happen. It takes
// in the DOM element containing the navigation, scans for _all_ lists, and then
// decorates them. That decoration adds the toggle elements to show/hide sub-
// menus, as well as the event listeners which the user interacts with.
// 
// When this function finishes, the menu is ready to use.
function Decorate(container) {
    let menus = container.getElementsByTagName('ul');
    $(menus).each(function(index, menu) {
        labelValue = '';
        if (menu.previousElementSibling) {
            labelValue = 'item-' + i;
            menu.previousElementSibling.setAttribute('id', labelValue);
        }
        let vis = index ? false : true;
        thing = NewToggle(vis, labelValue);
        menu.parentNode.insertBefore(thing, menu);
        if (!vis) {
            menu.setAttribute("hidden", "");
        }
        i++;
    });
    container.addEventListener("keyup", CatchEscape);
    // For mobile screens, we toggle the navigation to be hidden by default.
    if (window.innerWidth < 768) {
        ToggleMenu(menus[0]);
    }
}

// This is an event handler that receives user input when they click on a button
// and updates the relevant menu.
function CatchButton (e) {
    if (!(e.target instanceof HTMLButtonElement)) return;

    e.preventDefault();
    const menu = e.target.nextElementSibling;
    ToggleMenu(menu);
}

// This is an event handler that receives keyup events, checks whether it was
// the escape key, and then closes the menu which has focus. The event handler
// is attached to the navigation menu container during the Decorate function.
function CatchEscape(e) {
    if (!(e.keyCode === 27)) return;

    // e.target is the element that has focus. Check if that is in
    // a menu, and close it if so. Because of where the event listener is
    // attached (on the navigation menu container), this guard clause _should_
    // never be activated - the only targets which get focus should be links in
    // the nav menu.
    if (!(e.target.parentNode.parentNode instanceof HTMLUListElement)) {
        return;
    }

    Initialize(e.target.parentNode.parentNode);

    // Set the browser focus on the toggle which has effectively just been
    // triggered.
    e.target.parentNode.parentNode.previousElementSibling.focus();
}

// The initalize function will take a container and set all of the lists inside
// to the initial state (collapsed).
function Initialize(container) {
    let menus = container.getElementsByTagName('ul');
    $(menus).each(function(index, menu) {
        menu.setAttribute("hidden", "");
        menu.previousElementSibling.setAttribute("aria-expanded", "false");
    });
    // As long as we aren't at the top level, close the current container too.
    if (!(container.classList.contains("navigation"))) {
        container.setAttribute("hidden", "");
        container.previousElementSibling.setAttribute("aria-expanded", "false");
    }
}

// The ToggleMenu function is how the navigation functions. It hides or shows
// passed menu element, and updates the ARIA attributes. If the toggle needs to
// change its presentation, that would happen here.
function ToggleMenu(el) {
    el.hidden = Not(el.hidden);
    let toggle = el.previousElementSibling;
    toggle.setAttribute("aria-expanded", el.hidden? "false" : "true");

    // If certain conditions are met, we also assign left and top margin to
    // position the newly-visible menu.

    // Mobile screens do not get this adjustment.
    if (window.innerWidth < 768) {
        return;
    }

    // For horizontal menus, the top level menu does not get this adjustment.
    if (!document.body.classList.contains('nav-vertical') && el.parentNode.parentNode.classList.contains('navigation')) {
        return;
    }
    
    // Assign position of submenu
    const parentHeight = el.parentNode.offsetHeight;
    el.style.marginTop = -1 * parentHeight + "px";
    const parentWidth = el.parentNode.offsetWidth;
    if ("left" === WhichSide(el.parentNode)) {
        el.style.marginLeft = parentWidth + "px";
    } else {
        el.style.marginLeft = -1 * el.offsetWidth + "px";
    }
}

// The WhichSide function takes in an HTML Element, and returns a string value
// of "left" or "right" depending on which side of the screen it is closest to.
function WhichSide(el) {
    const elPosition = el.getBoundingClientRect();
    const leftSpace = elPosition.left;
    const rightSpace = window.innerWidth - elPosition.right;

    return rightSpace < leftSpace ? 'right' : 'left';
}

// This is a helper function called by ToggleMenu, which handles switching the
// hidden state of the menu being shown / hidden.
function Not (x) { return !x; }

/*
Below this comment is the prototype we received from Rich.

const $nav = document.querySelector("nav");
$headingLevel = document.querySelector("#heading-level");
$run = document.querySelector("#run");


$run.addEventListener("click", () => run());
run();


function run () {
    const html = createNavigation(document.querySelector("#data").value, Number($headingLevel.value));
    document.querySelector("#html").textContent = html;
    $nav.innerHTML = html;

    $submenus = document.querySelectorAll("ul ul");
    $submenus.forEach(x => x.setAttribute("hidden", ""));
    $nav.removeEventListener("click", clickHandler);
    $nav.addEventListener("click", clickHandler);
} // run


function clickHandler (e) {
    if (e.target instanceof HTMLButtonElement) {
        e.preventDefault();
        const menu = e.target.parentElement instanceof HTMLLIElement? e.target.nextElementSibling  : e.target.parentElement.nextElementSibling;
        menu.hidden = not(menu.hidden);
        e.target.setAttribute("aria-expanded", menu.hidden? "false" : "true");
    } // if
} // clickHandler


function not (x) {return !x;}
*/
