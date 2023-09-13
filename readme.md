# MIT Libraries Omeka Theme

This [Omeka S](https://omeka.org/s/) theme implements the MIT Libraries' current branding identity for
web applications.

Additional Omeka S themes can be found at https://github.com/omeka-s-themes.

## Using this theme

This theme should be placed in the themes directory within your Omeka S
instance. It should then be available for selection by any exhibit which needs
it.

## Developing this theme

The [Omeka S Developer Documentation for themes](https://omeka.org/s/docs/developer/themes/) should be consulted for help
adding anything to this theme.

### Stylesheets

This theme uses Sass to manage its stylesheets. The compilation of these styles
is still TBD (as of September 2023) - but for now, you will need to run Sass
locally in order to compile the stylesheet. This can be done via NPM:

```bash
$ npm install
$ npm run build
```

(If you wish, you can also use Gulp via `gulp css`. For ongoing compilation
while you work, run `gulp css:watch`.)

