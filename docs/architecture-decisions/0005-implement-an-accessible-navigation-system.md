# 5. Implement an accessible navigation system

Date: 2024-03-22

## Status

Accepted

## Context

Our initial releases of this theme used the [SmartMenus](https://www.smartmenus.org/) library to build its
navigation menus. While this library is easy to implement and pretty useful, its
output was flagged during usability and accessibility testing as needing some
improvements.

The markup which the user finally interacts with looks like this:

```html
<nav aria-label="Under the Lens: Women Biologists and Chemists at MIT (1865-2024)">
  <ul class="navigation sm sm-mint" data-smartmenus-id="17111193231069111">
    ...
    <li>
        <a href="/s/under-the-lens/page/timeline" class="has-submenu" id="sm-17111193231069111-1" aria-haspopup="true" aria-controls="sm-17111193231069111-2" aria-expanded="false">Timeline
        	<span class="sub-arrow"></span>
        </a>
        <ul id="sm-17111193231069111-2" role="group" aria-hidden="true" aria-labelledby="sm-17111193231069111-1" aria-expanded="false" style="width: auto; min-width: 10em; display: none; max-width: 20em; top: auto; left: 0px; margin-left: 0px; margin-top: 0px;" class="sm-nowrap">
            <li>
                <a href="/s/under-the-lens/page/timeline1">Timeline: The Beginnings</a>
            </li>
            ...
        </ul>
    </li>
    ...
  </ul>
</nav>
```

The issue is that the element triggering the flyout menu (the 
`<span class="sub-arrow"></span>` tag) is _inside_ the anchor element, making it
challenging (if not impossible) for users of assistive technologies to separate
their interactions with the menu link and the submenu toggle.

The current release of SmartMenus (1.2.1) does not support placing this toggle
element outside of the link element, so it will be necessary to replace it with
a library which does support this behavior.


### Option 1: SmartMenus 2

The maintainer for SmartMenus is aware of this problem in the library, as we and
others have reported it via GitHub (see [issue 204](https://github.com/vadikom/smartmenus/issues/204) and [issue 231](https://github.com/vadikom/smartmenus/issues/231)). He has
committed to including this as an improvement in the future release of
SmartMenus 2, and the documentation already available [includes this among its available
features](https://configurator.smartmenus.org/).

However, at the time of writing [SmartMenus 2 is only available via one alpha
release](https://github.com/vadikom/smartmenus/releases) - and the maintainer has [cautioned us against using it in a production
system yet](https://github.com/vadikom/smartmenus/issues/245).

* Pros: Just upgrading our existing menu library as it improves over time is a
  good philosophy to follow.

* Cons: The timeline for the release of SmartMenus 2 is not clear, and cannot
  be guaranteed to happen. Additionally, the significant changes to the library
  with version 2 will likely require a significant level of effort - so the
  benefits of a simple upgrade may not accrue based on the materials published
  so far.


### Option 2: Accessible Menu

One alternative to SmartMenus is the [Accessible Menu](https://accessible-menu.dev/) library, which takes as its
starting point the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) for navigation menus. One of
the supported patterns is the [Disclosure Navigation Menu with Top-Level Links](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/),
which includes the needed separation between navigation links and submenu
toggles.

While the provided example includes this separation only at the top level of the
menu, the pattern can be extended to all levels - [as demonstrated in this
CodePen](https://codepen.io/matt-bernhardt/pen/poBRKrY).

#### Benefits of Accessible Menu

This menu, when properly configured, appears to implement all the best practices
for an accessible navigation menu for web application.

#### Drawbacks of Accessible Menu

There are several significant drawbacks to using this menu library.

* The most significant drawback is that it imposes some operating costs on users
  of assistive technology that are not ideal. The library forces the screen
  reader user to explicitly switch operating mode to interact with the menu, and
  does not listen for the type of interaction events which users naturally
  generate while navigating a page.

  > However, the library is not listening for click events; it seems they are
  > only listening for explicit pointer events. This means you need to switch
  > into forms mode, then press enter or space, to activate a menu ... It also
  > seems they are handling keyboard events explicitly for keys that should
  > normally be handled by the browser like tab and shift+tab.

  (The above comment comes from [our discussion of the navigation menu after
  accessibility testing](https://github.mit.edu/Accessibility-FY2024/omeka/issues/4#issuecomment-182190).)

* The markup requirements for this library do not immediately align with the
  markup generated by Omeka. While this is manageable by either maintaining a
  set of custom navigation templates (which other themes also do) or by writing
  some javascript to manipulate the DOM prior to instantiating the menu, it does
  mean that using this library increases the maintenance burden of the theme.

* The library is javascript-only, and is not distributed with any CSS rules.
  While we can develop and maintain these rules ourselves, it makes this library
  less of a turnkey solution.


### Option 3: CSS-only menu libraries

A third option would be to pursue a "pure CSS" navigation menu, which can be
found described in [several](https://purecss.io/menus/) [places](https://devsnap.me/css-menu) around the web.

* Pros: A navigation menu which uses only CSS styles is technically much
  simpler, lacking the javascript that would need to be maintained (either by
  ourselves or by a dependency maintainer).

* Cons: [These types of navigation systems are likely not going to be fully
  accessible](https://moderncss.dev/css-only-accessible-dropdown-navigation-menu/). There are elements of the WCAG standards which cannot be satisfied
  by stylesheets alone. An example is [WCAG 1.4.13](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html), which requires that revealed
  content like a submenu must be dismissable without changing the focus on a
  page.


### Option 4: A bespoke solution

While attempting to implement the Accessible Menu library, we asked for feedback
about our progress from Rich Caloggero, who was involved in our earlier
accessibility testing. Rich helpfully assembled a [mockup](https://richcaloggero.github.io/tools/createNavigation.html) demonstrating a usable
navigation system with very little javascript (and no stylesheets).

#### Benefits of a bespoke approach

The amount of javascript which is needed is potentially very, very small. The
initial snippet which Rich provided was just this:

```js
$submenus = document.querySelectorAll("nav ul ul");
$submenus.forEach(x => x.setAttribute("hidden", ""));
$nav.removeEventListener("click", clickHandler);
$nav.addEventListener("click", clickHandler);

function clickHandler (e) {
if (e.target instanceof HTMLButtonElement) {
e.preventDefault();
const menu = e.target.parentElement instanceof HTMLLIElement? e.target.nextElementSibling  : e.target.parentElement.nextElementSibling;
menu.hidden = not(menu.hidden);
e.target.setAttribute("aria-expanded", menu.hidden? "false" : "true");
} // if
} // clickHandler
```

If we choose HTML elements which bring native functionality (`button`, `a`, and
header tags, for example) then we not only need less javascript but we are more
likely to match functionality which users are already familiar with using. The
only conceptual need we are solving is how to expand and collapse a submenu -
everything else is already present.

The styling rules required for this approach should likewise be minimal.

#### Drawbacks of a bespoke approach

The maxim "if you aren't using a framework, you are building one" applies here.
While the amount of code required is small, it is still code for which we are
responsible. That code will require us to commit to maintaining the knowledge of
how it works and how to troubleshoot it, and to commit to having the bandwidth
to respond to problems as they are reported.

This bespoke approach is also not just javascript, but all the associated
styling rules for the menu to be rendered in both a vertical and horizontal
layout.

In addition, because this code is so small, it has likely been written by some
other group of developers - and it would be preferable to leverage their work
rather than repeat it.

Ultimately, though, the review which we've conducted of existing menu libraries
has not identified such a suitable existing library at this time.


## Decision: Option 4

We will implement option 4 - a bespoke solution. We will develop, and maintain,
a small set of javascript and stylesheet rules for the navigation menu in this
theme.

If this proves sustainable, the feature will be considered for promotion to the
overall style library in order to make the feature available to our other
web applications.

Our ultimate preference for an externally-defined navigation library will mean
that we continue to monitor the development of both SmartMenus and Accessible
Menu, with an eye toward adopting one should a suitable version be released.


## Consequences

We will work from the prototypes and examples which Rich has provided and write
our own bespoke solution for navigation menus in Omeka. This solution will:

1. Make use of appropriate HTML tags as much as possible, with toggles for
   triggering submenus separate from the navigation links - at any depth.
1. Implement minimal javascript.
1. Include styling rules for both a horizontal and vertical implementation,
   while the markup and javascript for each will be the same.
1. Be evaluated for promotion to our style guide.
