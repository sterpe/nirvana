#!/usr/bin/env node
var minimist = require('minimist')
, argv = minimist(process.argv.slice(2))
, LineByLineReader = require('line-by-line')
, child_process = require('child_process')
, exec = child_process.exec
, path = require('path')
, fs = require('fs')
, edCommand = require('../main.js')
, range = []
, sourceLines = []
, targetLines = []
, tsv
, importFile
, filename
, newFilename
;


// Implement bash string escaping.
var safePattern =    /^[a-z0-9_\/\-.,?:@#%^+=\[\]]*$/i;
var safeishPattern = /^[a-z0-9_\/\-.,?:@#%^+=\[\]{}|&()<>; *']*$/i;
function bashEscape(arg) {
  // These don't need quoting
  if (safePattern.test(arg)) return arg;
 
  // These are fine wrapped in double quotes using weak escaping.
  if (safeishPattern.test(arg)) return '"' + arg + '"';
 
  // Otherwise use strong escaping with single quotes
  return "'" + arg.replace(/'+/g, function (val) {
    // But we need to interpolate single quotes efficiently
 
    // One or two can simply be '\'' -> ' or '\'\'' -> ''
    if (val.length < 3) return "'" + val.replace(/'/g, "\\'") + "'";
 
    // But more in a row, it's better to wrap in double quotes '"'''''"' -> '''''
    return "'\"" + val + "\"'";
 
  }) + "'";
}
tsv = bashEscape(argv.tsv);
importFile = bashEscape(argv.importFile);

// Need to convert the importFile file into pretty print xml
filename = path.basename(argv.importFile, path.extname(argv.importFile));
newFilename = filename + '-fire-drill' + path.extname(argv.importFile);
exec('cat ' + importFile + ' | xmllint --format -', 
	function (error, stdout, stderr) {
		console.log('stdout:  ' + stdout);
		console.log('stderr:  ' + stderr);
		if (error !== null) {
			console.log('exec error:  ' + error);
		}
		fs.writeFile(newFilename,
			stdout.toString(),
			function (err) {
				if (err !== null) {
					console.log(error);
					process.exit(error);
				}
				processTsv();
		});
});

function processTsv() {
	lr = new LineByLineReader(tsv);
	
	lr.on('error', function (err) {
		console.log(err);
		process.exit(err);
	});
	lr.on('line', function (line) {
		var columns = [range, sourceLines, targetLines];
		var line = line.split("\t");
		for (var i = 0; i < line.length; i++) {
			columns[i].push(line[i]);
		}
	});
	lr.on('end', function () {
		console.log(range, sourceLines, targetLines);
		edCommand(bashEscape(newFilename)
			, range
			, sourceLines
			, targetLines
			, bashEscape
		);
	});
}
