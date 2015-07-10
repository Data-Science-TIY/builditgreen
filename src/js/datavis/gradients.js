var buildgradient = require('./buildgradient');

var numberCertified = buildgradient('#FFCDD2', '#B71C1C');
var numberProjects = buildgradient('#C8E6C9','#1B5E20');
var avgLEED = buildgradient('#FFF9C4','#F57F17');
var gold = buildgradient('#FFCCBC','#BF360C');
var silver = buildgradient('#E1BEE7','#4A148C');
var platinum = buildgradient('#B3E5FC','#01579B');
//console.log(numberCertified);

module.exports = {"number_of_projects":numberProjects,"number_certified": numberCertified
	, "average_of_scored_leed_projects_all": avgLEED, 'number_gold': gold, "number_silver": silver,
	"number_platinum": platinum};