$(document).ready(function () {
	// check if the tiles are defined
	setTimeout(function () { 
		if ($('div.supportertiles div').length > 0) 
			rotateSupporterTiles(-1, 5); 
	}, 2000);
		
});

function rotateSupporterTiles(last_index, next_tile)
{
    var index = Math.floor(Math.random()*5)+1;
	if(index == last_index)
	{
		while(index != last_index)
		{
			index = Math.floor(Math.random()*5)+1;
		}
	}
	
	if($('div.supportertiles').children().length <= next_tile) next_tile=0;
			 
    $('#supportertile' + index).transition({perspective: '0px', rotateY: '90deg'}, function() {        
        $('#supportertile' + index).html($($('div.supportertiles').children()[next_tile]).html());
        $('#supportertile' + index).transition({perspective: '0px', rotateY: '0deg'});       
        setTimeout(function () { rotateSupporterTiles(index, ++next_tile);}, 2000);
    });
}