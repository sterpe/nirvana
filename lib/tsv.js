var LineByLineReader = require('line-by-line')
;
module.exports = function (tsv, options, cb) {
	var range = []
	, re = []
	, replacement = []
	, g = []
	, clean = options.clean
	;
	lr = new LineByLineReader(tsv);

	lr.on('error', function (err) {
		console.log(err);
		process.exit();
	});
	lr.on('line', function (line) {
		var columns = [range, re, replacement, g]
		, line = line.split('\t')
		, i
		;
		for (i = 0; i < clean.length; i++) {
			line[1] = line[1].replace(new RegExp(clean[i][0], "g"), clean[i][1]);
		}
		for (i = 0; i < columns.length; i++) {
			columns[i].push(line[i]);
		}
	});
	lr.on('end', function () {
		cb({
			range: range.slice(1)
			, re: re.slice(1)
			, replacement: replacement.slice(1)
			, g: g.slice(1)
		});
	});
};
