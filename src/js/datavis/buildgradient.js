module.exports = function (color1, color2) {

var Rainbow = require('rainbowvis.js');

var gradientCreator = new Rainbow();

gradientCreator.setSpectrum(color1,color2).setNumberRange(0,10);

var gradient = [];

for (var index = 0; index < 11; index++) {
	gradient.push('#'+gradientCreator.colourAt(index));	
}

return gradient;

}