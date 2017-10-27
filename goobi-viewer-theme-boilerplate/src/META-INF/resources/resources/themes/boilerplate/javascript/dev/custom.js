/*****************************************************************************************
 * Custom JavaScript for "boilerplate"
 ****************************************************************************************/
/**
 * Method to move DOM-Elements to another place.
 * 
 * @method manipulateDom
 */
function manipulateDom() {
    $( '#widgetSearchField' ).detach().insertAfter( '.page-content__close-sidebar' );
    $( '#changeLocal' ).detach().insertAfter( '.page-content__close-sidebar' );
}

/**
 * Method to reset DOM-Elements.
 * 
 * @method resetDom
 */
function resetDom() {
    var searchField = $( '#widgetSearchField' ).detach();
    var changeLocal = $( '#changeLocal' ).detach();
    
    $( '.page-header__search' ).append( searchField );
    $( '.page-header__language' ).append( changeLocal );
}

/**
 * Method to set the content height to a min-height, equal to the viewport height.
 */
function setContentHeight() {
    var pageWrapper = $( '#pageContent' );
    var pageWrapperHeight = $( '#pageContent' ).outerHeight();
    var pageHeaderHeight = $( '#pageHeader' ).outerHeight();
    var pageNavigationHeight = $( '.main-navigation' ).outerHeight();
    var pageFooterHeight = $( '#pageFooter' ).outerHeight();
    var additionalHeight = pageHeaderHeight + pageNavigationHeight + pageFooterHeight + 15;
    var windowHeight = $( window ).outerHeight();
    
    if ( pageWrapperHeight < windowHeight ) {
        pageWrapper.css( 'min-height', ( windowHeight - additionalHeight ) + 'px' );
    }
}

$( document ).ready( function() {
    var viewerConfig = {
        currentPage: currentPage,
        localStoragePossible: viewerJS.localStoragePossible,
        widgetNerSidebarRight: true,
    };
    
    viewerJS.init( viewerConfig );
    
    // set content height to window height
    // setContentHeight(); --> METHODE AN LAYOUT ANPASSEN!
    
    // off canvas
    $( '[data-toggle="offcanvas"]' ).off().click( function() {
        $( this ).addClass( 'in' );
        $( '#sidebar' ).addClass( 'in' );
        $( '.offcanvas-fade' ).addClass( 'in' );
    } );
    $( '[data-toggle="close-sidebar"]' ).click( function() {
        $( '#sidebar' ).removeClass( 'in' );
        $( '[data-toggle="offcanvas"]' ).removeClass( 'in' );
        $( '.offcanvas-fade' ).removeClass( 'in' );
    } );
    
    // change position of search and language
    if ( window.matchMedia( '(max-width: 768px)' ).matches ) {
        manipulateDom();
    }
    $( window ).on( 'resize orientationchange', function() {
        // setContentHeight(); --> METHODE AN LAYOUT ANPASSEN!
        if ( window.matchMedia( '(max-width: 768px)' ).matches ) {
            // setContentHeight(); --> METHODE AN LAYOUT ANPASSEN!
            manipulateDom();
        }
        else {
            // setContentHeight(); --> METHODE AN LAYOUT ANPASSEN!
            resetDom();
        }
    } );
} );
