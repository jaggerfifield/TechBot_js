//score.js

const jio = require('../jio.js');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('score')
    .setDescription('Get the score of a user')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('user to query')
    .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(call(interaction));
        },
};
function call(interaction){
    jio.testGuildDir(interaction.guildId);
    
	let guildID = interaction.guildId;
	let choice = interaction.options.getUser('user');

	let path = './' + guildID + '/' + choice.id + '/count.txt'
	let score = jio.readFile(path);

	if(score === -1){
		score = '0';
	}

    return `${choice.username} has score: ${score}!`;
}
