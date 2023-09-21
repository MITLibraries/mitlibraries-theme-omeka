# 2. Use Sass for stylesheet

Date: 2023-09-15

## Status

Accepted

## Context

This theme will depend heavily on stylesheets, which can be thorny to deal with over time. The Omeka S project's guide
to theme development mentions using Sass to manage styles, and the project includes a Gulp task to compile the needed
stylesheets. This matches our institutional experience, as we also use Sass for WordPress and our style guide.

The decision to use Sass is thus very easy for this theme, but it raises an additional question that is harder to
answer: *Where should the final stylesheet be compiled?*

There are four potential approaches at the moment:
1. **Developers** should compile the stylesheet during their development work, and include the updated compiled stylesheets
   in their pull requests.
2. **GitHub** should compile the stylesheets after a pull request has been approved.
3. **The deploy automation** should compile the stylesheets while the theme is being placed on the server.
4. **Omeka** should compile the stylesheets while the application is running.

### The final two options are not viable currently

Omeka itself does not provide a capability to compile the stylesheets, and our current project is not intended to
evaluate adding new modules to the existing platforms (We use a community plugin for this purpose within WordPress).
There is also no current deploy automation in place.

This leaves us with two options: build the automation in GitHub, or require developers to run the compilation locally.

### Github automation

GitHub Actions are a potential fit for this task. There is an existing [sass-build](https://github.com/marketplace/actions/sass-build) action in the marketplace, which we
investigated during the recent WordPress migration. Implementing this action would require us to consider the timing of
the build and the creation of the release in GitHub, however, and might also be impacted by how deployments are
automated as that workflow gets constructed.

### Manual compilation by developers

This option has the advantage of being supported by existing tooling in both example themes and the Omeka core itself.
However, relying on developers to consistently run the compile step manually is a potential breakdown point. It should
also be noted that including compiled stylesheets in pull requests can be problematic, but the GitHub interface does a
decent job hiding large changed files like this.

## Decision

We will use Sass for stylesheets, and will - for now - require developers to include the compiled stylesheet in their
pull requests.

To assist developers in this requirement, we will define a GitHub Action that will confirm this step has been completed.

There will be opportunities to revisit this decision as the automation around our Omeka platform takes shape.

## Consequences

Requiring developers to include a compiled stylesheet in their pull requests will make those PRs a bit more unwieldy,
but the compilation will be happening regardless in order to use the theme locally. Additionally, the theme repository
will be slightly larger than it would be otherwise, but the change in size should be manageable.
