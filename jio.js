// jio.js

module.exports = {
	readFile: readFileSync,
	makePath: makePath,
	writeFile: writeFile,
	checkPath: checkPath,
    testGuildDir: testGuildDir,
	info: info,
	warn: warn,
	error: error,
    debug: debug
};

let fs = require('fs');

function readFileSync(path){
	let content = -1;
	
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
}

function checkPath(path){
	// return true if path exists
	return fs.existsSync(path);
}

function testGuildDir(guildId){
    if(!checkPath('./' + guildId)){
        makePath('./' + guildId);
        warn("Made guild dir at: ./" + guildId);
    }
}
function makePath(path){
	fs.mkdir(path.toString(), (err) => {
		if(err){
			error(err);
		}
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

function debug(text){
    console.debug("\x1b[38;2;127;127;127m[Debug] : " + text + "\x1b[0m");
}
