// avatar.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Return a discord avatar link.')
    .addUserOption(option =>
    option.setName('user')
    .setDescription('User to query')
    .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(call(interaction));
        },
};

function call(interaction){
    let user = interaction.options.getUser('user', true);

    return user.avatarURL()
}