// jio.js

module.exports = {
	readFile: readFileSync,
	makePath: makePath,
	writeFile: writeFile,
	checkPath, checkPath,
	info: info,
	warn: warn,
	error: error,
	log: log
};

var fs = require('fs');

function readFileSync(path){
	var content = -1;
	
	if(checkPath(path)){
		// The path exists, return the content of the path.
		content = fs.readFileSync(path).toString();
		return content;
	}else{
		error("File not found: " + path);
		return content;
	}
}

function writeFile(path, content){
	
	fs.writeFile(path, content, (err) => {
		if(err){
			error(err);
		}
	});
	
	/*
	if(checkPath(path)){
		// The file exists!
		fs.writeFile(path, content, (err) => {
			if(err){
				error(err);
			}
		});
	}else{
		warn("File not created yet: " + path);
		var dir = path.split("/");
		var dir_check = dir[0]
		for(let i = 0; i < dir.length - 1; i++){
			info("Checking that dir " + dir_check);
			if(checkPath(dir_check)){
				dir_check = dir_check + '/' + dir[i+1];
			}else{
				warn("Path " + dir_check + "not found!");
				makedir(dir_check);
			}
		}
	}
	*/
}

function checkPath(path){
	// return true if path exists
	return fs.existsSync(path);
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