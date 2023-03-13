const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rand')
    .setDescription('Generate a list of random numbers.')
	.addIntegerOption(option =>
		option.setName('elements')
		.setDescription('Number of random integers')
		.setRequired(true))
	.addIntegerOption(option=>
		option.setName('min')
		.setDescription('The minimum value to use')
		.setRequired(true))
	.addIntegerOption(option =>
		option.setName('max')
		.setDescription('The maximum value to use')
		.setRequired(true)),
    async execute(interaction) {
		return call(interaction);
        },
};

const index = require('../index')
const jio = require('../jio')


function call(interaction){

	let elements = interaction.options.getInteger('elements', true);
	let min = interaction.options.getInteger('min', true);
	let max = interaction.options.getInteger('max', true);
	let channelId = interaction.channelId;

	if(elements > 2000000){
		interaction.editReply("Too many elements!")
		return -1;
	}

	jio.info("Generating a " + elements + " long random number file.")

	let out = "";

	while(elements > 0){
		out = out + (randomNumber(min, max)) + "\n";
		elements--;
	}

	jio.info("Writing file.")
	jio.writeFile("./list.txt", out);

	jio.info("Sending file . . .")
	return 0;
}


function randomNumber(min, max){
	return Math.floor(Math.random() * (max - min) + min)
}
	
