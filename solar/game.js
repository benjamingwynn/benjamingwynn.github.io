var planets = {
	sun: {
		distance: 0,
		orbit: 0,
		size: 256,
		speed: 0,
		image: "sun"
	},

	mercury: {
		distance: 150,
		orbit: 0,
		size: 16,
		speed: 0.5,
		image: "mercury"
	},

	venus: {
		distance: 170,
		orbit: 0,
		size: 19,
		speed: 0.75,
		image: "venus"
	},

	earth: {
		distance: 256,
		orbit: 0,
		size: 32,
		speed: 0.20,
		image: "earth",
		orbitals: [
			{
				distance: 48,
				orbit: 0,
				size: 16,
				speed: 0.4,
				image: "moon"
			}
		]
	},

	mars: {
		distance: 340,
		orbit: 0,
		size: 28,
		speed: 0.26,
		image: "mars"
	},

	jupiter: {
		distance: 420,
		orbit: 0,
		size: 64,
		speed: 0.1,
		image: "jupiter"
	},

	saturn: {
		distance: 500,
		orbit: 0,
		size: 64,
		speed: 0.15,
		image: "saturn"
	},

	uranus: {
		distance: 580,
		orbit: 0,
		size: 32,
		speed: 0.1,
		image: "uranus"
	},

	neptune: {
		distance: 600,
		orbit: 0,
		size: 32,
		speed: 0.2,
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
	
	//drawOrbital("earth", 0);
}

function updateGame() {
	var planet;
	for (planet in planets) {
		updatePlanet(planet);
		var orbital;
		for (orbital in planets[planet].orbitals) {
			updateOrbital(planet, orbital);
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
	
	context.drawImage(
		document.getElementById(planets[planet].image),
		(canvas.width / 2) - (planets[planet].size / 2),
		(canvas.height / 2) - (planets[planet].size / 2) - planets[planet].distance,
		planets[planet].size,
		planets[planet].size * document.getElementById(planets[planet].image).height / document.getElementById(planets[planet].image).width
	);

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
	
	//console.log(truex);
	//console.log(truey);
	
	// Rotate
	context.save();
	context.translate(truex, truey);
	context.rotate(child.orbit * Math.PI / 180);

	// Draw the planet:
	context.drawImage(
		document.getElementById(child.image),
		0,
		-child.distance,
		child.size,
		child.size * document.getElementById(child.image).height / document.getElementById(child.image).width
	);
	
	// Translate back to origin
	context.translate(-canvas.width / 2, -canvas.height / 2);

	// Restore from rotation state
	context.restore();
}