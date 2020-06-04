const fs = require('fs');
const { getrandomstring } = require('./string');

async function saveThis(file, type) {
	let name = getrandomstring(30);
	let dir;
	if (type === 'file') {
		dir = __dirname + '/../data/files/' + name + file.name;
	}
	if (type === 'cover') {
		dir = __dirname + '/../data/covers/' + name + file.name;
	}
	let save = await fs.writeFile(dir, file.data, (err) => {
		if (err) {
			return { error: err };
		} else {
			return { url: name + file.name };
		}
	});

	return { url: name + file.name };
}
module.exports = { saveThis };
