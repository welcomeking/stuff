"use strict";

// ==== Initial Google Map ====


    // Advanced search
    $(".job-advancedsearch a").on('click', function(e){
        e.preventDefault();
        $(".job-searchform").toggleClass('open');
    });

    $(".job-searchform .btn-close").on('click', function(e){
        e.preventDefault();
        $(".job-searchform").toggleClass('open');
    });

    // google map
    var address = jQuery('.contact-address').html();
    var width = '100%';
    var height = '500px';
    var zoom = 16;
   
   
	
	// ===== Price filter ======
	$("#price-filter").slider({
		from: 0,
		to: 100,
		step: 1,
		smooth: true,
		round: 0,
		dimension: "&nbsp;$",
		skin: "plastic"
	});
	
	// ====== Support ========
	$('.support-list .support-item').on('click', function (e) {
        $('html, body').animate({
			scrollTop: $(".support-list .support-content").offset().top
		}, 1000);

        $('.support-list .support-item').each(function( index ) {
            $(this).closest('li').removeClass('active');
        });    
    });
	
	// ======= Load more page recruitment =======
	$(".job-search-all .job-item").slice(0, 5).show();
    $(".job-load a").on('click', function (e) {
        e.preventDefault();
        $(".job-search-all .job-item:hidden").slice(0, 3).slideDown();
        if ($(".job-search-all .job-item:hidden").length == 0) {
            $(".job-load a").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });

    // ======= Load more page freelancer =======
    $(".job-freelancer .job-freelanceritem").slice(0, 4).show();
    $(".job-loadprofile a").on('click', function (e) {
        e.preventDefault();
        $(".job-freelancer .job-freelanceritem:hidden").slice(0, 2).slideDown();
        if ($(".job-freelancer .job-freelanceritem:hidden").length == 0) {
            $(".job-loadprofile a").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
	
}); //end