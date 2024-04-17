/*
This file relates to the navigation menu. It expects to find simple markup, like
what Omeka builds by default. It then builds the markup needed for the user to
interact with, and attaches event listeners to the elements which were just
built.
*/

let i = 1;

function NewToggle(visible = false) {
    const toggle = document.createElement('button');
    toggle.classList.add('toggle');
    toggle.setAttribute('aria-expanded', visible? 'true' : 'false');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-labelledby', '');
    toggle.addEventListener("click", Handler);
    return toggle;
}

function Decorate(container) {
    let menus = container.getElementsByTagName('ul');
    $(menus).each(function(index, menu) {
        console.log(index);
        thing = NewToggle(false);
        menu.parentNode.insertBefore(thing, menu);
        menu.setAttribute("hidden", "");
    });
}

function Handler (e) {
    if (!(e.target instanceof HTMLButtonElement)) return;

    e.preventDefault();
    const menu = e.target.nextElementSibling;
    menu.hidden = Not(menu.hidden);
    e.target.setAttribute("aria-expanded", menu.hidden? "false" : "true");
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
