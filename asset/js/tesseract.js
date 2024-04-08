/*
This file relates to the site navigation provided by the theme. This
feature is described in the theme documentation at:

docs/reference/navigation.md
*/

$(function() {
    // iPhones need a hack to prevent zooming into form fields.
    // cite: https://weblog.west-wind.com/posts/2023/Apr/17/Preventing-iOS-Safari-Textbox-Zooming#selective-maximum-scale-for-safari-on-ios
    if(navigator.userAgent.indexOf('iPhone') > -1 )
    {
        document
          .querySelector("[name=viewport]")
          .setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1");
    }

    // Only the vertical configuration gets this class.
    $('body.nav-vertical #navbar-container ul.navigation').addClass('sm-vertical');
    // All SmartMenus get these classes.
    $('#navbar-container ul.navigation').addClass('sm sm-mint');
    // All SmartMenus get called.
    $('#navbar-container ul.navigation').smartmenus({
        subMenusSubOffsetX: 6,
        subMenusSubOffsetY: -8
    });
});
