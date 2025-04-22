// Set the width/height of the navigation highlight element to be what the other elements have
const NAV_HIGHLIGHT = document.getElementById('nav-highlight');
NAV_HIGHLIGHT.style.height = `${document.getElementsByClassName("nav-item")[0].getBoundingClientRect().height}px`;

function OnNavItemClicked(NavItem, ContentID)
{
	const CONTENT = document.getElementById(ContentID);

	// Hide all content before displaying the new
	for(let element of document.getElementsByClassName('page-content'))
	{
		element.style.display = 'none';
	}

	// Move the navigation highlight element to hover over the appropriate element
	NAV_HIGHLIGHT.style.left = `${NavItem.offsetLeft}px`;
	NAV_HIGHLIGHT.style.top = `${NavItem.offsetTop}px`;
	NAV_HIGHLIGHT.style.width = `${NavItem.getBoundingClientRect().width}px`;

	CONTENT.style.display = 'block';
}

// Simulate a click on the first nav element on script load
OnNavItemClicked(document.getElementsByClassName('nav-item')[0], document.getElementsByClassName('page-content')[0].id);