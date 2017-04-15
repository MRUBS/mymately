
var markers = [];

function searchPharmacies(map_div)
{
    if (!$(map_div).find('.pharmacy-locator').is(':visible'))
    {
        $(map_div).find('.pharmacy-locator').show(100, function () {
            
            var map = new google.maps.Map($(map_div).find('.map')[0], {
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var geocoder = new google.maps.Geocoder();

            $(map_div).find('button.search').click(function () {
                geocodeAddress(geocoder, map, map_div);
            });

            google.maps.event.addListener(map, 'idle', function () {
                if (opening_infowindow)
                    opening_infowindow = false;
                else
                    addMarkers(map, $(map_div).find('div.search-results ul'));
            });

            $(map_div).find('button.search').trigger('click');
                                    
        });
    }
}

var reference_lat;
var reference_lng;

function geocodeAddress(geocoder, map, map_div)
{
    var postal_cde = $(map_div).find('input[name=location]').val();
    geocoder.geocode({ 'address': postal_cde }, function (results, status) {
        var ul = $(map_div).find('div.search-results ul');
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            reference_lat = results[0].geometry.location.lat();
            reference_lng = results[0].geometry.location.lng();
            map.setZoom(14);
            addMarkers(map, ul);
        } else {
            clearMarkers();
            $(ul).empty();
            setTimeout(function () {
                $(ul).append('<li class="item blank"><div class="address"><h3 class="title">Invalid zip code - please try again...</h3></div></li>');
            }, 10);
        }
    });
}

function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

var infowindow = null;
var opening_infowindow = false;

function addMarkers(map, ul) {    
    clearMarkers();
    var bounds = map.getBounds();

    if (bounds == null) return;

    var ne_boundary = bounds.getNorthEast();
    var sw_boundary = bounds.getSouthWest();

    var n_lat = ne_boundary.lat();
    var s_lat = sw_boundary.lat();

    var e_lng = ne_boundary.lng();
    var w_lng = sw_boundary.lng();

    $.ajax({
        type: "POST",
        url: '/getpharmacies',
        data: {
            'lat_max': n_lat,
            'lat_min': s_lat,
            'long_max': e_lng,
            'long_min': w_lng,
            'ref_lat': reference_lat,
            'ref_lng': reference_lng
        },
        success: function (jsondata) {
            var pharmacies = $.parseJSON(jsondata);

            setTimeout(function () {
                $(ul).empty();
                if (pharmacies.length == 0) {
                    setTimeout(function () {
                        $(ul).append('<li class="item blank"><div class="address"><h3 class="title">No results found - please try again...</h3></div></li>');
                    }, 10);
                }

                $.each(pharmacies, function (i, pharmacy) {
                    var myLatlng = new google.maps.LatLng(pharmacy.lattitude, pharmacy.longitude);

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: pharmacy.pharmacy_name + "\n" + pharmacy.addr_line1 + "\n" + pharmacy.city_state_zip + "\n" + pharmacy.phone,
                        icon: '/images/mapicons/red' + (i + 1) + '.png'
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        if (infowindow) infowindow.close();

                        infowindow = new google.maps.InfoWindow({
                            content: '<div style="display: inline-block; white-space:nowrap"><span style="font-weight:bold">' + pharmacy.pharmacy_name + '</span><br/>' + pharmacy.addr_line1 + '</br>' + pharmacy.city_state_zip + '</br>' + pharmacy.phone + '</div>'
                        });

                        opening_infowindow = true;
                        infowindow.open(map, marker);
                        setTimeout(function () { opening_infowindow = false; }, 1000);

                        var list = $(ul).get(0);
                        var li_id = 'searchresult' + i;
                        list.scrollTop = i == 0 ? 0 : (document.getElementById(li_id).offsetTop);
                    });

                    markers.push(marker);

                    var hours_table = '<table class="open-hours"><tr><th>Day</th><th>Store</th><th>Pharmacy</th></tr>';
                    for (var n in pharmacy.hours) {
                        hours_table += '<tr><td>' + pharmacy.hours[n].days + '</td><td>' + pharmacy.hours[n].store + '</td><td>' + pharmacy.hours[n].pharmacy + '</td></tr>';
                    }
                    hours_table += '</table>';

                    $(ul).append('<li id="searchresult' + i + '" class="item">' +
                                                    '<div class="address">' +
                                                        '<h3 class="title">' + pharmacy.pharmacy_name + '</h3>' +
                                                        pharmacy.addr_line1 + '<br/>' +
                                                        pharmacy.city_state_zip + '<br/>' +
                                                        pharmacy.phone +
                                                    '</div>' +
                                                    '<div class="info">' +
                                                        '<span class="distance">' + pharmacy.distance_str + '</span>' +
                                                        '<a href="https://maps.google.com?daddr=' + encodeURIComponent(pharmacy.addr_line1 + ' ' + pharmacy.city_state_zip) + '" target="_blank" class="directions">See Directions</a>' +
                                                    '</div>' +                                                    
                                                    hours_table +
                                                '</li>');
                });

            }, 10);

        },
        dataType: 'text'
    });
}

$(document).ready(function () {

    $('div.map-wrapper button.search').click(function (e) {
        searchPharmacies($(e.target).closest('div.map-wrapper'));
    });

    $('div.map-wrapper input[name=location]').keyup(function (e) {
        var charCode = (typeof e.which === "number") ? e.which : e.keyCode;
        if (charCode == 13) {
            setTimeout(function () {
                $(e.target).closest('div').find('button.search').trigger('click');
            }, 10);
        }
    });

});
