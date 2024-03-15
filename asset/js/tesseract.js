/*
This file relates to the site navigation provided by the theme. This
feature is described in the theme documentation at:

docs/reference/navigation.md
*/

$(function() {
    $('#navbar-container ul.navigation').addClass('sm-nav sm-nav--left');
    // const navbar1 = new SmartMenus(document.querySelector('#navbar-container'));
    console.log('SmartMenus just fired.');
    /*
    // Only the vertical configuration gets this class.
    $('body.nav-vertical #navbar-container ul.navigation').addClass('sm-vertical');
    // All SmartMenus get these classes.
    $('#navbar-container ul.navigation').addClass('sm sm-mint');
    // All SmartMenus get called.
    $('#navbar-container ul.navigation').smartmenus({
        subMenusSubOffsetX: 6,
        subMenusSubOffsetY: -8
    });
    */
});
