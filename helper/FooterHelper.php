<?php

/**
 * A demonstration helper class that mostly exists to give our PHP analysis
 * tools something to work with.
 *
 * @url https://omeka.org/s/docs/developer/themes/theme_functions/
 */

namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class FooterHelper extends AbstractHelper
{
    public function __invoke($msg = '')
    {
        echo "<span>Helper: {$msg}</span>";
    }
}
