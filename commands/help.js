//help.js - Common helpful commands and descriptors

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help with other commands'),
    async execute(interaction) {
        await interaction.reply(generate());
        },
};

function generate(){
    let helpList;
    let toSend;

    let prefix = '/';

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
