//help.js - Common helpful commands and descriptors

function call(prefix){
	let helpList;
	let toSend;
	toSend = "All avaliable commands:\n```";

	helpList = 	[ 	
					("	" + prefix + "avatar - Get a link to your discord avatar."),
					("	" + prefix + "help - This list"),
					("	" + prefix + "info <user/server> [user]- Provides information on the current server or the selected user."),
					("	" + prefix + "rts - ? ? ?"),
					("	" + prefix + "score [user] - See how many messages are sent by a user.")
					
				]
				
	for(let i = 0; i < helpList.length;){
		toSend = toSend + helpList[i] + "\n";
		i++;
	}
	
	toSend = toSend + '```'
	
	return toSend;
}

module.exports = call;
