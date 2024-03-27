# The platform landing page

One unique feature provided by this theme is its ability to support a filterable interface of exhibits, suitable for the landing page of an Omeka S instance.


## Requirements

This feature requires the following to exist:

* A page on the default site which will host the filterable UI (this is typically the default page).
* An Item Set must be created which contains one Item record for each exhibit that appears in the filterable UI.
* The Item records in this item set should be created using the Exhibit resource template found at the bottom of this page. Exhibits have four metadata fields and a thumbnail image.
    * These Item records should each have one or more Subject values. These Subjects will be used to populate the list of available filters. This is not a controlled vocabulary, so care should be taken to coordinate the values used across all Item records.
    * Item records include a thumbnail, which must be uploaded via the Advanced tab, and not the Media tab.
* Each of the exhibits which are included in this feature should have a sitemap (enabled by the [Sitemaps module](https://omeka.org/s/modules/Sitemaps/)). In addition to the visible elements, this feature injects a link to each exhibit's sitemap into the `head` element of the landing page, in order to prompt indexing by search engines.


## Configuration

When the above requirements have been met, the filterable UI can be activated by filling out the `Platform homepage settings` area of the theme settings form. The fields in this area are:

* `Suppress search form` - This field is optional, enabling the theme to skip rendering the search form (which is unused on our landing site).
* `Sites item set` - This is the ID number of the Item Set created above. When this value is supplied, the landing page will attempt to load the contents of this Item Set via javascript on the landing page.
* `Page slug that displays filterable site list` - This identifies which page should attempt to load the Item Set specified above. **Please note that this field asks for the page slug only.** If your platform landing page exists at `https://www.example.org/s/home/page/welcome` then you would specify `welcome` in this field.


## Related materials

The Exhibit resource template below can be imported to your Omeka S instance in order to facilitate creation of these records.

```json
{
    "o:label": "Exhibit",
    "o:resource_template_property": [
        {
            "o:alternate_label": null,
            "o:alternate_comment": null,
            "o:is_required": false,
            "o:is_private": false,
            "o:default_lang": null,
            "data_types": [],
            "vocabulary_namespace_uri": "http:\/\/purl.org\/dc\/terms\/",
            "vocabulary_label": "Dublin Core",
            "local_name": "title",
            "label": "Title"
        },
        {
            "o:alternate_label": null,
            "o:alternate_comment": null,
            "o:is_required": false,
            "o:is_private": false,
            "o:default_lang": null,
            "data_types": [],
            "vocabulary_namespace_uri": "http:\/\/purl.org\/dc\/terms\/",
            "vocabulary_label": "Dublin Core",
            "local_name": "description",
            "label": "Description"
        },
        {
            "o:alternate_label": null,
            "o:alternate_comment": null,
            "o:is_required": false,
            "o:is_private": false,
            "o:default_lang": null,
            "data_types": [],
            "vocabulary_namespace_uri": "http:\/\/purl.org\/ontology\/bibo\/",
            "vocabulary_label": "Bibliographic Ontology",
            "local_name": "uri",
            "label": "uri"
        },
        {
            "o:alternate_label": null,
            "o:alternate_comment": null,
            "o:is_required": false,
            "o:is_private": false,
            "o:default_lang": null,
            "data_types": [],
            "vocabulary_namespace_uri": "http:\/\/purl.org\/dc\/terms\/",
            "vocabulary_label": "Dublin Core",
            "local_name": "subject",
            "label": "Subject"
        }
    ],
    "o:resource_class": {
        "vocabulary_namespace_uri": "http:\/\/purl.org\/ontology\/bibo\/",
        "vocabulary_label": "Bibliographic Ontology",
        "local_name": "Website",
        "label": "Website"
    }
}
```
