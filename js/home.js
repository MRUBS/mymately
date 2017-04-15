function scrollTo(selector) {
    if (typeof duration === 'undefined')
        duration = 400;

    var top = (jQuery(document).scrollTop() + jQuery(selector)[0].getBoundingClientRect().top) + "px";

    jQuery('html').animate({ scrollTop: top }, duration)
}

$(document).ready(function () {

    $(".locations2 .search").click(function () {
        $(".locations .fifty").show();
    });

    $('.locations2 .search-header input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(".locations .fifty").show();
        }
    });

    $(".top .menu.desktop li a").click(function () {
        $('html, body').animate({
            scrollTop: $("." + $(this).attr('href').replace('#', '')).offset().top - 75
        }, 1000);
    });

    $(".site-header .bar a").click(function () {
        $('html, body').animate({
            scrollTop: $("." + $(this).attr('href').replace('#', '')).offset().top - 75
        }, 1000);
    });

    $(".site-header .wrapper .main a").click(function () {
        $('html, body').animate({
            scrollTop: $("." + $(this).attr('href').replace('#', '')).offset().top - 75
        }, 1000);
    });

    $(".top .mobile-menu-wrapper .menu li a").click(function () {
        $('html, body').animate({
            scrollTop: $("." + $(this).attr('href').replace('#', '')).offset().top - 95
        }, 1000);
        $('.mobile-menu-wrapper').toggleClass('open');
    });    

    $('.share > a').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).parent().toggleClass('open')
    });

    $('.share .linkshare').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).select();
    });

    $('body').click(function (e) {        
        if($('.share > a').parent().hasClass('open'))
        {
            $('.share > a').parent().removeClass('open')
        }
    });

    $('a.hamburger').click(function () {
        $('.mobile-menu-wrapper').toggleClass('open')
        $('.myaccount-wrapper').removeClass('open')
    });

    $('a.myaccount').click(function () {
        $('.myaccount-wrapper').toggleClass('open')
        $(this).toggleClass('active');
        $('.mobile-menu-wrapper').removeClass('open')
    });

    $('footer nav > h3').click(function () {
        $(this).parent().toggleClass('open')
    })

    if ($(this).scrollTop() > 0) {
        $('header.site-header').addClass('sticky')
    } else {
        $('header.site-header').removeClass('sticky')
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('header.site-header').addClass('sticky')
        } else {
            $('header.site-header').removeClass('sticky')
        }
    });

    setTimeout(function () { if (checkTilesDefined()) rotateTiles(0); }, 2000);

    if (location.href.lastIndexOf('#') > 0)
    {
        $('.top .menu.desktop li a[href="' + location.href.substring(location.href.lastIndexOf('#')) + '"]').trigger('click');
    }
	
	var s = getParameterByName('s');
    if (s == 'how_we_test' || s == 'your_results')
    {
        toggleVideos(s);
    }
	
});

function getParameterByName(name, url)
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function toggleVideos(vid)
{

    $('#the_joining_process').hide();
    $('#how_we_test').hide();
    $('#your_results').hide();

    $('#the_joining_process_a').removeClass('howitworks-a');
    $('#how_we_test_a').removeClass('howitworks-a');
    $('#your_results_a').removeClass('howitworks-a');

    $('#the_joining_process_a span').removeClass('howitworks-span');
    $('#how_we_test_a span').removeClass('howitworks-span');
    $('#your_results_a span').removeClass('howitworks-span');

    $('#the_joining_process_a img').removeClass('howitworks-img');
    $('#how_we_test_a img').removeClass('howitworks-img');
    $('#your_results_a img').removeClass('howitworks-img');

    $('#' + vid + '_a').addClass('howitworks-a');
    $('#' + vid + '_a span').addClass('howitworks-span');
    $('#' + vid + '_a img').addClass('howitworks-img');

    $('#'+ vid).show();

}

