//score.js

var jio = require('./jio.js');

module.exports = {
	call: call,
	get: get
};

function call(interaction){
	var userID = interaction.user.id;
	var guildID = interaction.guildId; 
	
	var choice = interaction.options.getUser('user');
	if(choice != null){
		userID = choice.id;
	}
	

	var path = './' + guildID + '/' + userID + '/count.txt'
	
	var score = jio.readFile(path);
	
	if(score == -1){
		score = '0';
	}
	
	return score;
}

function get(guild, user){

	var path = './' + guild + '/' + user + '/count.txt'
	
	var score = jio.readFile(path);
	
	if(score == -1){
		score = '0';
	}
	
	return score;
}
