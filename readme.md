# MIT Libraries Omeka Theme

This [Omeka S](https://omeka.org/s/) theme implements the MIT Libraries' current branding identity for web applications.

Additional Omeka S themes can be found at [omeka-s-themes](https://github.com/omeka-s-themes).

## Using this theme

This theme should be placed in the themes directory within your Omeka S instance. It should then be available for selection by any exhibit which needs it.

## Deploying this theme

This is automatically deployed to stage and prod via GitHub Actions. See [ADR#0004](./docs/architecture-decisions/0004-github-runner-for-automated-deployment.md) for the decision to do this. See [deployment-automation](./docs/reference/deployment-automation.md) for the details of how to setup this automation. The configuration follows our standard GitHub-flow deployment model:

* A merge to `main` triggers a deploy of the theme to the stage server
* A tagged release on `main` triggers a deploy of the theme to the prod server

Only changes in the four key directories are tracked for automation: `asset/`, `config/`, `helper/`, and `view/`. If there are updates to the theme that require files outside of the four directories listed above, the `deploy` command in the Makefile will need to be udpated.

## Developing this theme

The [Omeka S Developer Documentation for themes](https://omeka.org/s/docs/developer/themes/) should be consulted for help adding anything to this theme.

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

### External libraries

This theme uses two external libraries, which are managed by the Makefile in the
theme root. Please take care during development to not make any local changes
that would be overwritten by the Makefile.

The first external project is the Libraries' style guide, which can be refreshed
by running `make update`. Its materials can generally be found in
`asset\img\mitlib-style`, with a single CSS file in `asset\css\`.

The second external project is the SmartMenus javascript library, which can be
refreshed by running `make update-js`. Its materials can generally be found in
`asset\js\smartmenus`.

Please check the Makefile for the exact set of files to avoid changing.

### Reference documentation

The [Reference documentation](https://github.com/MITLibraries/mitlibraries-theme-omeka/tree/main/docs/reference) for this theme describes some more complex features
provided by this theme. Please review those articles before working on any
of the described features.
