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
	if(active_nav_item === null) { return; }

	NAV_HIGHLIGHT.style.left = `${active_nav_item.offsetLeft}px`;
	NAV_HIGHLIGHT.style.top = `${active_nav_item.offsetTop}px`;
	NAV_HIGHLIGHT.style.width = `${active_nav_item.getBoundingClientRect().width}px`;
	NAV_HIGHLIGHT.style.height = `${active_nav_item.getBoundingClientRect().height}px`;
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
	document.getElementById('hamburger-menu').classList.remove('active');
	document.getElementById('header-wrapper-id').classList.remove('active');
}

// Simulate a click on the first nav element on script load
OnNavItemClicked(document.getElementsByClassName('nav-item')[0], document.getElementsByClassName('page-content')[0].id);

/**
 * Header animation
 * 
 * Handles the logic of smoothly transitioning the header from floating to sticking to the top
 */
const HEADER = document.getElementById('header-wrapper-id');
window.addEventListener('scroll', () =>
{
	if(window.scrollY === 0)
	{
		HEADER.classList.add('header-wrapper-expanded');
	}
	else
	{
		HEADER.classList.remove('header-wrapper-expanded');
	}
});

/* Logic for hamburger menu transition */
const HAMBURGER_MENU = document.getElementById('hamburger-menu');
HAMBURGER_MENU.addEventListener('click', () =>
{
	HAMBURGER_MENU.classList.toggle('active');
	HEADER.classList.toggle('active');
});

/* Settings Menu */
const SETTINGS_ICON = document.getElementById('settings-icon');
const SETTINGS_MENU = document.getElementById('settings-menu');
SETTINGS_ICON.addEventListener('click', () =>
{
	SETTINGS_ICON.classList.toggle('active');
	SETTINGS_MENU.classList.toggle('active');

	if(SETTINGS_MENU.classList.contains('active'))
	{
		if(window.innerWidth > 700)
		{
			SETTINGS_MENU.style.top = `${HEADER.getBoundingClientRect().height}px`;
		}
		else
		{
			SETTINGS_MENU.style.top = '50px';
		}

		place_algorithm_nav_highlight();
	}
});

/* Settings : Algorithm Selection */
const ALGORITHM_NAV = document.getElementById('background-algorithm-highlight');

let active_algorithm = null;

// Handle resizing events with the algorithm placement
window.addEventListener('resize', place_algorithm_nav_highlight);
function place_algorithm_nav_highlight()
{
	ALGORITHM_NAV.style.left = `${active_algorithm.offsetLeft}px`;
	ALGORITHM_NAV.style.top = `${active_algorithm.offsetTop}px`;
	ALGORITHM_NAV.style.width = `${active_algorithm.getBoundingClientRect().width}px`;
	ALGORITHM_NAV.style.height = `${active_algorithm.getBoundingClientRect().height}px`;
}

function on_algorithm_clicked(algorithm, content_id)
{
	active_algorithm = algorithm;

	for(let element of document.getElementsByClassName('algorithm-content'))
	{
		element.style.display = 'none';
	}
	document.getElementById(content_id).style.display = 'block';

	place_algorithm_nav_highlight();
}
on_algorithm_clicked(document.getElementsByClassName('algorithm-switch-option')[0], document.getElementsByClassName('algorithm-content')[0].id);

document.addEventListener('click', (event) =>
{
	if(!SETTINGS_MENU.contains(event.target) && !SETTINGS_ICON.contains(event.target))
	{
		SETTINGS_MENU.classList.remove('active');
		SETTINGS_ICON.classList.remove('active');
	}
});

/* Settings Inputs / Outputs */
document.getElementById('ms-refresh-rate-input').addEventListener('input', () =>
{
	document.getElementById('ms-refresh-rate-output').value = document.getElementById('ms-refresh-rate-input').value + ' Hz';
});

document.getElementById('ms-isovalue-input').addEventListener('input', () =>
{
	document.getElementById('ms-isovalue-output').value = document.getElementById('ms-isovalue-input').value + '%';
});

document.getElementById('ms-h-cells-input').addEventListener('input', () =>
{
	document.getElementById('ms-h-cells-output').value = document.getElementById('ms-h-cells-input').value;
});