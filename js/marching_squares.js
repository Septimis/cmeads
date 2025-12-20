/**
 * Marching Squares is the algorithm which provides the background drawing 
 * See https://en.wikipedia.org/wiki/Marching_squares
 */

// The arbitrary threshold to determine what lines are drawn
let isovalue = 0.5;

const ISOVALUE_INPUT = document.getElementById('ms-isovalue-input');
ISOVALUE_INPUT.addEventListener('input', () =>
{
	isovalue = Number(ISOVALUE_INPUT.value) / 100.0;
	render();
});

// The number of cells horizontally and vertically within the array
let horizontal_cells = 10;
let vertical_cells = -1; // Will be auto assigned later to fit the viewport

const HORIZONTAL_CELLS_INPUT = document.getElementById('ms-h-cells-input');
HORIZONTAL_CELLS_INPUT.addEventListener('input', () =>
{
	horizontal_cells = Number(HORIZONTAL_CELLS_INPUT.value);
	render();
});

// The number of pixels in between the cells.
let cell_spacing = -1;

// The array of cells representing the grid
let squares = [];

// List of each container in which the marching squares will appear
const MARCHING_SQUARES_CONTAINER = document.getElementById('marching-squares-container');

// HTML Canvas element to draw on
const CANVAS = MARCHING_SQUARES_CONTAINER.firstElementChild;
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;
if(!CANVAS.getContext)
{
	alert('Could not get the canvas to draw background animation!');
}
const CANVAS_CONTEXT = CANVAS.getContext('2d');

// number of ms to wait before redrawing the squares
const resize_timer = 500;

// The identifier associated with the timer
let resize_timer_id = 1;

// Fires each time the viewport resizes. Waits the time specified in 'resize_timer' before redrawing the squares
window.addEventListener('resize', () =>
{
	clearTimeout(resize_timer_id);

	resize_timer_id = setTimeout(render, resize_timer);
});

function render()
{
	cell_spacing = window.innerWidth / horizontal_cells;
	vertical_cells = Math.floor(window.innerHeight / cell_spacing) + 1;

	CANVAS.width = window.innerWidth;
	CANVAS.height = window.innerHeight;

	squares = new Array(horizontal_cells * vertical_cells);

	populate_data();
	draw();
}

function populate_data()
{
	for(let i = 0; i < squares.length; i++)
	{
		squares[i] = Math.random().toFixed(2);
	}
}

function draw()
{
	const can_draw = 
		CANVAS.getContext &&
		typeof horizontal_cells == "number" &&
		typeof vertical_cells == "number" &&
		horizontal_cells > 0 &&
		vertical_cells > 0 &&
		squares.length > 0;
	if(!can_draw) { return; }

	CANVAS_CONTEXT.beginPath();
	CANVAS_CONTEXT.fillStyle = 'black';
	for(let i = 0; i < squares.length; i++)
	{
		// Horizontal coordinate on the screen
		const x = i % horizontal_cells;
		const x_coord = x * cell_spacing;

		// Vertical coordinate on the screen
		const y = Math.floor(i / horizontal_cells);
		const y_coord = y * cell_spacing;

		// Skip the bottom most row
		if(y - 1 === vertical_cells) { break; }

		// Create a grid on screen
		CANVAS_CONTEXT.fillRect(x_coord, y_coord, 1, 1);

		const top_left = squares[y * horizontal_cells + x] > isovalue ? 1 : 0;
		const top_right = squares[y * horizontal_cells + x + 1] > isovalue ? 1 : 0;
		const bottom_right = squares[(y + 1) * horizontal_cells + x  + 1] > isovalue ? 1 : 0;
		const bottom_left = squares[(y + 1) * horizontal_cells + x] > isovalue ? 1 : 0;

		const binary_index = (top_left << 3) | (top_right << 2) | (bottom_right << 1) | (bottom_left << 0);

		switch(binary_index)
		{
			// No line
			case 0b0000:
			case 0b1111:
				break;

			// Bottom left line
			case 0b0001:
			case 0b1110:
				CANVAS_CONTEXT.moveTo(x_coord, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing / 2, y_coord + cell_spacing);
				CANVAS_CONTEXT.stroke();
				break;

			// Bottom right line
			case 0b0010:
			case 0b1101:
				CANVAS_CONTEXT.moveTo(x_coord + cell_spacing / 2, y_coord + cell_spacing);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.stroke();
				break;

			// Horizontal line
			case 0b0011:
			case 0b1100:
				CANVAS_CONTEXT.moveTo(x_coord, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.stroke();
				break;

			// Upper right line
			case 0b0100:
			case 0b1011:
				CANVAS_CONTEXT.moveTo(x_coord + cell_spacing / 2, y_coord);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.stroke();
				break;

			// Diagonal incline lines
			case 0b0101:
				CANVAS_CONTEXT.moveTo(x_coord, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing / 2, y_coord);
				CANVAS_CONTEXT.stroke();

				CANVAS_CONTEXT.moveTo(x_coord + cell_spacing / 2, y_coord + cell_spacing);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.stroke();

				break;

			// Vertical line
			case 0b0110:
			case 0b1001:
				CANVAS_CONTEXT.moveTo(x_coord + cell_spacing / 2, y_coord);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing / 2, y_coord + cell_spacing);
				CANVAS_CONTEXT.stroke();
				break;

			// Upper left line
			case 0b0111:
			case 0b1000:
				CANVAS_CONTEXT.moveTo(x_coord, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing / 2, y_coord);
				CANVAS_CONTEXT.stroke();
				break;

			// Diagonal decline lines
			case 0b1010:
				CANVAS_CONTEXT.moveTo(x_coord, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing / 2, y_coord + cell_spacing);
				CANVAS_CONTEXT.stroke();

				CANVAS_CONTEXT.moveTo(x_coord + cell_spacing / 2, y_coord);
				CANVAS_CONTEXT.lineTo(x_coord + cell_spacing, y_coord + cell_spacing / 2);
				CANVAS_CONTEXT.stroke();
				break;

			default:
				console.error(`At (${x}, ${y}), The binary index '${binary_index}' was computed, but there is no case for this.\n\tTL: ${top_left}\n\tTR: ${top_right}\n\tBR: ${bottom_right}\n\tBL: ${bottom_left}`);
				break;
		}
	}
}

render();