const fs = require('fs');
const { getrandomstring } = require('./string');
const { slugify } = require('./slugify');

async function saveThis(file, type) {
	let name = getrandomstring(30);

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
			return { url: name + n };
		}
	});

	return { url: name + n };
}
module.exports = { saveThis };
