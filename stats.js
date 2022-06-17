// stats.js

module.exports = {
	run: run
};

var jio = require('./jio.js');

function checker(message){
	// Check if the message is not allowed; bad message returns true
	var check = false;
	var mContent = message.content;
	
	if(mContent.search('tenor.com') != -1){
		jio.warn("Found 'tenor.com' in message from " + message.author.username);
		check = true;
	}
	
	return check;
};

function run(message){
	var mStatus = false;
	
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
};

function updateUserScore(message){
	var userID = message.author.id;
	var guildID = message.guildId;
	
	var path = './' + guildID + '/' + userID;
	var file = path + '/count.txt';
	var content = jio.readFile(file.toString());
	
	if(content == -1){
		// Make the directory for the guild
		jio.makePath('./' + guildID);
		jio.info("User path made!");
		// Make the directory for a user
		jio.makePath(path.toString());
		content = 1;
		jio.writeFile(file, content.toString());
	}else{
		content = Number(content) + 1;
		jio.writeFile(file, content.toString());
	}
}

function updateServerLogs(message){
	var guildId = message.guildId;
	
	var path = './' + guildId;
	var file = path + '/log.txt';
	var content = jio.readFile(file.toString());
	
	if(content == -1){
		content = '';
		jio.info("Server log file made!");
	}
	
	content = content + '[' + message.createdAt + '] <' + message.author.username + '> : ' + message.content + '\n';
	jio.writeFile(file, content);
}
