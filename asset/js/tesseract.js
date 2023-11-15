$(function() {
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
