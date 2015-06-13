var temporary = require('temporary')
, bashEscape = require('bash-escape').bashEscape
, child_process = require('child_process')
, exec = child_process.exec
, fs = require('fs')
;
exports.xmllint = function (filename, outfile, cb) {
	exec("cat " + bashEscape(filename) + " | xmllint --format -",
		function (error, stdout, stderr) {
			var file
			;
			if (stderr) {
				console.log("stderr:  " + stderr);
			}
			if (error !== null) {
				console.log('exec error:  ' + error);
				process.exit();
			}
			if (outfile) {
				fs.writeFile(outfile, stdout.toString(), cb);
			} else {
				file = new temporary.File();
				file.writeFile(stdout.toString(), function (err) {
					if (err) {
						console.log(err);
						file.unlink();
					}
					cb(err, err ? undefined : file);
				});
			}
	});
};
