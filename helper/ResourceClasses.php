<?php
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class ResourceClasses extends AbstractHelper
{

    /**
     * Returns a representation of resource classes in HTML. If this helper
     * receives anything other than a resource, with a class, which itself has
     * an ID, then it returns an empty string.
     *
     * @param object $resource The resource to add tags to.
     * @return string This is a set of HTML.
     */
    public function __invoke($resource)
    {
        if (!$resource) {
            return '';
        }

        $resourceClass = $resource->resourceClass();
        if (!$resourceClass) {
            return '';
        }

        $resourceClassId = $resourceClass->id();
        if (!$resourceClassId) {
            return '';
        }

        return '<span>' . $resource->displayResourceClassLabel() . '</span>';
    }
}
