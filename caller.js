// caller.js
var avatar = require('./avatar.js');
var help = require('./help.js');
var info = require('./info.js')
var jio = require('./jio.js');
var RTS = require('./rts.js');
var score = require('./score.js');

class Caller{
	constructor(){
		this.interaction = null;
		this.prefix = "/";  // Using slash commands
	}
	
	avatar(){
		return avatar.call(null, this.interaction);
	}
	
	help(){
		return help.call(null, this.prefix);
	}
	
	info(){
		return info.call(this.interaction);
	}
	
	rts(){
		return RTS.call(null);
		
	}
	
	score(){
		return score.call(this.interaction);
	}
	
	setInteraction(interaction){
		this.interaction = interaction;
	}
	
	getToken(){
		return jio.readFile('./key.txt');
	}
	
	getClientID(){
		return jio.readFile('./client.txt');
	}
	
	getGuildID(){
		return jio.readFile('./guild.txt').toString().split("\n");
	}
	
}

module.exports = Caller
