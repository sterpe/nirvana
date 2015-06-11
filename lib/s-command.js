exports.s = function (range, re, replacement, bashEscape, g) {
	g = g || "";
	return [
		range
		, 's'
		, '\\<'
		, re.replace(/\&/g, "\\&")
			.replace(/;/g, "\\;")
			.replace(/\(/g, "\\(")
			.replace(/\)/g, "\\)")
			.replace(/ /g, "\\ ")
			.replace(/'/g, "\\'")
		, '\\<'
		, replacement.replace(/\&/g, "\\\\\\&")
			.replace(/;/g, "\\;")
			.replace(/\(/g, "\\(")
			.replace(/\)/g, "\\)")
			.replace(/ /g, "\\ ")
			.replace(/'/g, "\\'")
		, '\\<'
		, g
	].join("");
};
