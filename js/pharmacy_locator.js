
var markers = [];

function initMap()
{    
    $('#postal_cde_text').val($('#header_postal_cde_text').val());

    $('#pharmacy_search_header').hide(500, function () {
        $('#pharmacy_search_results').show(500, function () {
            showMap();
        });
    });
}

function searchPharmacies(event)
{
    var charCode = (typeof event.which === "number") ? event.which : event.keyCode;    

    if(charCode == 13)
    {
        setTimeout(function () {
            $('#postal_cde_button').trigger('click');
        }, 10);
    }
    
}

function switchPharmacyScreen(event)
{
    var charCode = (typeof event.which === "number") ? event.which : event.keyCode;   

    if(charCode == 13)
    {
        setTimeout(function () {
            initMap();
        }, 10);
    }
    
}

function showMap()
{    
    var map = new google.maps.Map(document.getElementById('map'), {        
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP        
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('postal_cde_button').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });

    google.maps.event.addListener(map, 'idle', function () {
        if (opening_infowindow)
            opening_infowindow = false;
        else
            addMarkers(map);
    });

    $('#postal_cde_button').trigger('click');
}

var reference_lat;
var reference_lng;

function geocodeAddress(geocoder, map) {
    var postal_cde = document.getElementById('postal_cde_text').value;
    geocoder.geocode({ 'address': postal_cde }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            reference_lat = results[0].geometry.location.lat();
            reference_lng = results[0].geometry.location.lng();
            map.setZoom(14);
            addMarkers(map);
        } else {
            clearMarkers();            
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

function addMarkers(map) {    
    
}

