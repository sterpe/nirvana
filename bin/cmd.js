#!/usr/bin/env node
var argv = require('minimist-cheatsheet')({
	string: ['outfile']
	, boolean: ['xml', 'skip-first-row']
	, alias: { h: 'help', v: 'version', o: 'outfile', c: 'clean', x: 'xml', s: 'skip-first-row' }
})
, path = require('path')
, fs = require('fs')
, clean = []
;
if (argv._.length !== 2) {
	cmd = path.basename(process.argv[1]);
	usage = __dirname + '/../help.txt';
	console.log(
		fs.readFileSync(usage, 'utf-8')
		.replace(/\$0/g, cmd)
		.trim()
	);
	process.exit();
}
if (argv.clean) {
	if (Object.prototype.toString.call(argv.clean) !== '[object Array]') {
		argv.clean = [argv.clean];
	}
	for (i = 0; i < argv.clean.length; ++i) {
		clean[i] = JSON.parse(argv.clean[i]);
	}
}
require('../main')(argv._[0], argv._[1], argv.outfile, { isXML: argv.xml, clean: clean, skip: argv['skip-first-row'] });
