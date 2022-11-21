// info.js

module.exports = {
	call: call
};

let score = require('./score.js');

// const { MessageEmbed } = require('discord.js')

function call(interaction){
	// The info command has sub-commands, get them here.
	let type = interaction.options.getSubcommand(false);
	let string = 'WIP';
	
	if(type === 'user'){
		let user = interaction.options.getUser('username');
		
		if(user == null){
			user = interaction.user;
		}

		let sent = score.get(interaction.guildId, user.id);

		string = `\`\`\`Username: ${user.username}#${user.discriminator}\nID: ${user.id}\nIs Bot: ${user.bot}\nMessages sent: ${sent}\`\`\``
		
	}else if(type === 'server'){
		let server = interaction.member.guild;
		string = `\`\`\`Name: ${server.name}\nID: ${server.id}\nMembers: ${server.memberCount}\`\`\``;
	}
	
	return string
}