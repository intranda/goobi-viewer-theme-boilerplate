/*****************************************************************************************
 * Custom JavaScript for "boilerplate"
 ****************************************************************************************/

/*
 initSliders may be used to add new cms slider styles (swiper configuration objects) to the 
 list of availabe slider styles, or alter existing ones. See the commented out examples below for each use case
 This method MUST be called before document.ready for them to show up in the styles dropdown in the cms backend
*/
function initSliders() {
	
// EXAMPLE SLIDER

//	var sliderExampleConfig = {
//		maxSlides: 8,
//		timeout: 10000,
//		imageWidth: 1100,
//		imageHeight: 500,
//		 swiperConfig: {
//			  slidesPerView: 3,
//			  spaceBetween: 30,
//			  loop: true,
//			  speed: 400,
//		      pagination: {
//		          el: '.slider-example__dots',
//		          clickable: true
//		      },
//		      breakpoints: {
//		          300: { 
//		             slidesPerView: 1.2,
//		          },
//		          600: {  
//		             slidesPerView: 2.3,
//		          },
//		          900: {
//		             slidesPerView: 3.5,   
//		          } 
//		      }
//		}
//	}

//	viewerJS.slider.set('example-slider', sliderExampleConfig);

}
initSliders();

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
        theme: currentTheme,
        localStoragePossible: viewerJS.localStoragePossible,
        widgetNerSidebarRight: true,
    };
    
    viewerJS.init( viewerConfig );
    
    // set content height to window height
    // setContentHeight(); --> METHODE AN LAYOUT ANPASSEN!
    
    // mobile view manipulations
    if ( window.matchMedia( '(max-width: 768px)' ).matches ) {}
    $( window ).on( 'resize orientationchange', function() {} );
} ); 
