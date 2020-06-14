const path = require('path');
const { spawn } = require('child_process');

async function split(file, output, start, end) {
	function runScript() {
		return spawn('python3', [
			__dirname + '/pdfspliter.py',
			__dirname + '/../data/files/' + file,
			__dirname + '/../data/files/' + output,
			start,
			end
		]);
	}
	const subprocess = runScript();

	subprocess.stdout.on('data', (data) => {
		console.log(`data:${data}`);
		return data;
	});
	subprocess.stderr.on('data', (data) => {
		console.log(`error:${data}`);
		return data;
	});
	subprocess.stderr.on('close', () => {
		console.log('Closed');
	});
}
module.exports = { split };
