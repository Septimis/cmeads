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
}

// Simulate a click on the first nav element on script load
OnNavItemClicked(document.getElementsByClassName('nav-item')[0], document.getElementsByClassName('page-content')[0].id);