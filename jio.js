// jio.js

module.exports = {
	readFile: readFileSync,
	makePath: makePath,
	writeFile: writeFileSync,
	info: info,
	warn: warn,
	error: error,
	log: log
};

var fs = require('fs');

function readFileSync(path){
	var content = -1;

	try{
		fs.accessSync(path);
	}catch{
		error("File not found: " + path);
		return -1;
	}

	content = fs.readFileSync(path);
	return content.toString();
}

function writeFileSync(path, content){
	fs.writeFileSync(path, content, (err) => {
		if(err){
			error(err);
		}
	});
}

function makePath(path){
	fs.mkdir(path.toString(), (err) => {
		if(err){
			error(err);
			
		};
	});
}

// Logger functions
function info(text){
	console.info("\x1b[38;2;35;176;237m[Infos]\x1b[0m : " + text);
}

function warn(text){
	console.warn("\x1b[38;2;237;149;35m[Warns]\x1b[0m : " + text);
}

function error(text){
	console.error("\x1b[38;2;237;49;35m[Error]\x1b[0m : " + text);
}

function log(text){
	console.log(text);
}