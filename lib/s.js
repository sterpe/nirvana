var delimiters = require('./delimiters')
;
exports.s = function (range, re, replacement, g) {
	var delimiter
	, i
	;
	g = g || "";
	expr = re + replacement;
	i = 0;
	while(typeof delimiter === 'undefined' && i < delimiters.length) {
		if (expr.indexOf(delimiters[i]) === -1) {
			// We can use this as the delimiter
			delimiter = delimiters[i];
		} else {
			i++;
		}
	}
	if (typeof delimiter === 'undefined') {
		// There is no possible delimiter that can unambigiously
		// partition the command....
		throw new Error("No possible delimiter to partition command.");
		process.exit();
	}
	return [
		range
			.replace(/\$/g, "\\$")
		, 's'
		, '\\' + delimiter
//		, re.replace(/\&quot\;/g, "\"")
		, re.replace(/\&/g, "\\&")
			.replace(/\./g, "\\.")
			.replace(/;/g, "\\;")
			.replace(/\(/g, "\\(")
			.replace(/\)/g, "\\)")
			.replace(/ /g, "\\ ")
			.replace(/'/g, "\\\'")
			.replace(/"/g, "\\\"")
		, '\\' + delimiter
		, replacement.replace(/\&/g, "\\\\\\&")
			.replace(/;/g, "\\;")
			.replace(/\(/g, "\\(")
			.replace(/\)/g, "\\)")
			.replace(/ /g, "\\ ")
			.replace(/'/g, "\\'")
		, '\\' + delimiter
		, g
	].join("");
};
