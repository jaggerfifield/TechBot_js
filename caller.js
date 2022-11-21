// caller.js
const avatar = require('./avatar.js');
const help = require('./help.js');
const info = require('./info.js')
const jio = require('./jio.js');
const pl = require('./pl.js');
const play = require('./play.js');
const RTS = require('./rts.js');
const score = require('./score.js');

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

    pl(){
        return pl.call(this.interaction);
    }

    play(){
        return play.call(this.interaction);
    }
	
	rts(){
		return RTS.call(null);
		
	}
	
	score(){
		return score.call(this.interaction);
	}

    stop(){
        return play.stop(this.interaction);
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
