var makeup = ["Blush",
 			"Mascara",
 			"Eyeliner",
 			"Highlighter",
 			"Lip Gloss"]
var arrayLength = makeup.length;
var itemNumber = 0;
var msg = '';
var i;

for (i = 0; i < arrayLength; i++){
	itemNumber = (i+1);
	msg += makeup[i] + '<br>';
}

document.getElementById('kaupa').innerHTML = msg;
