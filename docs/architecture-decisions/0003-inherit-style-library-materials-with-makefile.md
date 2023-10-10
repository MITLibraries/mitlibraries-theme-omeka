# 3. Inherit style library materials with makefile

Date: 2023-10-10

## Status

Accepted

## Context

This theme needs to implement the MIT Libraries' online brand materials in order to allow our Digital Exhibits platform
to look like something provided by our organization. 

There are a variety of options for the theme to implement our brand:
1. **Maintain a bespoke implementation.** We could maintain all the needed styles, images, and markup templates directly
   within this theme, with no relationship to any other platform.
2. **Import from the shared style library.** Several years ago we created a [style library](https://github.com/mitlibraries/mitlib-style/) which contains some
   stylesheets, javascript components, and images. There are some example HTML pages which demonstrate the use of these
   branding assets as well. Our Rails applications import some of these materials via a theme gem, which is a pattern
   that could be replicated for Omeka. Not every Libraries-branded website uses this library, however - WordPress and
   Libguides are separate implementations.
3. **Load styles and assets from an external CDN.** This sort of shared branding resource is not yet available, but is
   a worthwhile option to consider if our style library gets updated to publish materials there.

### Bespoke branding

This is a path we've followed for our WordPress network, giving us at least two different implementations of our
identity. That separation is not inherently a good thing, however, particularly when coordinated changes are needed (as
will be the case this fall when the new MIT logo is implemented).

### Import the shared library

One of the reasons our shared branding works in Rails is that we have total control over the markup for those
applications - which is not necessarily the case when we try to apply the brand to an existing framework like LibGuides.
Omeka is such an existing application framework, which poses a risk to using pre-written styles.

However, most of our brand identity gets applied to areas of the page where we _do_ have total control: the header and
footer elements. Looking at the sample layout template makes this clear: all page content across the application is
rendered by a single call: `<?php echo $this->content; ?>`.

It makes sense, then to try and implement our branding by importing the shared stylesheet and images, at least.

### Import from a CDN

As noted above, there is not currently a process for publishing branding materials like a stylesheet and images to our
CDN. That sort of change is also beyond the scope of the current theming project for Omeka. However, if this work gets
approved in the future, it seems to present a viable path forward so long as the CDN materials are appropriately
versioned.

## Decision

* We will maintain a Makefile within this theme which will import the needed branding assets into the relevant places in
this theme.
* The header and footer markup will be maintained directly within this theme, rather than imported from the style
library. This is because the theme has some customizations which need to be applied to these partials, which makes it
easier to manage them purely within the theme.
* Unlike with the theme's internal stylesheet and PHP templates, we will not write a GitHub Action to enforce that our
branding materials are caught up to the style library. The development roadmap of the style library is currently
uncertain enough that forcing the theme to stay current in that way risks introducing problems.

## Consequences

The choice to load a pre-compiled styleet in Omeka S will need to be monitored closely as our exhibits platform gets
populated with real content. While it seems reasonable now that page content and the user bar will not be negatively
affected by these styles, that should be monitored by the theme project to make sure that there are no problems.