var hometiles = [
                    [
                        ['background', '', 'background-color', '#606060', '<label>72<span>%</span></label> of gay men ages 18-39 use dating sites and apps.'],
                        ['background', 'url(images/stats/stat5.jpg)', 'background-color', '', 'The <strong>HIV</strong> infection rate among gay men is <strong>45 times higher</strong> than for straight men.']
                    ],
                    [
                        ['background', '', 'background-color', '#3c70b7', 'The <strong>Syphilis</strong> infection rate among gay men is <strong>73 times higher</strong> than for straight men.'],
                        ['background', '', 'background-color', '#3c70b7', '<p>&nbsp;</p><strong>1.2 million</strong> people died of AIDS-related illnesses in 2014.']
                    ],
                    [
                        ['background', '', 'background-color', '#3c70b7', '<div class="top">Approximately <strong>75%</strong> of all new <strong>Syphilis</strong> infections are amongst gay men</div><div class="bottom"><strong>Only 50%</strong> of people are tested for <strong>HIV</strong> in their lifetime.</div>'],
                        ['background', '', 'background-color', '#3c70b7', '<div class="top"><p>&nbsp;</p>The <strong>lifetime cost</strong> of treating HIV is <strong>$379,000.</strong></div><div class="bottom">Approximately <strong>78%</strong> of new <strong>HIV</strong> infections are amongst gay men.</div>']
                    ],
                    [
                        ['background', 'url(images/stats/stat3.jpg)', 'background-color', '', '<strong>1.4 million</strong> cases of <strong>Chlamydia</strong> in 2014 represented the highest number of cases of any condition ever reported to the CDC.'],
                        ['background', 'url(images/stats/stat2.jpg)', 'background-color', '', 'One of the most popular dating apps reports an average of <strong>26 million matches</strong> per day.']
                    ],
                    [
                        ['background', 'url(images/stats/stat4.jpg)', 'background-color', '', '<span style="padding-top:0px"><strong>19 million</strong> cases of new STDs occur each year in the US.</span>'],
                        ['background', 'url(images/stats/stat1.jpg)', 'background-color', '', '<div style="color:#333; padding-top:35%; font-weight:500"><strong>78 million</strong> people have been infected with HIV.<br/><strong>39 million</strong> of them have died.</div>']
                    ],
                    [
                        ['background', '', 'background-color', '#e72a4a', '<label>12.8<span>%</span></label> of those with <strong>HIV</strong> in the US are unaware that they are infected.'],
                        ['background', '', 'background-color', '#e72a4a', '<label>50<span>%</span></label> or more of new Gonorrhea and Chlamydia infections occur amongst 20-29 year olds.']
                    ]
                ];

var hometile_sub = [0, 0, 0, 0, 0, 0];

function rotateTiles(index)
{
    // don't rotate if mobile
    var mql = window.matchMedia("screen and (max-width:480px)");
    if (mql.matches)
    {
        setTimeout(function () { rotateTiles(index) }, 3000);
        return;
    }

    while (hometiles[index].length < 2)
    {
        index = (++index) % hometiles.length;
    }
    hometile_sub[index] = (++hometile_sub[index]) % hometiles[index].length;
    var subindex = hometile_sub[index];
    
    $('#hometile' + index).transition({perspective: '0px', rotateY: '90deg'}, function() {
        $('#hometile' + index).css(hometiles[index][subindex][0], hometiles[index][subindex][1]);
        $('#hometile' + index).css(hometiles[index][subindex][2], hometiles[index][subindex][3]);
        $('#hometile' + index).html(hometiles[index][subindex][4]);
        $('#hometile' + index).transition({perspective: '0px', rotateY: '0deg'});       
        setTimeout(function () { rotateTiles((++index) % hometiles.length); }, 3000);
    });
}

function checkTilesDefined()
{
    for (var i = 0; i < hometiles.length; i++)
    {
        if (hometiles[i].length > 1) return true;
    }
    return false;
}

