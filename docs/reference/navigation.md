# Navigation within a site

**This document describes the current navigation system, but there is an ongoing
ADR which proposes a replacement. See the [Known Issues](#known-issues) section of this document,
and [the ADR proposal](https://github.com/MITLibraries/mitlibraries-theme-omeka/pull/43), for more information.**

This theme currently uses the [SmartMenus library](https://www.smartmenus.org/) to generate a navigation menu
of all pages within the content tree.


## Features

Our navigation system supports the following features:

* The theme's settings form supports two different page configurations: one with
  a horizontal navigation menu at the bottom of the masthead element, and
  another with a vertical navigation menu to the left of the content column.
* Both menu layouts support navigation menus of any arbitrary depth - there is
  no imposed limit on how deep a menu can go.
* The navigation menus are integrated with the theme's color variants system,
  which allows site builders to apply a color highlight to several aspects of
  their site, including the navigation menu.  
* Within a menu tree, the current page (along with all its parent pages) will be
  marked with bold text.
* The navigation menu is usable by a variety of user agents and technologies,
  including people with a mouse (using hover states), a smartphone (using only
  touch or click commands), and a keyboard. Additionally, those using a keyboard
  to navigate the site can traverse the menu system without needing to listen to
  every menu item sequentially, and can open and close submenus separately from
  following the links to menu items.


## Dependency management and updates

This dependency is managed via a combination of Node and the theme Makefile.

* Node brings the library into the node_modules folder, but the theme cannot
  load content from that location.
* The Makefile command `update-js` copies the needed library files from its
  default location within node_modules and into the theme's asset system.

Both steps must be run in order to update the library if a new version is
released:

```bash
$ npm update smartmenus
$ make update-js
```


## Invocation during a page load

### Server-side

During a page load, the theme builds the navigation menu using the default
markup defined by Omeka S. The `navigation-default.phtml` and 
`navigation-vertical.phtml` templates in `view/common/` include this call, which
generates the default markup:

```php
<?php echo $site->publicNav()->menu(); ?>
```

Thus far, it has not been necessary to customize this markup. The resulting HTML
will look like this:

```html
<nav aria-label="Exhibit title goes here">
    <ul class="navigation">
        <li class="active">
            <a href="#">Page title</a>
        </li>
        <li>
            <a href="#">Page title</a>
            <ul>
                <li>
                    <a href="#">Sub-page title</a>
                </li>
                <li>
                    <a href="#">Sub-page title</a>
                </li>
                <li>
                    <a href="#">Sub-page title</a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#">Page title</a>
        </li>
        <li>
            <a href="#">Page title</a>
        </li>
    </ul>
</nav>
```

### Client-side javascript

This markup is then slightly decorated, and SmartMenus invoked, within the
user's browser by the contents of `asset/js/tesseract.js`.

The resulting markup used by the browser is considerably more detailed. For more
information, consult the SmartMenus documentation.

### Stylesheets

Most of the presentation of SmartMenus is controlled by the "Mint" theme
stylesheet provided by SmartMenus itself. Customization beyond this can be found
in two places:

1. General customization for all color variants can be found in 
   `asset/scss/content/_navigation.scss`
2. Color variant-specific rules (defining what elements get which colors) can
   be found in `asset/scss/variants/_smartmenus.scss`.


## Known issues

Users navigating the menu via a keyboard currently have some difficulty choosing
between a menu item and the submenu below that item. While both interactions are
possible, the menu system will be updated soon to correct this problem.


## References

- [Omeka S user manual on Navigation](https://omeka.org/s/docs/user-manual/sites/site_navigation/)
- As with many aspects of Omeka theme development, familiarity with the process
  for [overriding default templates during development](https://omeka.org/s/docs/developer/themes/theme_modifications/) would be helpful.
- Omeka is built on the Laminas PHP framework, which has a [Navigation library](https://docs.laminas.dev/laminas-navigation/)
  which might be worth consulting for some feature development.

### Related Omeka concepts

Alongside the navigation menu, there are other means available to site builders
for users to navigate a set of content. Those include page blocks such as the
[Table of Contents](https://omeka.org/s/docs/user-manual/sites/site_pages/#table-of-contents) and [List of Pages](https://omeka.org/s/docs/user-manual/sites/site_pages/#list-of-pages), as well as pagination buttons which move
the user to next and previous pages in the navigation tree.
