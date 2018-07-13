/*****************************************************************************************
 * Custom JavaScript for "boilerplate"
 ****************************************************************************************/
/**
 * Method to set the content height to a min-height, equal to the viewport height.
 */
function setContentHeight() {
    var pageHeaderHeight = $( '#pageHeader' ).outerHeight();
    var pageWrapper = $( '#pageContent' );
    var pageWrapperHeight = $( '#pageContent' ).outerHeight();
    var pageFooterHeight = $( '#pageFooter' ).outerHeight() + 20;
    var additionalHeight = pageHeaderHeight + pageWrapperHeight + pageFooterHeight;
    var windowHeight = $( window ).outerHeight();
    var diff = windowHeight - additionalHeight;
    
    if ( additionalHeight < windowHeight ) {
        pageWrapper.css( 'min-height', ( pageWrapperHeight + diff ) + 'px' );
    }
}

$( document ).ready( function() {
    var viewerConfig = {
        currentPage: currentPage,
        localStoragePossible: viewerJS.localStoragePossible,
        widgetNerSidebarRight: true,
    };
    
    viewerJS.init( viewerConfig );
    
    // init bookshelves if enabled
    if ( bookshelvesEnabled ) {
        if ( userLoggedIn ) {
            viewerJS.bookshelvesUser.init( watchlistConfig );
        }
        else {
            viewerJS.bookshelvesSession.init( watchlistConfig );
        }
    }
    
    // set content height to window height
    // setContentHeight(); --> METHODE AN LAYOUT ANPASSEN!
    
    // mobile view manipulations
    if ( window.matchMedia( '(max-width: 768px)' ).matches ) {}
    $( window ).on( 'resize orientationchange', function() {} );
} );
