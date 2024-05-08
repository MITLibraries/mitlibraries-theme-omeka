# Notes about the navigation system

Items get added to this list as I notice something that needs adjusted. As they are completed, they get crossed off.

Some items may get triaged into the lower sections of the document, and either noted as an open question for future investigation, or set as deferred items that need more bandwidth than I have right now.

## Open punch list

### Compound list items

- [ ] The menugroup shading (on the `li` element) is shown only for mouse interactions (the `:hover` pseudoselector). Can this be extended to keyboard users and other users?

- [ ] Flash of competing styles when menugroup shading is applied - could this be scoped only to actually-compound elements?


## Completed items

### Hamburger icon

- ~~Hamburger icon doesn't do anything for initial page load - menu initializes expanded.~~

- ~~Does hamburger need to be more prominent? With a border?~~

- ~~Hamburger on hover / focus should switch to white marks, not black.~~

### Toggle icons

- ~~Is the `button` element big enough on mobile screens? Should it be a carat instead?~~

### Compound list items

- ~~Prevent the `button` element from wrapping below a menu item~~

- ~~Can the carat be moved closer to the menu text? (CSS rules only to change)~~

### Interaction

- ~~Menus currently stay open until closed, allowing multiple open menus (and deeper menus to remember that they are opened).~~

- ~~Need to explicitly set focus to the parent toggle when closing a menu via the escape key (i.e. focus on what you effectively just clicked on)~~


### Layouts

- ~~Mobile rendering does not indicate what elements are in a sub-menu, so hierarchy awareness is mostly impossible.~~

- ~~Styling is not consistent for mobile displays of horizontal and vertical menus (compare below image with one above)~~

- ~~Need conditional logic to open a submenu toward the center of the screen (not always to the right)~~

- ~~Re-check font sizes between browsers on horizontal menu, and look for gaps above/below.~~


## Open questions (do later?)

The following items have been raised as questions that should be considered, but not necessarily tackled as part of the punch list.

- [ ] Can the `button` element take up the full space available? The choice to use a `button` element rather than a `span` or `div` appears to bring some opinions about how it renders - but we are committed to using `buttons` for this for a11y reasons.

![image](toggle-sizing.png)

- [ ] Do we worry about spacing between menu elements that is never shaded? (whitespace bewtween `li` elements)

- [ ] Do we worry about _very_ long menus (see [the list of people in the staging South Asia exhibit](https://mitlibraries-stage.omeka.net/s/TransformativeConnections/page/Peelamedu-Ramakrishnan)) being taller than the screen height?
  
  Currently the long list of options just makes the page taller; the user can scroll down to see the entire menu.

- [ ] What contrast level is needed for the menugroup? Horizontal menus currently use much less contrast (because that menu has a light gray background, while vertical menus have a white background)


## Deferred items

The following items are known to be less than ideal, but tackling them at the moment is not feasible given our bandwidth.

- [ ] Mobile layout of vertically-oriented menus should come before the search bar, not after.

  This item will require a general restructuring of the page regions, because the search and vertical nav are in completely separate layers. Swapping them via CSS will likely move the search bar below the entire content area unless the page is restructured.

- [ ] Menus should collapse when focus leaves the menu element

  This item proved frustratingly tricky to implement during an initial experiment, so we decided to close menus when clicking anywhere on the site that isn't a menu element.

- [ ] Menu offsets should be re-calculated as windows re-size?

  This is related to the above item. It applies only to menus in the vertical configuration, and only when the user makes the screen narrow enough that the responsiveness kicks in. A workaround is that the user can either close/re-open the menu, or refresh the page. As we expect most sites to be using the horizontal menu layout, this could be something we tolerate for now.
