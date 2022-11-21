//score.js

const jio = require('./jio.js');

module.exports = {
	call: call,
	get: get
};

function call(interaction){
	let userID = interaction.user.id;
	let guildID = interaction.guildId;
	let choice = interaction.options.getUser('user');
    
	if(choice != null){
		userID = choice.id;
	}

	let path = './' + guildID + '/' + userID + '/count.txt'
	let score = jio.readFile(path);
	
	if(score === -1){
		score = '0';
	}
	
	return score;
}

function get(guild, user){
	let path = './' + guild + '/' + user + '/count.txt'
	let score = jio.readFile(path);
	
	if(score === -1){
		score = '0';
	}

	return score;
}
