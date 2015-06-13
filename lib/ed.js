var child_process = require('child_process')
, bashEscape = require('bash-escape').bashEscape
, exec = child_process.exec
, s = require('./s').s
;
exports.s_replace = function (filename, search, write, options) {
	var command = ['H']
	, range = search.range
	, re = search.re
	, replacement = search.replacement
	, g = search.g
	, i
	;
	for (i = 0; i < range.length; i++) {
		command.push(
			s(range[i], re[i], replacement[i], g[i])
		);
	}
	command.push(write ? 'w' : ',p');
	command.push('Q');

	exec("printf \'%s\n\' " +
		command.join(" ") +
//		"", function (err, stdout, stderr) {
		" | /bin/ed " + bashEscape(filename), function (err, stdout, stderr) {
			if (stdout) { console.log(stdout.toString()) }
			// if (stderr) { console.log("stderr:  ", stderr) }
			if (err !== null) {
				console.log("exec error: " + err);
			}
			if (err !== null) {
				for (i = 0; i < command.length; i++) {
					console.log("%d:	%s", i + 1, command[i]);
				}
			}
			if (options.file_handle) { options.file_handle.unlink() }
	});
};
