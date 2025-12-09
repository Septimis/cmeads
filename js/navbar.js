/* All logic with the navigation bar */

/**
 * Navigation Highlight
 * 
 * Handles the logic behind highlighting the active page.
 * Takes into account a browser which resizes
 */
// Set the width/height of the navigation highlight element to be what the other elements have
const NAV_HIGHLIGHT = document.getElementById('nav-highlight');
NAV_HIGHLIGHT.style.height = `${document.getElementsByClassName("nav-item")[0].getBoundingClientRect().height}px`;

let active_nav_item = null;

// Move the highlighted widget when the window resizes
window.addEventListener('resize', place_nav_highlight);

// Sets the highlighted widget where the active navigation item is
function place_nav_highlight()
{
	NAV_HIGHLIGHT.style.left = `${active_nav_item.offsetLeft}px`;
	NAV_HIGHLIGHT.style.top = `${active_nav_item.offsetTop}px`;
	NAV_HIGHLIGHT.style.width = `${active_nav_item.getBoundingClientRect().width}px`;
}

// Handle displaying the correct content according to what NavItem was clicked.
// Simulates the NavItem getting highlighted
function OnNavItemClicked(NavItem, ContentID)
{
	active_nav_item = NavItem;

	// Hide all content before displaying the new
	for(let element of document.getElementsByClassName('page-content'))
	{
		element.style.display = 'none';
	}
	document.getElementById(ContentID).style.display = 'block';

	// Move the navigation highlight element to hover over the appropriate element
	place_nav_highlight();

	// Close the side menu (if appropriate)
}

// Simulate a click on the first nav element on script load
OnNavItemClicked(document.getElementsByClassName('nav-item')[0], document.getElementsByClassName('page-content')[0].id);

/**
 * Header animation
 * 
 * Handles the logic of smoothly transitioning the header from floating to sticking to the top
 */
const header = document.getElementById('header-wrapper-id');
window.addEventListener('scroll', () =>
{
	if(window.scrollY === 0)
	{
		header.classList.add('header-wrapper-expanded');
	}
	else
	{
		header.classList.remove('header-wrapper-expanded');
	}
});

/* Logic for hamburger menu transition */
const hamburger_menu = document.getElementById('hamburger-menu');
hamburger_menu.addEventListener('click', () =>
{
	hamburger_menu.classList.toggle('active');
	header.classList.toggle('active');
});