// play.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('stop')
	.setDescription('Stop playing audio'),
	 async execute(interaction) {
        await interaction.reply(call(interaction));
        }
};

const index = require('../index');
const jio = require('../jio.js');
const play = require('./play.js');

function call(interaction){
	return play.stop(interaction);
}