var particlesHere = {
	frame: [],
	create: function(x, y, amount, depth, size_multiplier) {
		var stack = [];
		
		for (z = 0; z < depth; z++) {
			var layer = [amount];
			for (i = 0; i < amount; i++) {
				size = z * size_multiplier;
				object = [];
				object["x_size"] = size;
				object["x_position"] = x;
				object["x_velocity"] = rng(0 - size * size_velocity_constant, size * size_velocity_constant);
				object["y_size"] = size;
				object["y_position"] = y;
				object["y_velocity"] = rng(0 - size * size_velocity_constant, size * size_velocity_constant);
				object["colour_r"] = colour_base_r + Math.round(size * colour_depth);
				object["colour_g"] = colour_base_g + Math.round(size * colour_depth);
				object["colour_b"] = colour_base_b + Math.round(size * colour_depth);
				object["colour_a"] = 255;
				object["keep"] = false;
				layer[i] = object;
			}
			
			stack[z] = layer;
		}
		particlesHere.frame[frame.length] = stack;
	},
	
	draw: function(canvas, context) {
		for (s = 0; s < particlesHere.frame.length; s++) {
			for (z = 0; z < particlesHere.frame[s].length; z++) {
				for (i = 0; i < particlesHere.frame[s][z].length; i++) {
					
					// Calculate new object position based on object velocity
					particlesHere.frame[s][z][i]["x_position"] += particlesHere.frame[s][z][i]["x_velocity"];
					particlesHere.frame[s][z][i]["y_position"] += particlesHere.frame[s][z][i]["y_velocity"];

					var donotdraw;
					
					// If the velocity of the object caused it to leave the screen, destroy or move it:
					if (particlesHere.frame[s][z][i]["y_position"] > canvas.height ||
						particlesHere.frame[s][z][i]["x_position"] > canvas.width ||
						particlesHere.frame[s][z][i]["y_position"] < 0 - particlesHere.frame[s][z][i]["y_size"] ||
						particlesHere.frame[s][z][i]["x_position"] < 0 - particlesHere.frame[s][z][i]["x_size"] ){

							if (particlesHere.frame[s][z][i]["keep"]) {
								if (particlesHere.frame[s][z][i]["x_position"] > canvas.width) {
									particlesHere.frame[s][z][i]["x_position"]  = 0 - particlesHere.frame[s][z][i]["x_size"];
								} else if (particlesHere.frame[s][z][i]["x_position"] < 0) {
									particlesHere.frame[s][z][i]["x_position"]  = canvas.width - particlesHere.frame[s][z][i]["x_size"];
								}

								if (particlesHere.frame[s][z][i]["y_position"] > canvas.height) {
									particlesHere.frame[s][z][i]["y_position"]  = 0 - particlesHere.frame[s][z][i]["y_size"];
								} else if (frame[s][z][i]["y_position"] < 0) {
									particlesHere.frame[s][z][i]["y_position"]  = canvas.height;
								}

							} else {
								donotdraw = true;
							}

					}

					// Colour:
					if (!donotdraw) {
						context.fillStyle = 'rgba(' + particlesHere.frame[s][z][i]["colour_r"].toString() + ', ' + particlesHere.frame[s][z][i]["colour_g"].toString() + ', ' + particlesHere.frame[s][z][i]["colour_b"].toString() + ', ' + particlesHere.frame[s][z][i]["colour_a"].toString() + ')';
					}

					// Draw:
					context.fillRect(frame[s][z][i]["x_position"], frame[s][z][i]["y_position"], frame[s][z][i]["x_size"], frame[s][z][i]["y_size"]);

				}

			}
		}
	}
}