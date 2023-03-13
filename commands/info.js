// info.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('user_info')
    .setDescription('Get useful information')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('User to query')
    .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(call(interaction));
        },
};

let score = require('./score.js');

function call(interaction){
	// The info command has sub-commands, get them here.
	let user = interaction.options.getUser('user', true);

	//if(type === 'user'){

	//let sent = score.get(interaction.guildId, user);
	let sent = 'Err';

    console.log(user);

	return `\`\`\`Username: ${user.username}#${user.discriminator}\nID: ${user.id}\nIs Bot: ${user.bot}\nMessages sent: ${sent}\`\`\``

	//}else if(type === 'server'){
	//	let server = interaction.member.guild;
	//	string = `\`\`\`Name: ${server.name}\nID: ${server.id}\nMembers: ${server.memberCount}\`\`\``;
	//}
}
