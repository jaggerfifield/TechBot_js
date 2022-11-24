// info.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server_info')
    .setDescription('Get useful information'),
    async execute(interaction) {
        await interaction.reply(call(interaction));
        },
};

function call(interaction){

    let server = interaction.member.guild;
    return `\`\`\`Name: ${server.name}\nID: ${server.id}\nMembers: ${server.memberCount}\`\`\``;

}