# MIT Libraries Omeka Theme

This [Omeka S](https://omeka.org/s/) theme implements the MIT Libraries' current branding identity for web applications.

Additional Omeka S themes can be found at https://github.com/omeka-s-themes.

## Using this theme

This theme should be placed in the themes directory within your Omeka S instance. It should then be available for selection by any exhibit which needs it.

## Developing this theme

The [Omeka S Developer Documentation for themes](https://omeka.org/s/docs/developer/themes/) should be consulted for help adding anything to this theme.

## Deploying this theme

This is automatically deployed to stage and prod via GitHub Actions. See [ADR#0004](./docs/architecture-decisions/0004-github-runner-for-automated-deployment.md) for the decision to do this. See [deployment-automation](./docs/reference/deployment-automation.md) for the details of how to setup this automation. The configuration follows our standard GitHub-flow deployment model:

* A merge to `main` triggers a deploy of the theme to the stage server
* A tagged release on `main` triggers a deploy of the theme to the prod server

Only changes in the four key directories are tracked for automation: `asset/`, `config/`, `helper/`, and `view/`.

### Stylesheets

There are two general requirements for stylesheets in this theme:

1. The final contents of all stylesheets in `asset\css` should be compiled by
   Sass, rather than maintained by hand.
2. The Sass stylesheets themselves should conform to the [Omeka S style guide](https://omeka.org/s/docs/developer/themes/style_guide/).

To assist with these requirements, the theme provides tooling for each.

The compilation of stylesheets can be performed via either `npm run build` or
`gulp css`. If you want to leave a process running in your terminal while you
work, use `gulp css:watch`. There is also a GitHub Action that will confirm that
this compilation has been performed on all PRs.

The Omeka S style guide can be checked via `npx stylelint "**/*.scss"`. There is
a GitHub Action that will perform these checks on all PRs as well.
