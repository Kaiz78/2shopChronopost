var nb_brands_links_images = 4;

var get_angle_deg = function(ax, ay, bx, by) {
	var angle_rad = Math.atan((ay - by) / (ax - bx));
	var angle_deg = angle_rad * 180 / Math.PI;
	
	return angle_deg;
};

var check_brands_links_animation = function(e) {
	if ($(this).width() >= 890) {
		var tolerance_moving_pct_x = 10;
		var tolerance_moving_pct_y = 30;
		
		var div = $('#brands_links');
		var lines = div.find('.line');
		var div_offset = div.offset();
		var div_img_width = div.width();
		var div_img_height = div.height();
		var div_img_center_x = div_img_width / 2;
		var div_img_center_y = div_img_height / 2;
		var mouse_x = e.pageX - div_offset.left;
		var mouse_y = e.pageY - div_offset.top;
		
		// On calcule le pourcentage du décalage de la souris par rapport au centre de la div
		var decalage_pct_x = tolerance_moving_pct_x * ((mouse_x - div_img_center_x) / div_img_center_x);
		var decalage_pct_y = tolerance_moving_pct_y * ((mouse_y - div_img_center_y) / div_img_center_y);
		
		// On parcourt chaque marque dans la div
		lines.each(function() {
			var line = $(this);
			var circle = $('#circle_' + (line.attr('id').split('_')[1]));
			
			var decalage_x = line.width() * (decalage_pct_x / 100);
			var decalage_y = line.height() * (decalage_pct_y / 100);
			
			// On décale la marque en fonction de la position de l'image, dans la limite de tolerance_moving_pct
			line.css('-webkit-transform', 'translate(' + decalage_pct_x.toFixed(2) + '%, ' + decalage_pct_y.toFixed(2) + '%)');
			line.css('-moz-transform', 'translate(' + decalage_pct_x.toFixed(2) + '%, ' + decalage_pct_y.toFixed(2) + '%)');
			line.css('-ms-transform', 'translate(' + decalage_pct_x.toFixed(2) + '%, ' + decalage_pct_y.toFixed(2) + '%)');
			line.css('-o-transform', 'translate(' + decalage_pct_x.toFixed(2) + '%, ' + decalage_pct_y.toFixed(2) + '%)');
			line.css('transform', 'translate(' + decalage_pct_x.toFixed(2) + '%, ' + decalage_pct_y.toFixed(2) + '%)');
			
			circle.css('-webkit-transform', 'translate(' + decalage_x.toFixed(2) + 'px, ' + decalage_y.toFixed(2) + 'px)');
			circle.css('-moz-transform', 'translate(' + decalage_x.toFixed(2) + 'px, ' + decalage_y.toFixed(2) + 'px)');
			circle.css('-ms-transform', 'translate(' + decalage_x.toFixed(2) + 'px, ' + decalage_y.toFixed(2) + 'px)');
			circle.css('-o-transform', 'translate(' + decalage_x.toFixed(2) + 'px, ' + decalage_y.toFixed(2) + 'px)');
			circle.css('transform', 'translate(' + decalage_x.toFixed(2) + 'px, ' + decalage_y.toFixed(2) + 'px)');
		});
		
		// Activation de l'effet de surbrillance
		$('#brands_links .line a').on('mouseover', function() {
			var line = $(this).closest('.line');
			var suffix = line.attr('id').split('_')[1];
			
			$('#img_' + suffix).addClass('active');
		});
		
		// Désactivation de l'effet de surbrillance
		$('#brands_links .line a').on('mouseout', function() {
			var line = $(this).closest('.line');
			var suffix = line.attr('id').split('_')[1];
			
			$('#img_' + suffix).removeClass('active');
		});
	}
};

$(function() {
	var wait_brands_links_img = setInterval(function() {
		if (!nb_brands_links_images) {
			$('#brands_links').addClass('ready');
			clearInterval(wait_brands_links_img);
		}
	}, 50);
	
	$('#brands_links').on('mousemove', check_brands_links_animation);
});