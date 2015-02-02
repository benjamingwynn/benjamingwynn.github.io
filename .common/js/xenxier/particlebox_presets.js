var particlebox_presets = {
	xenxier2: function() {
		particlebox.control('draw_amount', 14);
		particlebox.control('max_x_velocity', 8);
		particlebox.control('max_y_velocity', 8);
		particlebox.control('min_x_velocity', 1);
		particlebox.control('min_y_velocity', 1);
		particlebox.control('z_depth', 12);
		particlebox.control('size_multiplier', 1.5);
		particlebox.control('colour_base_r', 50);
		particlebox.control('colour_base_g', 220);
		particlebox.control('colour_base_b', 250);
		particlebox.control('colour_depth', 2);
		particlebox.control('spawn_location', 0);
		particlebox.control('refresh_rate', 60);
		particlebox.control('air_resistance', 0);
		particlebox.control('gravity', 1);
	},
	
	xenxier: function() {
		particlebox.control('draw_amount', 16);
		particlebox.control('max_x_velocity', 8);
		particlebox.control('max_y_velocity', 8);
		particlebox.control('min_x_velocity', -1);
		particlebox.control('min_y_velocity', -1);
		particlebox.control('z_depth', 8);
		particlebox.control('size_multiplier', 2);
		particlebox.control('colour_base_r', 50);
		particlebox.control('colour_base_g', 220);
		particlebox.control('colour_base_b', 250);
		particlebox.control('colour_depth', 2);
		particlebox.control('spawn_location', 0);
		particlebox.control('refresh_rate', 60);
		particlebox.control('air_resistance', 0);
		particlebox.control('gravity', 0);
	},
	
	rain: function() {
		particlebox.control('draw_amount', 262);
		particlebox.control('max_x_velocity', 0);
		particlebox.control('max_y_velocity', 18);
		particlebox.control('min_x_velocity', 1);
		particlebox.control('min_y_velocity', 1);
		particlebox.control('z_depth', 4);
		particlebox.control('size_multiplier', 2);
		particlebox.control('colour_base_r', 120);
		particlebox.control('colour_base_g', 120);
		particlebox.control('colour_base_b', 255);
		particlebox.control('colour_depth', -4);
		particlebox.control('spawn_location', 0);
		particlebox.control('refresh_rate', 94);
		particlebox.control('air_resistance', 0);
		particlebox.control('gravity', 1);
	},
	
	snow: function() {
		particlebox.control('draw_amount', 250);
		particlebox.control('max_x_velocity', 2);
		particlebox.control('max_y_velocity', 5);
		particlebox.control('min_x_velocity', -1);
		particlebox.control('min_y_velocity', 1);
		particlebox.control('z_depth', 4);
		particlebox.control('size_multiplier', 2);
		particlebox.control('colour_base_r', 255);
		particlebox.control('colour_base_g', 255);
		particlebox.control('colour_base_b', 255);
		particlebox.control('colour_depth', 0);
		particlebox.control('spawn_location', 0);
		particlebox.control('refresh_rate', 60);
		particlebox.control('air_resistance', 0);
		particlebox.control('gravity', 1);
	}
}