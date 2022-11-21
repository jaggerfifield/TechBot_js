// stats.js

module.exports = {
	run: run
};

const jio = require('./jio.js');

function checker(message){
	// Check if the message is not allowed; bad message returns true
	let check = false;
	let mContent = message.content;
	
	if(mContent.search('tenor.com') !== -1){
		jio.warn("Found 'tenor.com' in message from " + message.author.username);
		check = true;
	}
	
	return check;
}

function run(message){
	let mStatus = false;
	
	// Update user scores
	updateUserScore(message);
	
	// Update server logs
	updateServerLogs(message);
	
	// Update daily message count
	
	// Update word count
	
	// Check message
	mStatus = checker(message);
	
	// Return the status of the message (true means delete the message)
	return mStatus;
}

function updateUserScore(message){
	let userID = message.author.id;
	let guildID = message.guildId;
	let path = './' + guildID + '/' + userID;
	let file = path + '/count.txt';
	let content = jio.readFile(file.toString());
	
	if(!jio.checkPath(path)){
		jio.makePath(path);
		jio.warn("Path " + path + " has been created!");
		content = 0;
	}
	
	content = Number(content) + 1;
	jio.writeFile(file, content.toString());
}

function updateServerLogs(message){
	let guildId = message.guildId;
	let path = './' + guildId;
	let file = path + '/log.txt';
	let content = jio.readFile(file.toString());
	
	if(content === -1){
		content = '';
		jio.warn("Server log file made!");
	}
	
	content = content + '[' + message.createdAt + '] <' + message.author.username + '> : ' + message.content + '\n';
	jio.writeFile(file, content);
}
