// Particlebox 3.1 Presets

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
		particlebox.control('bg_r', 35);
		particlebox.control('bg_g', 35);
		particlebox.control('bg_b', 35);
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
		particlebox.control('bg_r', 45);
		particlebox.control('bg_g', 45);
		particlebox.control('bg_b', 45);
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
		particlebox.control('bg_r', 20);
		particlebox.control('bg_g', 40);
		particlebox.control('bg_b', 80);
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
		particlebox.control('bg_r', 40);
		particlebox.control('bg_g', 60);
		particlebox.control('bg_b', 140);
	},
	
	error: function() {
		particlebox.control('draw_amount', 100);
		particlebox.control('max_x_velocity', 30);
		particlebox.control('max_y_velocity', 30);
		particlebox.control('min_x_velocity', -1);
		particlebox.control('min_y_velocity', -1);
		particlebox.control('z_depth', 12);
		particlebox.control('size_multiplier', 2);
		particlebox.control('colour_base_r', 255);
		particlebox.control('colour_base_g', 30);
		particlebox.control('colour_base_b', 30);
		particlebox.control('colour_depth', 5);
		particlebox.control('spawn_location', 1);
		particlebox.control('refresh_rate', 94);
		particlebox.control('air_resistance', 0.3);
		particlebox.control('gravity', 0);
		particlebox.control('bg_r', 10);
		particlebox.control('bg_g', 10);
		particlebox.control('bg_b', 10);
	},
	
	excited: function() {
	 	particlebox.control('refresh_rate', 60); 
	 	particlebox.control('target_refresh_rate', 60); 
	 	particlebox.control('draw_amount', 25); 
	 	particlebox.control('min_x_velocity', -1); 
	 	particlebox.control('max_x_velocity', -64); 
	 	particlebox.control('min_y_velocity', 0.68); 
	 	particlebox.control('max_y_velocity', 12); 
	 	particlebox.control('z_depth', 18); 
	 	particlebox.control('size_multiplier', 2); 
	 	particlebox.control('colour_base_r', 255); 
	 	particlebox.control('colour_base_g', 222); 
	 	particlebox.control('colour_base_b', 171); 
	 	particlebox.control('colour_depth', -1); 
	 	particlebox.control('spawn_location', 0); 
	 	particlebox.control('air_resistance', 0.14); 
	 	particlebox.control('gravity', 0.06); 
	 	particlebox.control('bg_r', 101); 
	 	particlebox.control('bg_g', 46); 
	 	particlebox.control('bg_b', 195); 
	 },
	 
	inksplash: function() { 
		particlebox.control('refresh_rate', 60); 
		particlebox.control('target_refresh_rate', 60); 
		particlebox.control('draw_amount', 1); 
		particlebox.control('min_x_velocity', -1); 
		particlebox.control('max_x_velocity', 64); 
		particlebox.control('min_y_velocity', -1); 
		particlebox.control('max_y_velocity', 64); 
		particlebox.control('z_depth', 128); 
		particlebox.control('size_multiplier', 1); 
		particlebox.control('colour_base_r', 75); 
		particlebox.control('colour_base_g', 119); 
		particlebox.control('colour_base_b', 171); 
		particlebox.control('colour_depth', -1); 
		particlebox.control('spawn_location', 1); 
		particlebox.control('air_resistance', 0); 
		particlebox.control('gravity', 7.64); 
		particlebox.control('bg_r', 18); 
		particlebox.control('bg_g', 18); 
		particlebox.control('bg_b', 34); 
	} 
}