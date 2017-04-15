$(document).ready(function () {
    $('.main-nav-button.urgent').click(function () {
        if ($('#main-menu').css('position') == 'absolute') {
            $('#main-menu').hide();
        }
        if ($(this).find('.modal-urgent').length > 0) {
            $(this).find('.modal-urgent').show();
        }
        else {
            $(this).parent().find('.modal-urgent').show();
        }
    });
    $(document).mouseup(function (e) {
        var container = $(".modal-urgent");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });

    $('.tab-button').click(function () {
        $('.tab-button').removeClass('active');
        $(this).addClass('active');
        if ($(this).text().indexOf('Connections') > -1) {
            $('#connections').show();
            $('#profile-links').hide();
        }
        else {
            $('#connections').hide();
            $('#profile-links').show();
        }
    });

    if ($('#connections-graph').length > 0) {
        $('#connections-graph').circliful();
        $('#profile-links-graph').circliful();
    }

    $('a.hamburger').click(function () {
        $('#main-menu').toggle();
        $('.modal-urgent').hide();
    });

	$('.account-menu .avatar, .account-menu .account-name').click(function(){
		$('.account-menu-dropdown').toggle();
	});

    $('a.step-link').click(function () {
        if (!$(this).parent().next('.step-content').is(':visible')) {
            $(this).parent().next('.step-content').slideDown(400);
        }
        else {
            $(this).parent().next('.step-content').slideUp(400);
        }
    });

    $('.upload-btn').click(function () {
        $(this).closest('form').find('input[name=photo_id]').attr('value', $(this).attr('data-photo-id'));
        $(this).closest('form').find('input[type=file]').click();        
    });

    $('.delete-btn').click(function () {        
        $(this).closest('form').find('input[name=photo_id]').attr('value', $(this).attr('data-photo-id'));        
        $(this).closest('form').submit();
    });

    $('.search-results .item').click(function () {
        $(this).toggleClass('highlight');
    });

    $('a.checkbox').click(function (e) {
        e.preventDefault()
        if ($(this).hasClass('already-purchased-check')) {
            return false;
        }
        $(this).toggleClass('checked')
        $('[name=' + $(this).attr('id') + ']').val(($(this).hasClass('checked') ? '1' : ''))
    })

    $('.consent-overlay-text').on('scroll', function () {        
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            $(this).parent().find('.button').removeClass('disabled');
        }
    });

    

    $('.consent').click(function (e) {
        e.preventDefault();
        var consent_id = $(e.target).attr('data-consent-id');
        $('.consent-overlay[data-consent-id=' + consent_id + ']').show();
        $('.body-overlay').show();
        setTimeout(function () {
            $('.consent-overlay[data-consent-id=' + consent_id + '] .consent-overlay-text').trigger('scroll');
        }, 500);
    })

    $('.consent-overlay .button').click(function (e) {
        e.preventDefault()
        if ($(this).hasClass('disabled')) {
            return false;
        }
        $('.consent-overlay').hide();
        $('.body-overlay').hide();
    })

    $('#location-form').submit(function (e) {
        e.preventDefault()
        $('.locations').show();
        $('.results').show();
    });

    $('#location-form2').submit(function (e) {
        e.preventDefault()
        $('#location-form2 .locations').show();
        $('#location-form2 .results').show();
    });

    $('a.radio').click(function (e) {
        e.preventDefault()
        var rel = $(this).attr('rel')
        if (!rel)
            return false;

        $('a[rel=' + rel + ']').removeClass('checked')
        $(this).toggleClass('checked')
        $('[name=' + $(this).attr('rel') + ']').val(($(this).attr('data-value')))
    })

    $('.blue-title a.underline-link').click(function (e) {
        e.preventDefault();
        var rel = $(this).attr('rel')
        if (!rel)
            return false;

        $('.' + $(this).attr('rel')).show();
    })


    $('.billing-update a.close').click(function (e) {
        e.preventDefault()
        $('.billing-update').hide();
    })

    $('.mailing-update a.close').click(function (e) {
        e.preventDefault()
        $('.mailing-update').hide();
    })

    $('.billing-update a.cancel-link').click(function (e) {
        e.preventDefault()
        $('.billing-update').hide();
    })

    $('.mailing-update a.cancel-link').click(function (e) {
        e.preventDefault()
        $('.mailing-update').hide();
    })

    $('label.checkbox').click(function (e) {
        //e.preventDefault()
        var id = $(this).attr('for')
        $('#' + id).trigger('click')
    })

    /*$('select').each(function(i,e){
        $(e).ddslick({width:'100%', background:'#f7f6f6'})
    })*/

    $('a.submit').click(function (e) {
        e.preventDefault()
        $(this).parents('form').submit()
    })


    $('ul.sliders a.slider').click(function (e) {
        e.preventDefault()
        if ($(this).hasClass('checked'))
            $(this).parents('li').addClass('checked')
        else
            $(this).parents('li').removeClass('checked')
    });

    $('form input[type=file]').change(function (e) {        
        $(e.target).closest('form').submit();
    });
})
