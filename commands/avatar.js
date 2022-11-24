// avatar.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Return your discord avatar link.'),
    async execute(interaction) {
        await interaction.reply(interaction.user.avatarURL());
        },
};
