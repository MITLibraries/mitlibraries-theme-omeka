/*
This file relates to the navigation menu. It expects to find simple markup, like
what Omeka builds by default. It then builds the markup needed for the user to
interact with, and attaches event listeners to the elements which were just
built.
*/

let i = 1;

function NewToggle(labelValue) {
    const toggle = document.createElement('button');
    const toggleContent = document.createTextNode("+");
    toggle.appendChild(toggleContent);
    toggle.classList.add('toggle');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-labelledby', labelValue);
    toggle.addEventListener("click", CatchButton);
    return toggle;
}

function Decorate(container) {
    let menus = container.getElementsByTagName('ul');
    $(menus).each(function(index, menu) {
        labelValue = '';
        if (menu.previousElementSibling) {
            labelValue = 'item-' + i;
            menu.previousElementSibling.setAttribute('id', labelValue);
        }
        thing = NewToggle(labelValue);
        menu.parentNode.insertBefore(thing, menu);
        menu.setAttribute("hidden", "");
        i++;
    });
    container.addEventListener("keyup", CatchEscape);
}

function CatchButton (e) {
    if (!(e.target instanceof HTMLButtonElement)) return;

    e.preventDefault();
    const menu = e.target.nextElementSibling;
    ToggleMenu(menu);
}

function CatchEscape(e) {
    if (!(e.keyCode === 27)) return;

    // e.target is the element that has focus. Check if that is in
    // a menu, and close it if so.
    // 
    if (!(e.target.parentNode.parentNode instanceof HTMLUListElement)) {
        return;
    }
    ToggleMenu(e.target.parentNode.parentNode);
}

function ToggleMenu(el) {
    el.hidden = Not(el.hidden);
    let toggle = el.previousElementSibling;
    toggle.setAttribute("aria-expanded", el.hidden? "false" : "true");
}

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
