var window_width = 0;
var window_height = 0;
var small_tolerance_pixel = 0;
var middle_tolerance_pixel = 0;
var big_tolerance_pixel = 0;

var md5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

var translate = function(text) {
	var key = md5($.trim(text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')));
	
	if (all_translated_words[key] != undefined) {
		return all_translated_words[key];
	}
	
	return text;
};

var isPCandSafari = function() {
	var is_OSX = (navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false);
	var is_iOS = (navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false);
	var is_Mac = (navigator.platform.toUpperCase().indexOf('MAC') >= 0);
	var is_iPhone = (navigator.platform == "iPhone");
	var is_iPod = (navigator.platform == "iPod");
	var is_iPad = (navigator.platform == "iPad");
	var is_PC = (!is_OSX && !is_iOS && !is_Mac && !is_iPhone && !is_iPod && !is_iPad);
	
	var ua = navigator.userAgent.toLowerCase();
	
	if (is_PC && ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1) {
		$('#pcsafari').removeClass('d-none');
	}
};

/* ################################################################################################## */
/* DÉPLIE ET REPLIE LE DETAIL D'UNE PRISE EN CHARGE ################################################# */
/* ################################################################################################## */
var toogleDetail = function() {
	$('.see-details').each(function () {
		$(this).on('click', function() {
			if($(this).find('.up').hasClass('d-none')) {
				//$(this).parent().parent().parent().find('.display-warranty-detail').removeClass('d-none');
				$('.' + $(this).attr('id') + '-detail').removeClass('d-none');
				$(this).find('.up').removeClass('d-none');
				$(this).find('.down').addClass('d-none');
			} else {
				//$(this).parent().parent().parent().find('.display-warranty-detail').addClass('d-none');
				$('.' + $(this).attr('id') + '-detail').addClass('d-none');
				$(this).find('.down').removeClass('d-none');
				$(this).find('.up').addClass('d-none');
			}
		});    
	});
};

/* ################################################################################################## */
/* ENREGISTREMENT => CHANGEMENT DYNAMIQUE DE L'IMAGE FG FC FP (marque produit) ###################### */
/* ################################################################################################## */
var manageProductBrandImage = function() {
	$('.product-brand .img-fluid').each(function () {
		$(this).on('click', function() {
			manageBrandImageAppearance($(this));
			$('#gencode').val('');
			$('#product-id').val('');
			$('#product-description').html('');
		});  
	});
};

var manageBrandImageAppearance = function(elt) {
	var category_id = /img-dynamic-([0-9]+)/.exec(elt.attr('id'))[1];
	
	$('#categories_id').val(category_id);
	$('.product-brand img').removeClass('active');
	elt.addClass('active');
};

/* ################################################################################################## */
/* AUTO-REMPLISSAGE DU CHAMPS GENCODE ############################################################### */
/* ################################################################################################## */
var checkGencodeValidity = function() {
	if ($('#gencode').length) {
		$('#gencode').on('input', function() {
			if($('#gencode').val().length == 13) {
				$.ajax({
					url: $(this).data('url'),
					method: 'POST',
					data: { gencode: $(this).val() },
					success: function(data) {
						if (data.success) {
							$('#product-id').val(data.products_id);
							$('#product-description').html(data.products_description+' - <b>'+data.mobile_phone+"</b>");
							manageBrandImageAppearance($('#' + data.brand_img_dynamic));
						} else {
							$('#product-description').html(data.message);
						}
					}
				});
			} else {
				$('#product-id').val('');
				$('#product-description').html('');
			}
		});
	}
};

/* ################################################################################################## */
/* AFFICHAGE DES DOCUMENTS TELECHARGES DANS LA DECLARATION DE PRODUITS ############################## */
/* ################################################################################################## */
var displayUploadedDocument = function(input) {
	if (input.files && input.files[0]) {		
        for (i = 0; i < input.files.length; i++) {
            var reader = new FileReader();
			var current_file = input.files[i];
			//console.log(input);
			//console.log(input.files);
			$(input).attr('data-document', current_file.name);
            reader.onload = function(e) {
                //console.log(e.target.result);
                var content = '<div data-document="' + current_file.name + '" class="file-item file-item-document">' +
				'					<div class="file-document">\n' +
                '              			<img src="includes/img/warranty/facture-with-product.png" class="img-fluid border" alt="Facture">\n' +
                '          	   			<div class="file-description text-center">' + current_file.name + '</div>\n' +
                '          	   			<img src="includes/img/warranty/delete.png" onclick="deleteUplodedFile(\'' + current_file.name + '\');" class="img-delete" alt="Delete">\n' +
                '          			</div>' +
				'				</div>';

				$('#upload').append(content);
				$("input[name='file_upload[]']").addClass('d-none');
				$('#upload_inputs').append('<input name="file_upload[]" type="file" class="custom-file-input file-input" onchange="displayUploadedDocument(this);" multiple>');
            }
			
            reader.readAsDataURL(input.files[i]);
			
			// On efface le message d'erreur
			$('#product_register_form_alert').addClass('d-none');
        }
    }
};

var deleteUplodedFile = function(file_name){
	$('[data-document="' + file_name + '"]').each(function () {
		$(this).remove();
	});
};

/* ################################################################################################## */
/* AFFICHAGE DU NOM DU FICHIER DANS LES TICKETS ##################################################### */
/* ################################################################################################## */
var getFilename = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#ticket_filename').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    }
};



var deleteFile = function(){
	var $el = $('#ticket_file_upload');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
	$('#ticket_filename').html('Choisissez un fichier');
};

/* ################################################################################################## */
/* INSCRIPTION ENTREPRISE => AFFICHAGE ADRESSE DE LIVRAISON ######################################### */
/* ################################################################################################## */
var managementModeDisplay = function() {
	$('#management_collab_mode').on('click', function() {
        $('#section_delivery_address').addClass('d-none');
		$('#div_optin_notif_declaration').removeClass('d-none');
		
		$('#section_delivery_address input').each(function () {
			$(this).prop('required', false);	
		});
		
		$('#section_delivery_address select').each(function () {
			$(this).prop('required', false);
		});
    });

    $('#management_god_mode').on('click', function() {
		$('#section_delivery_address').removeClass('d-none');
		$('#div_optin_notif_declaration').addClass('d-none');
		
		$('#section_delivery_address input').each(function () {
			if ($(this).prop('id') != 'suburb' && $(this).prop('id') != 'province') {
				$(this).prop('required', true);
			}				
		});
		
		$('#section_delivery_address select').each(function () {
			$(this).prop('required', true);
		});
    });
};

/* ################################################################################################## */
/* AUTO-REMPLISSAGE DU CHAMPS SIRET ############################################################### */
/* ################################################################################################## */
var checkCompanySiretExist = function() {
	if ($('#siret') !== null) {
		$('#siret').change(function() {
			if($('#siret').val().length == 14) {
				$.ajax({
					url: $(this).data('url'),
					method: 'POST',
					data: { siret: $(this).val() },
					success: function(data) {
						if (data.success) {
							$('#company_name').val(data.company_name);
							
							if($("input[name='management_mode']:checked").val() == data.collab_mode) {
								$('#management_collab_mode').click();
								if (!$('#section_delivery_address').hasClass('d-none')) {
									$('#section_delivery_address').addClass('d-none');									
								}
								$('#section_delivery_address input').each(function () {
									$(this).prop('required',false);
								});
							} else {
								$('#management_god_mode').click();
								if ($('#section_delivery_address').hasClass('d-none')) {
									$('#section_delivery_address').removeClass('d-none');									
								}
								$('#section_delivery_address input').each(function () {
									if ($(this).prop('id') != 'suburb' && $(this).prop('id') != 'province') {
										$(this).prop('required',true);
									}				
								});
							} 
						}						
					}
				});
			} else {
				$('#management_god_mode').prop("checked", false);
				$('#management_collab_mode').prop("checked", false);
			}
		});
	}
};

/* ################################################################################################## */
/* AJOUT PRODUIT - AFFICHAGE DE LA LISTE DES REVENDEURS ######################################### */
/* ################################################################################################## */
var refreshVendorSelect = function(country_elt) {
	var country_id = $(country_elt).val();
	var all_vendors = JSON.parse($('#all_vendors').html());
	var option_first = $('#vendors_id option').first().html();
	
	if (country_id != '') {
		$('#vendors_id').empty();
		$('#vendors_id').append('<option value="">' + option_first + '</option>');
		$('#block_vendors').removeClass('d-none');
		
		for (var i in all_vendors[country_id]) {
			$('#vendors_id').append('<option value="' + parseInt(i) + '">' + all_vendors[country_id][i] + '</option>');
		}
	}
	else {
		$('#block_vendors').addClass('d-none');
	}
};

/* ################################################################################################## */
/* DECLARATION INCIDENT - AFFICHAGE RAISON (1) ######################################### */
/* ################################################################################################## */
var refreshReason1Select = function(product_elt) {
	$.ajax({
		url: $(product_elt).data('url'),
		method: 'POST',
		data: { products_to_customers_id: $(product_elt).val() },
		success: function(data) {
			if (data.success) {				
				$('#'+$(product_elt).data('reload')).empty();
				$('#'+$(product_elt).data('reload')).append('<option value="">' + data.message + '</option>');
				$.each(data.reasons, function (i, reason) {					
					$('#'+$(product_elt).data('reload')).append('<option value="'+reason['id']+'">'+reason['name']+'</option>');			
				});
			}						
		}
	});
};

var sendAccountCreationLink = function(btn_send_mail) {
	$.ajax({
		url: $(btn_send_mail).data('url'),
		method: 'POST',
		success: function(data) {
			if (data.success) {
				alert(data.message);
			}
		}
	});
    // openModal(btn_send_mail);
};

var generateCsv = function(a_elt) {
	$.ajax({
		url: $(a_elt).data('url'),
		method: 'POST',
		success: function(data) {
			if (data.success) {
				window.location = data.file;
			}						
		}
	});
};

var openProductModal = function(btn_gencode) {
	$.ajax({
		url: $(btn_gencode).data('url'),
		method: 'POST',
		data: { categories_id: $('#categories_id').val() },
		success: function(data) {
			if (data.success) {	
				$('#'+$(btn_gencode).data('reload')).empty();
				$.each(data.products, function (i, product) {			
					$('#'+$(btn_gencode).data('reload')).append('<tr mobile_phone="' + product['mobile_phone'] + '"><td><div  class"pointer" onclick="loadGencode(' + product['gencode'] + ', \'' + product['description'] + ' - <b>' + product['mobile_phone'] + '</b>\');">'+product['gencode']+'</div></td><td>'+product['description']+'</td></tr>');			
				});
				
				if ($('#categories_id').val() != '3') {
					var filters = '';
					
					$.each(data.filters, function (i, filter) {			
						filters += '<option>' + filter + '</option>';
					});
					
					$('#filter_mobile').html('<option value="">' + translate('Mon mobile') + '</option>' + filters);
					
					$('#label_filter_mobile').show();
					$('#container_filter_mobile').show();
				}
				else {
					$('#label_filter_mobile').hide();
					$('#container_filter_mobile').hide();
				}
			}						
		}
	});
	openModal(btn_gencode);
	//$("#modal-product-gencode").hide().show();
};

var openModal = function(btn) {
	$('#'+$(btn).data('modal')).modal('show');
};

var loadGencode = function(gencode, product_description) {
	$('#gencode').val(gencode);
	$('#product-description').html(product_description);
	$('#modal-product-gencode').modal('toggle');
};

var product_register_toggle_form = function() {
	if ($('#product_register_form').length && ($('#product_register_form_step_1 img.active').length || $.trim($('#gencode').val()) != '')) {
		$('#product_register_form_step_2, #product_register_form_step_3').removeClass('d-none');
	}
};

var set_wireless_lost = function() {
	if ($('#reasons_id').length) {
		if ($('#reasons_id').val() == $('#reason_id_wireless_lost_earphone').val()) {
			$('#block_files').addClass('d-none');
			$('#block_choose_wireless_side').removeClass('d-none');
			
			$('#block_choose_wireless_side input[name="caracteristics_id"]').attr('required', true);
		}
		else {
			$('#block_files').removeClass('d-none');
			$('#block_choose_wireless_side').addClass('d-none');
			
			$('#block_choose_wireless_side input[name="caracteristics_id"]').attr('required', false);
		}
	}
};

$(function() {
	$('[data-toggle="tooltip"]').tooltip();
	
	isPCandSafari();
	toogleDetail();
	manageProductBrandImage();
	checkGencodeValidity();
	managementModeDisplay();
	checkCompanySiretExist();
	set_wireless_lost();
	
	window_width = $(window).width();
	window_height = $(window).height();
	small_tolerance_pixel = window_height / 7;
	middle_tolerance_pixel = window_height / 4;
	big_tolerance_pixel = window_height / 2;
		
	$('input, select').on('change invalid', function() {
        var textfield = $(this).get(0);
		textfield.setCustomValidity("");
		var cVal = "";
		if (!textfield.validity.valid) {
			if (textfield.validity.valueMissing) {
				//textfield.setCustomValidity($(this).data('required-message'));
				cVal = $(this).data('required-message');
			} else if (textfield.validity.rangeUnderflow) {
				//textfield.setCustomValidity($(this).data('under-min-message') + ' ' + $(this).attr('min') + '.');
				cVal = $(this).data('under-min-message') + ' ' + $(this).attr('min') + '.';
			}
		}
		textfield.setCustomValidity(cVal);
    });
	
	if (typeof $('.datepicker').datepicker != 'undefined') {
		$('.datepicker').datepicker({
			dateFormat: 'dd/mm/yy',
			maxDate: '0'
		});
	}
	
	$('#email_address').bind('paste', function (e) {
		e.preventDefault();
	});
	
	$('#email_address_confirm').bind('paste', function (e) {
		e.preventDefault();
	});
	
	$('#password').bind('paste', function (e) {
		e.preventDefault();
	});
	
	$('#password_confirm').bind('paste', function (e) {
		e.preventDefault();
	});
	
	$('#filter_mobile').on('change', function() {
		$('#products_brand tr').show();
		
		if ($(this).val() != '') {
			$('#products_brand tr:not([mobile_phone="' + $(this).val() + '"])').hide();
		}
	});
	
	if ($('#product_register_form').length) {
		product_register_toggle_form();
		
		$('.product-brand img').on('click', function() {
			product_register_toggle_form();
		});
	}
	
	if ($('#reasons_id').length) {
		$('#reasons_id').on('change', function() {
			set_wireless_lost();
		});
	}
});


/**
 *   Unslider
 *   version 2.0
 *   by @idiot and friends
 */

(function(factory) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
	    // AMD. Register as an anonymous module.
        define([], factory(window.jQuery));
    } else {
		factory(window.jQuery);
	}
}(function($) {
	//  Don't throw any errors when jQuery
	if(!$) {
		return console.warn('Unslider needs jQuery');
	}

	$.Unslider = function(context, options) {
		var self = this;

		//  Create an Unslider reference we can use everywhere
		self._ = 'unslider';

		//  Store our default options in here
		//  Everything will be overwritten by the jQuery plugin though
		self.defaults = {
			//  Should the slider move on its own or only when
			//  you interact with the nav/arrows?
			//  Only accepts boolean true/false.
			autoplay: false,

			//  3 second delay between slides moving, pass
			//  as a number in milliseconds.
			delay: 3000,

			//  Animation speed in millseconds
			speed: 750,

			//  An easing string to use. If you're using Velocity, use a
			//  Velocity string otherwise you can use jQuery/jQ UI options.
			easing: 'swing', // [.42, 0, .58, 1],

			//  Does it support keyboard arrows?
			//  Can pass either true or false -
			//  or an object with the keycodes, like so:
			//  {
			//	 prev: 37,
			//	 next: 39
			// }
			//  You can call any internal method name
			//  before the keycode and it'll be called.
			keys: {
				prev: 37,
				next: 39
			},

			//  Do you want to generate clickable navigation
			//  to skip to each slide? Accepts boolean true/false or
			//  a callback function per item to generate.
			nav: true,

			//  Should there be left/right arrows to go back/forth?
			//   -> This isn't keyboard support.
			//  Either set true/false, or an object with the HTML
			//  elements for each arrow like below:
			arrows: {
				prev: '<a class="' + self._ + '-arrow prev">Prev</a>',
				next: '<a class="' + self._ + '-arrow next">Next</a>'
			},

			//  How should Unslider animate?
			//  It can do one of the following types:
			//  "fade": each slide fades in to each other
			//  "horizontal": each slide moves from left to right
			//  "vertical": each slide moves from top to bottom
			animation: 'horizontal',

			//  If you don't want to use a list to display your slides,
			//  you can change it here. Not recommended and you'll need
			//  to adjust the CSS accordingly.
			selectors: {
				container: 'ul:first',
				slides: 'li'
			},

			//  Do you want to animate the heights of each slide as
			//  it moves
			animateHeight: false,

			//  Active class for the nav
			activeClass: self._ + '-active',

			//  Have swipe support?
			//  You can set this here with a boolean and always use
			//  initSwipe/destroySwipe later on.
			swipe: true,
			// Swipe threshold -
			// lower float for enabling short swipe
			swipeThreshold: 0.2
		};

		//  Set defaults
		self.$context = context;
		self.options = {};

		//  Leave our elements blank for now
		//  Since they get changed by the options, we'll need to
		//  set them in the init method.
		self.$parent = null;
		self.$container = null;
		self.$slides = null;
		self.$nav = null;
		self.$arrows = [];

		//  Set our indexes and totals
		self.total = 0;
		self.current = 0;

		//  Generate a specific random ID so we don't dupe events
		self.prefix = self._ + '-';
		self.eventSuffix = '.' + self.prefix + ~~(Math.random() * 2e3);

		//  In case we're going to use the autoplay
		self.interval = null;

		//  Get everything set up innit
		self.init = function(options) {
			//  Set up our options inside here so we can re-init at
			//  any time
			self.options = $.extend({}, self.defaults, options);

			//  Our elements
			self.$container = self.$context.find(self.options.selectors.container).addClass(self.prefix + 'wrap');
			self.$slides = self.$container.children(self.options.selectors.slides);

			//  We'll manually init the container
			self.setup();

			//  We want to keep this script as small as possible
			//  so we'll optimise some checks
			$.each(['nav', 'arrows', 'keys', 'infinite'], function(index, module) {
				self.options[module] && self['init' + $._ucfirst(module)]();
			});

			//  Add swipe support
			if(jQuery.event.special.swipe && self.options.swipe) {
				self.initSwipe();
			}

			//  If autoplay is set to true, call self.start()
			//  to start calling our timeouts
			self.options.autoplay && self.start();

			//  We should be able to recalculate slides at will
			self.calculateSlides();

			//  Listen to a ready event
			self.$context.trigger(self._ + '.ready');

			//  Everyday I'm chainin'
			return self.animate(self.options.index || self.current, 'init');
		};

		self.setup = function() {
			//  Add a CSS hook to the main element
			self.$context.addClass(self.prefix + self.options.animation).wrap('<div class="' + self._ + '" />');
			self.$parent = self.$context.parent('.' + self._);

			//  We need to manually check if the container is absolutely
			//  or relatively positioned
			var position = self.$context.css('position');

			//  If we don't already have a position set, we'll
			//  automatically set it ourselves
			if(position === 'static') {
				self.$context.css('position', 'relative');
			}

			self.$context.css('overflow', 'hidden');
		};

		//  Set up the slide widths to animate with
		//  so the box doesn't float over
		self.calculateSlides = function() {
			// update slides before recalculating the total
			self.$slides = self.$container.children(self.options.selectors.slides);

			self.total = self.$slides.length;

			//  Set the total width
			if(self.options.animation !== 'fade') {
				var prop = 'width';

				if(self.options.animation === 'vertical') {
					prop = 'height';
				}

				self.$container.css(prop, (self.total * 100) + '%').addClass(self.prefix + 'carousel');
				self.$slides.css(prop, (100 / self.total) + '%');
			}
		};


		//  Start our autoplay
		self.start = function() {
			self.interval = setTimeout(function() {
				//  Move on to the next slide
				self.next();

				//  If we've got autoplay set up
				//  we don't need to keep starting
				//  the slider from within our timeout
				//  as .animate() calls it for us
			}, self.options.delay);

			return self;
		};

		//  And pause our timeouts
		//  and force stop the slider if needed
		self.stop = function() {
			clearTimeout(self.interval);

			return self;
		};


		//  Set up our navigation
		self.initNav = function() {
			var $nav = $('<nav class="' + self.prefix + 'nav"><ol /></nav>');

			//  Build our click navigation item-by-item
			self.$slides.each(function(key) {
				//  If we've already set a label, let's use that
				//  instead of generating one
				var label = this.getAttribute('data-nav') || key + 1;

				//  Listen to any callback functions
				if($.isFunction(self.options.nav)) {
					label = self.options.nav.call(self.$slides.eq(key), key, label);
				}

				//  And add it to our navigation item
				$nav.children('ol').append('<li data-slide="' + key + '">' + label + '</li>');
			});

			//  Keep a copy of the nav everywhere so we can use it
			self.$nav = $nav.insertAfter(self.$context);

			//  Now our nav is built, let's add it to the slider and bind
			//  for any click events on the generated links
			self.$nav.find('li').on('click' + self.eventSuffix, function() {
				//  Cache our link and set it to be active
				var $me = $(this).addClass(self.options.activeClass);

				//  Set the right active class, remove any other ones
				$me.siblings().removeClass(self.options.activeClass);

				//  Move the slide
				self.animate($me.attr('data-slide'));
			});
		};


		//  Set up our left-right arrow navigation
		//  (Not keyboard arrows, prev/next buttons)
		self.initArrows = function() {
			if(self.options.arrows === true) {
				self.options.arrows = self.defaults.arrows;
			}

			//  Loop our options object and bind our events
			$.each(self.options.arrows, function(key, val) {
				//  Add our arrow HTML and bind it
				self.$arrows.push(
					$(val).insertAfter(self.$context).on('click' + self.eventSuffix, self[key])
				);
			});
		};


		//  Set up our keyboad navigation
		//  Allow binding to multiple keycodes
		self.initKeys = function() {
			if(self.options.keys === true) {
				self.options.keys = self.defaults.keys;
			}

			$(document).on('keyup' + self.eventSuffix, function(e) {
				$.each(self.options.keys, function(key, val) {
					if(e.which === val) {
						$.isFunction(self[key]) && self[key].call(self);
					}
				});
			});
		};

		//  Requires jQuery.event.swipe
		//  -> stephband.info/jquery.event.swipe
		self.initSwipe = function() {
			var width = self.$slides.width();

			//  We don't want to have a tactile swipe in the slider
			//  in the fade animation, as it can cause some problems
			//  with layout, so we'll just disable it.
			if(self.options.animation !== 'fade') {

				self.$container.on({

					movestart: function(e) {
						//  If the movestart heads off in a upwards or downwards
						//  direction, prevent it so that the browser scrolls normally.
						if((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
							return !!e.preventDefault();
						}

						self.$container.css('position', 'relative');
					},

					move: function(e) {
						self.$container.css('left', -(100 * self.current) + (100 * e.distX / width) + '%');
					},

					moveend: function(e) {
						// Check if swiped distance is greater than threshold.
						// If yes slide to next/prev slide. If not animate to
						// starting point.

						if((Math.abs(e.distX) / width) > self.options.swipeThreshold) {

							self[e.distX < 0 ? 'next' : 'prev']();
						}
						else {

							self.$container.animate({left: -(100 * self.current) + '%' }, self.options.speed / 2 );
						}
					}
				});
			}
		};

		//  Infinite scrolling is a massive pain in the arse
		//  so we need to create a whole bloody function to set
		//  it up. Argh.
		self.initInfinite = function() {
			var pos = ['first', 'last'];

			$.each(pos, function(index, item) {
				self.$slides.push.apply(
					self.$slides,

					//  Exclude all cloned slides and call .first() or .last()
					//  depending on what `item` is.
					self.$slides.filter(':not(".' + self._ + '-clone")')[item]()

					//  Make a copy of it and identify it as a clone
					.clone().addClass(self._ + '-clone')

					//  Either insert before or after depending on whether we're
					//  the first or last clone
					['insert' + (index === 0 ? 'After' : 'Before')](
						//  Return the other element in the position array
						//  if item = first, return "last"
						self.$slides[pos[~~!index]]()
					)
				);
			});
		};

		//  Remove any trace of arrows
		//  Loop our array of arrows and use jQuery to remove
		//  It'll unbind any event handlers for us
		self.destroyArrows = function() {
			$.each(self.$arrows, function(i, $arrow) {
				$arrow.remove();
			});
		};

		//  Remove any swipe events and reset the position
		self.destroySwipe = function() {
			//  We bind to 4 events, so we'll unbind those
			self.$container.off('movestart move moveend');
		};

		//  Unset the keyboard navigation
		//  Remove the handler
		self.destroyKeys = function() {
			//  Remove the event handler
			$(document).off('keyup' + self.eventSuffix);
		};

		self.setIndex = function(to) {
			if(to < 0) {
				to = self.total - 1;
			}

			self.current = Math.min(Math.max(0, to), self.total - 1);

			if(self.options.nav) {
				self.$nav.find('[data-slide="' + self.current + '"]')._active(self.options.activeClass);
			}

			self.$slides.eq(self.current)._active(self.options.activeClass);

			return self;
		};

		//  Despite the name, this doesn't do any animation - since there's
		//  now three different types of animation, we let this method delegate
		//  to the right type, keeping the name for backwards compat.
		self.animate = function(to, dir) {
			//  Animation shortcuts
			//  Instead of passing a number index, we can now
			//  use .data('unslider').animate('last');
			//  or .unslider('animate:last')
			//  to go to the very last slide
			if(to === 'first') to = 0;
			if(to === 'last') to = self.total;

			//  Don't animate if it's not a valid index
			if(isNaN(to)) {
				return self;
			}

			if(self.options.autoplay) {
				self.stop().start();
			}

			self.setIndex(to);

			//  Add a callback method to do stuff with
			self.$context.trigger(self._ + '.change', [to, self.$slides.eq(to)]);

			//  Delegate the right method - everything's named consistently
			//  so we can assume it'll be called "animate" +
			var fn = 'animate' + $._ucfirst(self.options.animation);

			//  Make sure it's a valid animation method, otherwise we'll get
			//  a load of bug reports that'll be really hard to report
			if($.isFunction(self[fn])) {
				self[fn](self.current, dir);
			}

			return self;
		};


		//  Shortcuts for animating if we don't know what the current
		//  index is (i.e back/forward)
		//  For moving forward we need to make sure we don't overshoot.
		self.next = function() {
			var target = self.current + 1;

			//  If we're at the end, we need to move back to the start
			if(target >= self.total) {
				target = 0;
			}

			return self.animate(target, 'next');
		};

		//  Previous is a bit simpler, we can just decrease the index
		//  by one and check if it's over 0.
		self.prev = function() {
			return self.animate(self.current - 1, 'prev');
		};


		//  Our default animation method, the old-school left-to-right
		//  horizontal animation
		self.animateHorizontal = function(to) {
			var prop = 'left';

			//  Add RTL support, slide the slider
			//  the other way if the site is right-to-left
			if(self.$context.attr('dir') === 'rtl') {
				prop = 'right';
			}

			if(self.options.infinite) {
				//  So then we need to hide the first slide
				self.$container.css('margin-' + prop, '-100%');
			}

			return self.slide(prop, to);
		};

		//  The same animation methods, but vertical support
		//  RTL doesn't affect the vertical direction so we
		//  can just call as is
		self.animateVertical = function(to) {
			self.options.animateHeight = true;

			//  Normal infinite CSS fix doesn't work for
			//  vertical animation so we need to manually set it
			//  with pixels. Ah well.
			if(self.options.infinite) {
				self.$container.css('margin-top', -self.$slides.outerHeight());
			}

			return self.slide('top', to);
		};

		//  Actually move the slide now
		//  We have to pass a property to animate as there's
		//  a few different directions it can now move, but it's
		//  otherwise unchanged from before.
		self.slide = function(prop, to) {
			//  If we want to change the height of the slider
			//  to match the current slide, you can set
			//  {animateHeight: true}
			self.animateHeight(to);

			//  For infinite sliding we add a dummy slide at the end and start
			//  of each slider to give the appearance of being infinite
			if(self.options.infinite) {
				var dummy;

				//  Going backwards to last slide
				if(to === self.total - 1) {
					//  We're setting a dummy position and an actual one
					//  the dummy is what the index looks like
					//  (and what we'll silently update to afterwards),
					//  and the actual is what makes it not go backwards
					dummy = self.total - 3;
					to = -1;
				}

				//  Going forwards to first slide
				if(to === self.total - 2) {
					dummy = 0;
					to = self.total - 2;
				}

				//  If it's a number we can safely set it
				if(typeof dummy === 'number') {
					self.setIndex(dummy);

					//  Listen for when the slide's finished transitioning so
					//  we can silently move it into the right place and clear
					//  this whole mess up.
					self.$context.on(self._ + '.moved', function() {
						if(self.current === dummy) {
							self.$container.css(prop, -(100 * dummy) + '%').off(self._ + '.moved');
						}
					});
				}
			}

			//  We need to create an object to store our property in
			//  since we don't know what it'll be.
			var obj = {};

			//  Manually create it here
			obj[prop] = -(100 * to) + '%';

			//  And animate using our newly-created object
			return self._move(self.$container, obj);
		};


		//  Fade between slides rather than, uh, sliding it
        self.animateFade = function(to) {
			//  If we want to change the height of the slider
			//  to match the current slide, you can set
			//  {animateHeight: true}
			self.animateHeight(to);

			var $active = self.$slides.eq(to).addClass(self.options.activeClass);

			//  Toggle our classes
			self._move($active.siblings().removeClass(self.options.activeClass), {opacity: 0});
			self._move($active, {opacity: 1}, false);
		};

		// Animate height of slider
		self.animateHeight = function(to) {
			//  If we want to change the height of the slider
			//  to match the current slide, you can set
			//  {animateHeight: true}
			if (self.options.animateHeight) {
				self._move(self.$context, {height: self.$slides.eq(to).outerHeight()}, false);
			}
		};

		self._move = function($el, obj, callback, speed) {
			if(callback !== false) {
				callback = function() {
					self.$context.trigger(self._ + '.moved');
				};
			}

			return $el._move(obj, speed || self.options.speed, self.options.easing, callback);
		};

		//  Allow daisy-chaining of methods
		return self.init(options);
	};

	//  Internal (but global) jQuery methods
	//  They're both just helpful types of shorthand for
	//  anything that might take too long to write out or
	//  something that might be used more than once.
	$.fn._active = function(className) {
		return this.addClass(className).siblings().removeClass(className);
	};

	//  The equivalent to PHP's ucfirst(). Take the first
	//  character of a string and make it uppercase.
	//  Simples.
	$._ucfirst = function(str) {
		//  Take our variable, run a regex on the first letter
		return (str + '').toLowerCase().replace(/^./, function(match) {
			//  And uppercase it. Simples.
			return match.toUpperCase();
		});
	};

	$.fn._move = function() {
		this.stop(true, true);
		return $.fn[$.fn.velocity ? 'velocity' : 'animate'].apply(this, arguments);
	};

	//  And set up our jQuery plugin
	$.fn.unslider = function(opts) {
		return this.each(function() {
			var $this = $(this);

			//  Allow usage of .unslider('function_name')
			//  as well as using .data('unslider') to access the
			//  main Unslider object
			if(typeof opts === 'string' && $this.data('unslider')) {
				opts = opts.split(':');

				var call = $this.data('unslider')[opts[0]];

				//  Do we have arguments to pass to the string-function?
				if($.isFunction(call)) {
					return call.apply($this, opts[1] ? opts[1].split(',') : null);
				}
			}

			return $this.data('unslider', new $.Unslider($this, opts));
		});
	};

}));
