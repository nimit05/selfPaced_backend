const fs = require('fs');
const { getrandomstring } = require('./string');
const { slugify } = require('./slugify');
const { split } = require('./FileSpliter');
async function saveThis(file, type, start, end) {
	let name = getrandomstring(30);
	let sampleName = getrandomstring(30);
	let n = slugify(file.name);

	let dir;
	if (type === 'file') {
		dir = __dirname + '/../data/files/' + name + n;
	}
	if (type === 'cover') {
		dir = __dirname + '/../data/covers/' + name + n;
	}
	let save = await fs.writeFile(dir, file.data, (err) => {
		if (err) {
			return { error: err };
		} else {
			if (type === 'file') {
				let res = split(name + n, sampleName, start, end);
			}
			return { url: name + n, sample_url: sampleName };
		}
	});

	return { url: name + n, sample_url: sampleName };
}
module.exports = { saveThis };
