<?php 
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class FooHelper extends AbstractHelper
{
    public function __invoke($msg = '') 
    {
        // your code here
        echo "Helper: ${msg}";
    }
}
