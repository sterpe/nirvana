# nirvana

Easily execute scripted search and replace commands in-place with `ed`.

	nirvana replacements.tsv file.txt -o file.txt

Where a replacements.tsv file looks like this:

ADDRESS	RE	REPLACEMENT	FLAGS
,	foo	bar	2

The program will escape whitespace and other relevant characters in both the 
RE and REPLACEMENT columns, so no special regex commands like `,s/foo/&&/g` etc.

Of course, it relies on `/bin/ed`, so not fully portable.
