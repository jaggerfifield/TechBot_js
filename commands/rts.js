// rts.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rts')
    .setDescription('? ? ?'),
    async execute(interaction) {
        await interaction.reply(call());
        },
};

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function call(){
	let list;
	let x;

	list = [	"Relay Transmission Service",
				"Really Techie Server",
				"Randomly Titled Server",
				"Ready To Save",
				"Read This Sentence.",
				"Really That Simple",
				"R.T.S. Test Server",
				"Render Texture Sample",
				"Resetting This Server",
				"R.T.S.",
				"Remember to Save",
				"Range Too Severe"
				];

	x = getRndInteger(0, list.length);

	return list[x].toString();
}
