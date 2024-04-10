# Sites filter on platform landing page

This document describes how the theme can be configured to display a filterable
set of exhibits on the platform landing page.


## Features

This feature meets the following requirements:

* One-click access to multiple sites around Omeka S, directly from the platform
  homepage.
* Provides the ability to filter sites based on arbitrary categories, without
  involvement by theme developers.
* Enables interaction via keyboard, mouse, and screen readers.


## Dependencies

The filterable interface relies upon vanilla javascript and the jQuery library,
which is already loaded by the theme. The interface also requires the platform
to host an item set containing records for each exhibit that will appear on the
homepage. These records are defined below.

### Exhibit records

The first, and most complex, part of this feature is the maintenance of an item
set holding records for every exhibit on the platform. These records are
maintained by platform staff, and should have the following information:

* Title (text - will be visible on screen)
* Description (text - will be used as alt attribute for image)
* URI (link - where users will be sent when clicking on the entry, should be the
  exhibit homepage)
* Subject (text, repeatable - used to populate filter options, so the set of
  values should be curated across all exhibits)
* Thumbnail (image - should be 200px square, and uploaded as the thumbnial via
  the Advanced tab in the editor - not via the Media tab)

These records should all be placed in a common Item Set, and kept in a Published
state. Un-publishing them, or removing them from the Item Set, will prevent them
from appearing in the filterable UI.

### Theme configuation

With the exhibit records created and placed in an Item Set, the theme can now be
configured by platform staff to display the filterable UI via two entries on the
theme settings form:

* Sites item set - this is the ID value of the Item Set which contains the
  exhibit records.
* Page slug that displays filterable site list - this should be the slug of the
  platform landing page. For example, as of April 2024 the platform landing URL
  is `https://digital-exhibits.libraries.mit.edu/s/home/page/welcome` - so this
  value is `welcome`.

When all the configuration above is complete, the feature should be operational.


## Invocation

The page template (`view/omeka/site/page/show.phtml`), at the bottom of the
content area, loads the partial `common/sites-filter.phtml`. The filterable UI
is entirely run from this partial.

The partial checks for the two theme settings values (Sites item set and the
Page slug - see above section for details). If both have been set, and the
current page matches the specified slug, then the feature javascript and styles
are loaded and invoked.

Invoking the feature is done by calling the `LoadItemSet` function, passing the
ID value of the Item Set defined above. From there, the javascript loads the
item set contents via the Omeka API, calculates all the filter categories based
on the set of subjects assigned to all exhibits, and builds the filter
interface.

The javascript file is currently organized as a set of functions - some of these
are used for the initial rendering of the interface, while others are used to
respond to user actions.


## Known issues

The javascript library is reaching the upper limit of what can be reasonably
maintained as a set of functions. Should the feature grow in complexity, it
should be considered for refactoring into at least one class (perhaps two, with
one for the initial rendering and one for responding to user interactions).


## References

The following articles within the Omeka S documentation should be relevant:

- [REST API](https://omeka.org/s/docs/developer/api/rest_api/), including the [Reference](https://omeka.org/s/docs/developer/api/rest_api_reference/) article
- [Theme Settings documentation](https://omeka.org/s/docs/developer/themes/theme_settings/)
- [Using Custom CSS and Javascript](https://omeka.org/s/docs/developer/themes/theme_modifications/#using-custom-css-and-javascript) within themes
