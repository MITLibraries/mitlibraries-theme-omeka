# Color variants

One feature which the theme provides to site builders is the opportunity to
choose a highlight color to customize the appearance of their exhibit. This
document describes what is needed to maintain and extend that system.

## Features

The color variants feature allows site builders to have a simple way of picking
a highlight color. This color is applied to their exhibit in a consistent way
throughout their content, surfacing in areas such as buttons, navigation menus,
and the hover/focus color applied to text links.

These colors are meant to be used sparingly - the overall visual impression of
all sites should still be black and white.


## Dependencies

The color variants system relies entirely on our stylesheets, and on the SCSS
compilation process which is managed by Gulp.


## Configuration

### Stylesheets

This feature defines color variants through the accumulation of several
different "layers":

1. A set of SCSS modules - in `asset/scss/variants` - which define all the theme
elements which get colored by the variant system. Those modules do not directly
assign colors, but instead declare an intermediate color. Examples of these
intermediate color values are `color-menu-accent`, `color-text-hover`, and of
course the basic `color` variable.

   The set of variant modules _should_ be similar to the set of modules defined
by the general set of stylesheet modules. Additionally, the rules within these
variant modules should be kept to a minimum, focusing only on assigning colors.

2. These SCSS modules are then loaded by a set of variant-specific stylesheets
directly in the `asset/scss` folder. These variant-specific files load the
defined variables, colors, and variant modules, and define the mappings between
the intermediate variant colors and the defined colors themselves. For example:

```scss
@import `colors`;

$color: $blue;
$color-menu-accent: $blue;
$color-menu-accent-text: $white;
$color-menu-background: $gray-l3;

@import `variants/all`;
```

3. The set of available colors should be added to the available options in
`config/theme.ini`, as part of the Theme variant field:

```ini
elements.stylesheet.name = "stylesheet"
elements.stylesheet.attributes.id = "stylesheet"
elements.stylesheet.type = "Zend\Form\Element\Select"
elements.stylesheet.options.element_group = "branding"
elements.stylesheet.options.label = "Theme variant"
elements.stylesheet.options.value_options.black = "Default (Black)"
elements.stylesheet.options.value_options.blue = "Blue"
elements.stylesheet.options.value_options.burnt_orange = "Burnt orange"
```

### Theme configuration

Exhibits can choose their highlight color via the Theme Variant setting in the
theme settings form.

## Invocation

During page load, the master page template loads the current value for the color
variant, and then loads that stylesheet (which is compiled via the Gulp tool by
the developer).

```php
$stylesheet = $this->themeSetting('stylesheet');

...

if (isset($stylesheet)) {
    $this->headLink()->appendStylesheet($this->assetUrl("css/$stylesheet.css"));
} else {
    // If the site has not chosen a stylesheet, use the Black variant by default.
    $this->headLink()->appendStylesheet($this->assetUrl("css/black.css"));
}
```

One aspect of this arrangement is that there is never a color-specific class
assigned within the application - the variant changes because the blue
stylesheet is loaded, or the green stylesheet, etc. We hope that this is more
efficient than loading a master stylesheet of all possible colors, only to not
use most of them for any page load.


## Known issues

* Platform staff have asked for this feature to be extended from a "pick one of
these colors" choice to a more flexible color-picker. In order to be workable,
there needs to be guardrails in place to help platform staff avoid color
combinations which lack sufficient color contrast in all conditions (We made
extensive use of the accessible color palette builder below when creating the
initial set of options).)

* The relationship between the variant modules and the overall stylesheet modules
could be cleaner. This relationship works in that there are both `typography`
modules within the variants and content folders. Having a `forms` variant module
without a corresponding content module feels awkward.


## References

- Providing [theme settings](https://omeka.org/s/docs/developer/themes/theme_settings/) for Omeka S themes
- The [Accessible color palette builder](https://toolness.github.io/accessible-color-matrix/) from [Atul Varma (@toolness)](https://github.com/toolness) has been very
  useful in making sure that our color selections provide suitable contrast.
- [Gulp](https://gulpjs.com/) toolkit for compiling stylesheets
