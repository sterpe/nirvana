module.exports = function (filename, RANGE, SRC, TGT, bashEscape) {
	var child_process = require('child_process')
	, exec = child_process.exec
	, i
	, s = require('./lib/s-command').s
	, edCommands = ['H'];
	;
	
	
	for (i = 0; i < SRC.length; ++i) {
		edCommands.push(s(RANGE[i], SRC[i], TGT[i], bashEscape));
	};
	
	
	edCommands.push('w');
	edCommands.push('p');
	edCommands.push('q');
	console.log(edCommands);
	exec('printf \'%s\n\' ' +
		edCommands.join(" ") +
		" | gned " + filename, function (err, stdout, stderr) {
			console.log("stdout: ", stdout);
			console.log("stderr: ", stderr);
			if (err !== null) {
				console.log('exec error: ' + err);
			}
	});
};
