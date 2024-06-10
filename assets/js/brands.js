var why_timeout;

// Initialisation des translates des images
var init_product_blocks = function() {
	var do_it_again = false;
	
	var glasse = $('.product_blocks .product_img .glasse:not([translateX])');
	
	glasse.each(function() {
		// L'image doit s'être chargée pour qu'on puisse connaître ses dimensions
		if (!$(this).width() || !$(this).height()) {
			do_it_again = true;
		}
		else {
			var translate = $(this).css('transform').replace('(', '').replace(')', '').split(',');
			var translateX = Math.round(translate[4] / $(this).width() * 100);
			var translateY = Math.round(translate[5] / $(this).height() * 100);
			
			$(this).attr('translateX', translateX);
			$(this).attr('translateY', translateY);
			$(this).attr('opacity', $(this).css('opacity'));
		}
	});
	
	if (do_it_again) {
		setTimeout(function() {
			init_product_blocks();
		}, 10);
	}
};

// Check si on fait bouger une image produit
var check_product_blocks = function() {
	var product_blocks = $('.product_blocks');
	
	if (product_blocks.length) {
		product_blocks.each(function() {
			var product_block = $(this);
			var product_img = product_block.find('.product_img');
			
			if (product_img.length) {
				var phone = product_img.find('.phone');
				var glasses = product_img.find('.glasse');
				var icon = product_img.find('.icon');
				
				if (phone.length && glasses.length && icon.length) {
					var window_scroll_top = $(window).scrollTop();
					
					// Get current browser top and bottom
					var scrollTop = window_scroll_top + middle_tolerance_pixel;
					var scrollBottom = window_scroll_top + window_height - middle_tolerance_pixel;
					
					var offset_top = parseInt(phone.offset().top);
					var offset_bottom = offset_top + parseInt(phone.outerHeight());
					
					// Si le scroll de la page est arrivé au niveau de l'élément
					if (scrollTop < offset_bottom && scrollBottom > offset_top) {
						glasses.each(function(i) {
							var glasse = $(this);
							
							// On détermine l'opacité et la translation d'origine (celles indiquées dans le fichier CSS)
							var start_positionX = Number(glasse.attr('translateX'));
							var start_positionY = Number(glasse.attr('translateY'));
							var start_opacity = Number(glasse.attr('opacity'));
							
							// On détermine l'opacité et la translation actuelles de l'image
							var translate = glasse.css('transform').replace('(', '').replace(')', '').split(',');
							var translateX = Math.round(translate[4] / glasse.width() * 100);
							var translateY = Math.round(translate[5] / glasse.height() * 100);
							var opacity = glasse.css('opacity');
							
							// Temps de scrolling que met l'animation de mouvement de la glasse pour arriver à sa position finale.
							// Plus c'est petit, plus il faudra scroller vers le bas pour que l'animation se termine.
							// Plus c'esg grand, moins il faudra scroller vers le bas pour que l'animation se termine.
							var speed_height = 1.5;
							
							// On calcule la diff
							var diff = Number(((((scrollBottom - offset_top) / (window_height / speed_height)) * 100) * Math.abs(start_positionY)) / 100);
							
							// On détermine la nouvelle opacité
							opacity = start_opacity + (diff / Math.abs(start_positionY));
							
							if (opacity < start_opacity) opacity = start_opacity;
							if (opacity > 1) opacity = 1;
							
							// Si 1ère glasse
							if (i == 0) {
								// On détermine la nouvelle translation
								translateY = start_positionY + diff;
								
								if (product_img.hasClass('position-right')) {
									translateX = start_positionX + diff;
									
									// Cette nouvelle opacité et translation ne doivent pas dépasser celles d'origine
									if (translateX > 0) translateX = 0;
									if (translateX < start_positionX) translateX = start_positionX;
								}
								else if (product_img.hasClass('position-left')) {
									translateX = start_positionX - diff;
									
									if (translateX < 0) translateX = 0;
									if (translateX > start_positionX) translateX = start_positionX;
								}
								
								if (translateY > 0) translateY = 0;
								if (translateY < start_positionY) translateY = start_positionY;
							}
							// Si 2ème glasse
							else {
								// On détermine la nouvelle translation
								translateY = start_positionY - diff;
								
								if (product_img.hasClass('position-right')) {
									translateX = start_positionX - diff;
									
									// Cette nouvelle opacité et translation ne doivent pas dépasser celles d'origine
									if (translateX < 0) translateX = 0;
									if (translateX > start_positionX) translateX = start_positionX;
								}
								else if (product_img.hasClass('position-left')) {
									translateX = start_positionX + diff;
									
									if (translateX > 0) translateX = 0;
									if (translateX < start_positionX) translateX = start_positionX;
								}
								
								if (translateY < 0) translateY = 0;
								if (translateY > start_positionY) translateY = start_positionY;
							}
							
							// Puis on applique les nouvelles propriétés CSS
							glasse.css('-webkit-transform', 'translate(' + translateX + '%, ' + translateY + '%)');
							glasse.css('-moz-transform', 'translate(' + translateX + '%, ' + translateY + '%)');
							glasse.css('-ms-transform', 'translate(' + translateX + '%, ' + translateY + '%)');
							glasse.css('-o-transform', 'translate(' + translateX + '%, ' + translateY + '%)');
							glasse.css('transform', 'translate(' + translateX + '%, ' + translateY + '%)');
							glasse.css('opacity', opacity);
						});
					}
				}
			}
		});
	}
};

// Initialisation des pourcentages à zéro
var init_why_pct = function() {
	$('#why .number').each(function() {
		$(this).attr('pct', $(this).html()).html('0');
	});
};

// Check si on lance l'incrémentation des pourcentages
var check_why_pct = function() {
	var why = $('#why');
	
	if (why.length && !why_timeout) {
		var numbers = why.find('.number:not(.displayed)');
		
		if (numbers.length) {
			var window_scroll_top = $(window).scrollTop();
			
			// Get current browser top and bottom
			var scrollTop = window_scroll_top + small_tolerance_pixel;
			var scrollBottom = window_scroll_top + window_height - small_tolerance_pixel;
			
			numbers.each(function() {
				var number = $(this);
				
				if (!number.is('.displayed') && !why_timeout) {
					var offset_top = parseInt(number.offset().top);
					var offset_bottom = offset_top + parseInt(number.outerHeight());
					
					// Si le scroll de la page est arrivé au niveau de l'élément
					if (scrollTop < offset_bottom && scrollBottom > offset_top) {
						why_timeout = setInterval(function() {
							var num = Number(number.html());
							var end = Number(number.attr('pct'));
							
							if (num != end) {
								number.html(++num);
							}
							else {
								clearInterval(why_timeout);
								why_timeout = null;
								number.addClass('displayed');
								
								// Check si on lance l'incrémentation des pourcentages
								check_why_pct();
							}
						}, 20);
					}
				}
			});
		}
	}
};

$(function() {
	var selector_scroll = ($('#parallax_container').length ? $('#parallax_container') : $(window, document));
	
	// On initialise les translates des images
	init_product_blocks();
	
	// On initialise les pourcentages à zéro
	init_why_pct();
	
	// Check si on fait bouger une image produit
	check_product_blocks();
	
	// Check si on lance l'incrémentation des pourcentages
	check_why_pct();
	
	// Scroll de la page
	selector_scroll.on('scroll', function() {
		// Check si on fait bouger une image produit
		check_product_blocks();
		
		// Check si on lance l'incrémentation des pourcentages
		check_why_pct();
	});
});