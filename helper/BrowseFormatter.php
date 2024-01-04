<?php
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

/**
 * View helper for rendering a browse page.
 */
class BrowseFormatter extends AbstractHelper
{
    /**
     * The default partial view script.
     */
    const PARTIAL_NAME = 'common/browse-formatter';

    public function __invoke()
    {
        $partialName = $partialName ?: self::PARTIAL_NAME;       

        $view = $this->getView();
        $params = $view->params();

        $args = [
            'foo' => 'bar',
        ];
        $args = $view->trigger('view.sort-selector', $args, true);

        echo $view->partial( $partialName );
        // return $view->partial('common/browse-formatter');
    }
}