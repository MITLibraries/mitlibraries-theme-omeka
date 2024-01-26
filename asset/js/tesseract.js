/*
This file relates to the site navigation provided by the theme. This
feature is described in the theme documentation at:

docs/reference/navigation.md
*/

$(function() {
    // Identify menu and hamburger
    var mainMenuState = $('#main-menu-state');
    var mainMenu = $('#navbar-container ul.navigation');

    // Only the vertical configuration gets this class.
    $('body.nav-vertical #navbar-container ul.navigation').addClass('sm-vertical');
    // All SmartMenus get these classes.
    $('#navbar-container ul.navigation').addClass('sm sm-mint');
    // All SmartMenus get called.
    $('#navbar-container ul.navigation').smartmenus({
        subMenusSubOffsetX: 6,
        subMenusSubOffsetY: -8
    });

    // Handle the hamburger menu surrounding the navigation.
    if (mainMenuState.length) {
        // animate mobile menu
        mainMenuState.change(function(e) {
            if (this.checked) {
                mainMenu.hide().slideDown(250, function() { mainMenu.css('display', ''); });
            } else {
                mainMenu.show().slideUp(250, function() { mainMenu.css('display', ''); });
            }
        });
        // hide mobile menu beforeunload
        $(window).on('beforeunload unload', function() {
            if (mainMenuState[0].checked) {
                mainMenuState[0].click();
            }
        });
    }
});
