var xmllint = require('./lib/xmllint').xmllint
, tsv = require('./lib/tsv')
, s_replace = require('./lib/ed').s_replace
;
module.exports = function (tsvfile, filename, outfile, options) {
	var XXX
	, YYY
	, write = !!outfile
	;
	XXX = function (search) {
		s_replace(outfile || filename, search, write, options);
	};
	YYY = function () {
		tsv(tsvfile, options, XXX);
	};
	if (options.isXML) {
		xmllint(filename, outfile, function (err, file_handle) {
			if (err) {
				console.log(err);
				process.exit();
			}
			if (file_handle) {
				outfile = file_handle.path;
				options.file_handle = file_handle;
			}
			YYY();
		});
	}
	else {
		YYY();
	}
};
