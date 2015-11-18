
var init = function() {
	var field = document.getElementById("field");
	var ctx = field.getContext('2d');

	ctx.fillRect( 30, 30, 50, 50);
	ctx.fillRect( 500, 300, 50, 50);
	ctx.fillRect( 1000, 900, 50, 50);
};

document.addEventListener('DOMContentLoaded', init);