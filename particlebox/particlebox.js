/*	particlebox 3.1
		(C) Benjamin Gwynn (Xenxier), 2015
		http://xenxier.com
*/

var particlebox = {
	version: 3.1,
	
	/*	
	 *	particlebox.stack
	 *
	 *	The array that holds all of particlebox's stacks
	 */
	stack: [],
	 
	/*	
	 *	particlebox.config
	 *
	 *	Object that contains the configuration of particlebox. Everything is set to 0
	 *	by default (except target refresh rate) and can be changed with particlebox.control()
	 */
	config: {
		refresh_rate: 60,
		target_refresh_rate: 60,
		draw_amount: 0,
		min_x_velocity: 0,
		max_x_velocity: 0,
		min_y_velocity: 0,
		max_y_velocity: 0,
		z_depth: 0,
		size_multiplier: 0,
		colour_base_r: 0,
		colour_base_g: 0,
		colour_base_b: 0,
		colour_depth: 0,
		spawn_location: 0,
		air_resistance: 0,
		gravity: 0,
		bg_r: 0,
		bg_g: 0,
		bg_b: 0
	},
	
	/*	
	 *	particlebox.parseslider
	 *
	 *	Parses the slider
	 */
	 
	parseslider: function(slider) {
		if (particlebox.config[$(slider).attr('id')] != parseFloat($(slider).attr('data-slider'))) {
			console.log("Parsing slider " + $(slider).attr('id') + ", it's value is " + $(slider).attr('data-slider'));
			particlebox.config[$(slider).attr('id')] = parseFloat($(slider).attr('data-slider'));
			particlebox.recreate();
		}
	},
	
	/*	
	 *	particlebox.getCurrentConfigAsPreset
	 *
	 *	Prints to current particlebox config as a present in the console.
	 */
	getCurrentConfigAsPreset: function() {
		console.log("PARTICLEBOX CONFIG AUTOMATICALLY GENERATED ON PARTICLEBOX " + particlebox.version);
		console.log("-------------------------------------------------------------");
		console.log("myconfig: function() {");
		var setting;
		for (setting in particlebox.config)  {
			console.log("	particlebox.control('" + setting + "', " + particlebox.config[setting] + ");")
		}
		console.log("}");
		console.log("-------------------------------------------------------------");
	},
	
	/*	
	 *	particlebox.recreate
	 *
	 *	Recreate all particles by destroying the stack and recreating it
	 */
	
	recreate: function() {
		particlebox.stack = []; // reset stack
		particlebox.create();
	},
	
	/*	
	 *	particlebox.create
	 *
	 *	Creates a stack of particles based on the config
	 */
	 
	create: function(log) {
		if (log) {
			console.log("Recreating objects from configuration.");
		}
		
		// Set the canvas background based on the RGB values
		canvas.style.backgroundColor = 'rgb(' + particlebox.config.bg_r + ',' + particlebox.config.bg_g + ',' + particlebox.config.bg_b + ')';
	
		// Define the size of the stack
		particlebox.stack = [particlebox.config.z_depth];
		
		// Populate the stack:
		for (z = 0; z < particlebox.config.z_depth; z++) {
			layer = [particlebox.config.draw_amount];
			
			for (i = 0; i < particlebox.config.draw_amount; i++) {
				
				// Create a new object:
				object = [];
				
				// Calculate the objects size and gravity:
				size = z * particlebox.config.size_multiplier;
				if (particlebox.config.gravity > 0) {
					object["weight"] = size * particlebox.config.gravity;
				} else {
					object["weight"] = 1;
				}
				
				// Calculate the object's properties:
				object["x_size"] = size;
				object["y_size"] = size;
				object["x_velocity"] = (rng((particlebox.config.max_x_velocity * particlebox.config.min_x_velocity) / object["weight"], particlebox.config.max_x_velocity / object["weight"]) / particlebox.config.refresh_rate) * particlebox.config.target_refresh_rate;
				object["y_velocity"] = (rng((particlebox.config.max_y_velocity * particlebox.config.min_y_velocity) / object["weight"], particlebox.config.max_y_velocity / object["weight"]) / particlebox.config.refresh_rate) * particlebox.config.target_refresh_rate;
				object["colour_r"] = particlebox.config.colour_base_r + Math.round(size * particlebox.config.colour_depth);
				object["colour_g"] = particlebox.config.colour_base_g + Math.round(size * particlebox.config.colour_depth);
				object["colour_b"] = particlebox.config.colour_base_b + Math.round(size * particlebox.config.colour_depth);
				object["colour_a"] = 1; // this controls alpha, set it to be fully opaque for now
				object["x_resistance"] = particlebox.config.air_resistance * (z / particlebox.config.z_depth);
				object["y_resistance"] = particlebox.config.air_resistance * (z / particlebox.config.z_depth);
				
				// Move the object to the correct position on the screen:
				switch(particlebox.config.spawn_location) {
					case 0: // Random position on screen
						object["y_position"] = rng(0, window.innerHeight - size);
						object["x_position"] = rng(0, window.innerWidth - size);
						break;
					case 1: // Screen centre
						object["y_position"] = window.innerHeight / 2;
						object["x_position"] = window.innerWidth / 2;
						break;
					case 2: // 0, 0 (top left)
						object["y_position"] = 0;
						object["x_position"] = 0;
						break;
					case 3: // Spread X
						object["y_position"] = window.innerHeight / 2;
						object["x_position"] = rng(0, window.innerWidth - size);
						break;
					case 4: // Spread Y
						object["y_position"] = rng(0, window.innerHeight - size);
						object["x_position"] = window.innerWidth / 2;
						break;
				}
				
				// Keep by default
				object["keep"] = true;
				
				// Add object to layer
				layer[i] = object;
			}
			
			// Add the layer to the stack
			particlebox.stack[z] = layer;
		}
	},
	
	/*	
	 *	particlebox.control(variable, value)
	 *
	 *	Modifies a particlebox variable without breaking Foundation sliders if
	 *	they are present.
	 *
	 *	This is for controlling the slider, not for reading values from the slider.
	 */
	 
	control: function(variable, value) {
		if ($('.range-slider').length > 0) {
			// Ask foundation to move the slider:
			$('#' + variable).foundation('slider', 'set_value', value);
		} else {
			// Change the config variable
			particlebox.config[variable] = value;
		}
	},
	
	/*	
	 *	particlebox.draw()
	 *
	 *	Draws particlebox
	 */
	
	draw: function() {
		// Clear the canvas:
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		// Loop through all layers in the stack:
		for (z = 0; z < particlebox.config.z_depth; z++) {
			
			// Draw everything on this layer:
			for (i = 0; i < particlebox.config.draw_amount; i++) {
			
				// Calculate new object position
				particlebox.stack[z][i]["x_position"] += particlebox.stack[z][i]["x_velocity"];
				particlebox.stack[z][i]["y_position"] += particlebox.stack[z][i]["y_velocity"];
				
				// Calculate the new velocity based on air resistance and *gravity*:
				if (particlebox.stack[z][i]["x_velocity"] < 0) {
					// Going backwards:
					if (particlebox.stack[z][i]["x_velocity"] + particlebox.stack[z][i]["x_resistance"] > 0) {
						particlebox.stack[z][i]["x_velocity"] = 0;
					} else {
						particlebox.stack[z][i]["x_velocity"] += particlebox.stack[z][i]["x_resistance"];
					}
				} else if (particlebox.stack[z][i]["x_velocity"] > 0) {
					// Going forwards:
					if (particlebox.stack[z][i]["x_velocity"] + particlebox.stack[z][i]["x_resistance"] < 0) {
						particlebox.stack[z][i]["x_velocity"] = 0;
					} else {
						particlebox.stack[z][i]["x_velocity"] -= particlebox.stack[z][i]["x_resistance"];
					}
				}
				
				if (particlebox.stack[z][i]["y_velocity"] < 0) {
					// Going backwards:
					if (particlebox.stack[z][i]["y_velocity"] + particlebox.stack[z][i]["y_resistance"] > 0) {
						particlebox.stack[z][i]["y_velocity"] = 0;
					} else {
						particlebox.stack[z][i]["y_velocity"] += particlebox.stack[z][i]["y_resistance"];
					}
				} else if (particlebox.stack[z][i]["y_velocity"] > 0) {
					// Going forwards:
					if (particlebox.stack[z][i]["y_velocity"] + particlebox.stack[z][i]["y_resistance"] < 0) {
						particlebox.stack[z][i]["y_velocity"] = 0;
					} else {
						particlebox.stack[z][i]["y_velocity"] -= particlebox.stack[z][i]["y_resistance"];
					}
				}
				
				// If the velocity of the object caused it to leave the screen, destroy or move it:
				if (particlebox.stack[z][i]["y_position"] > canvas.height || 
					particlebox.stack[z][i]["x_position"] > canvas.width ||
					particlebox.stack[z][i]["y_position"] < 0 - particlebox.stack[z][i]["y_size"] ||
					particlebox.stack[z][i]["x_position"] < 0 - particlebox.stack[z][i]["x_size"] ){
						if (particlebox.stack[z][i]["keep"]) {
							if (particlebox.stack[z][i]["x_position"] > canvas.width) {
								particlebox.stack[z][i]["x_position"]  = 0 - particlebox.stack[z][i]["x_size"];
							} else if (particlebox.stack[z][i]["x_position"] < 0) {
								particlebox.stack[z][i]["x_position"]  = canvas.width - particlebox.stack[z][i]["x_size"];
							}
							
							if (particlebox.stack[z][i]["y_position"] > canvas.height) {
								particlebox.stack[z][i]["y_position"]  = 0 - particlebox.stack[z][i]["y_size"];
							} else if (particlebox.stack[z][i]["y_position"] < 0) {
								particlebox.stack[z][i]["y_position"]  = canvas.height;
							}
						} else {
							// Destroy this object by turning it into an empty string. Making it a string rather than null stops errors from being thrown when trying to access it.
							particlebox.stack[z][i] = "";
						}
				}
			
				// Colour:
				context.fillStyle = 'rgba(' + particlebox.stack[z][i]["colour_r"].toString() + ', ' + particlebox.stack[z][i]["colour_g"].toString() + ', ' + particlebox.stack[z][i]["colour_b"].toString() + ', ' + particlebox.stack[z][i]["colour_a"].toString() + ')';
				
				// Draw:
				context.fillRect(particlebox.stack[z][i]["x_position"], particlebox.stack[z][i]["y_position"], particlebox.stack[z][i]["x_size"], particlebox.stack[z][i]["y_size"]);
			}
		}
	}
}

// On resize:
window.addEventListener("resize", function(){
	// Recalculate the size of the canvas:
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	// Recreate all objects
	particlebox.recreate();
});