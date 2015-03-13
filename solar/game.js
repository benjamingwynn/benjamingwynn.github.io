// Earth's diameter in pixels
const EARTH_SIZE = 2;

// Earth's distance from the sun in pixels: (distance from earth to sun / size of earth) * earth size in pixels
const EARTH_DISTANCE = 150 * EARTH_SIZE;
// const EARTH_DISTANCE = 23809.5238095 * EARTH_SIZE;

// Pixels per KM
const PIXELS_PER_KM = 0.001;

// Planets Object

// * The Sun is not a planet, but it is here to simplify the code.

// * Orbit is in degrees, and can be over 360.
// * Planets can have infinite orbitals, but orbitals cannot have orbitals.
// * Image refers to the ID's of <img> tags in the webpage.

// * Distance should be in AU (Astronomical units) multiplied by EARTH_DISTANCE.
// * Size should be the average radius in earths, multiplied by EARTH_SIZE.
// * Speed should be in kilometers, then multiplied by the PIXELS_PER_KM constant.

// * We do not take Aphelion and Perihelion into account, instead we use the planets Semi-major axis.

var planets = {
	sun: {
		distance: 0,
		size: 109 * EARTH_SIZE,
		speed: 0,
		orbit: 0,
		image: "sun",
		shadowless: true
	},

	mercury: {
		distance: 0.387098 * EARTH_DISTANCE,
		size: 0.3829 * EARTH_SIZE,
		speed: 47.362 * PIXELS_PER_KM,
		orbit: 90,
		image: "mercury"
	},

	venus: {
		distance: 0.723327 * EARTH_DISTANCE,
		size: ((0.9499 + 0.866) / 2) * EARTH_SIZE,
		speed: 35.02 * PIXELS_PER_KM,
		orbit: 90,
		image: "venus"
	},

	earth: {
		distance: EARTH_DISTANCE,
		size: EARTH_SIZE,
		speed: 29.78 * PIXELS_PER_KM,
		orbit: 90,
		image: "earth",
		orbitals: [
			// Earth's Moon
			{
				distance: (0.00257 * EARTH_DISTANCE),
				size: 0.273 * EARTH_SIZE,
				speed: 1.022 * PIXELS_PER_KM,
				orbit: 90,
				image: "moon"
			}
		]
	},

	mars: {
		distance: 1.523679 * EARTH_DISTANCE,
		size: ((0.531 + 0.533) / 2) * EARTH_SIZE,
		speed: 24.077 * PIXELS_PER_KM,
		orbit: 90,
		image: "mars"
	},

	jupiter: {
		distance: 5.204267 * EARTH_DISTANCE,
		size: ((11.209 + 10.517) / 2) * EARTH_SIZE,
		speed: 13.07 * PIXELS_PER_KM,
		orbit: 90,
		image: "jupiter"
	},

	saturn: {
		distance: 9.5820172 * EARTH_DISTANCE,
		size: ((9.4492 + 8.5521) / 2) * EARTH_SIZE,
		speed: 9.69 * PIXELS_PER_KM,
		orbit: 90,
		image: "saturn"
	},

	uranus: {
		distance: 19.189253 * EARTH_DISTANCE,
		size: ((4.007 + 3.929) / 2) * EARTH_SIZE,
		speed: 6.80 * PIXELS_PER_KM,
		orbit: 90,
		image: "uranus"
	},

	neptune: {
		distance: 30.331855 * EARTH_DISTANCE,
		size: ((3.883 + 3.829) / 2) * EARTH_SIZE,
		speed: 5.43 * PIXELS_PER_KM,
		orbit: 90,
		image: "neptune"
	}
}

function startGame() {
}

function drawGame() {
	var planet;
	for (planet in planets) {
		drawPlanet(planet);
		var orbital;
		for (orbital in planets[planet].orbitals) {
			drawOrbital(planet, orbital);
		}
	}
}

function updateGame() {
	if (!paused) {
		var planet;
		for (planet in planets) {
			updatePlanet(planet);
			var orbital;
			for (orbital in planets[planet].orbitals) {
				updateOrbital(planet, orbital);
			}
		}
	}
}

function updatePlanet(planet) {
	planets[planet].orbit += planets[planet].speed;
}

function updateOrbital(planet, orbital) {
	planets[planet].orbitals[orbital].orbit += planets[planet].orbitals[orbital].speed;
}

function drawPlanet(planet) {
	// Rotate
	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.rotate(planets[planet].orbit * Math.PI / 180);
	
	// Translate back to origin
	context.translate(-canvas.width / 2, -canvas.height / 2);
	
	// Draw the planet
	context.drawImage(
		document.getElementById(planets[planet].image),
		(canvas.width / 2) - (planets[planet].size / 2),
		(canvas.height / 2) - (planets[planet].size / 2) - planets[planet].distance,
		planets[planet].size,
		planets[planet].size * document.getElementById(planets[planet].image).height / document.getElementById(planets[planet].image).width
	);
	
	// Draw the shadow
	if (!planets[planet].shadowless) {
		context.drawImage(
			document.getElementById("overlay"),
			(canvas.width / 2) - (planets[planet].size / 2),
			(canvas.height / 2) - (planets[planet].size / 2) - planets[planet].distance,
			planets[planet].size,
			planets[planet].size * document.getElementById(planets[planet].image).height / document.getElementById(planets[planet].image).width
		);
	}

	// Restore from rotation state
	context.restore();
}

function drawOrbital(planet, orbtial) {
	parent = planets[planet];
	child = parent.orbitals[orbtial];
	
	// Find the actual position of the parent, then get the centre.
	cx = canvas.width / 2;
	cy = canvas.height / 2;
	
	// Get level angle between 0 to 359 degrees in radians
	trueangle = ((parent.orbit % 360 + 360) % 360) * (Math.PI / 180);
	
	// Get the true X and Y position of the parent, taking the orbital angle into account
	x = (canvas.width / 2) - (parent.size / 2) + child.size;
	y = (canvas.height / 2) - (parent.size / 2) + child.size - parent.distance;
	
	truex = (x - cx) * Math.cos(trueangle) - (y - cy) * Math.sin(trueangle) + cx
	truey = (y - cy) * Math.cos(trueangle) + (x - cx) * Math.sin(trueangle) + cy
	
	// Rotate
	context.save();
	context.translate(truex, truey);
	context.rotate(child.orbit * Math.PI / 180);

	// Draw the orbital:
	context.drawImage(
		document.getElementById(child.image),
		0,
		-child.distance - (parent.size / 2) - (child.size / 2),
		child.size,
		child.size * document.getElementById(child.image).height / document.getElementById(child.image).width
	);

	// Draw the shadow
	if (!child.shadowless) {
		context.drawImage(
			document.getElementById("overlay"),
			0,
			-child.distance - (parent.size / 2) - (child.size / 2),
			child.size,
			child.size * document.getElementById(child.image).height / document.getElementById(child.image).width
		);
	}
	
	// Translate back to origin
	context.translate(-canvas.width / 2, -canvas.height / 2);

	// Restore from rotation state
	context.restore();
}