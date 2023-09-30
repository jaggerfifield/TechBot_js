// pl.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pl')
    .setDescription('Playlist manager')
    .addStringOption(option =>
    option.setName('name')
    .setDescription('The playlist')
    .setRequired(true))
    .addStringOption(option =>
    option.setName('add')
    .setDescription('add a song to the playlist')
    .setRequired(false))
	.addBooleanOption(option =>
	option.setName('shuffle')
	.setDescription('Set to true to shuffle playlist.')),
    async execute(interaction) {
        await interaction.reply(call(interaction));
        },
};

const jio = require('../jio.js');
const play = require('./play.js');

function call(interaction){
    jio.testGuildDir(interaction.guildId);

    let name = interaction.options.getString('name', true);
    let song = interaction.options.getString('add', false);
	let shuffle = interaction.options.getBoolean('shuffle', false);
    let path_id = interaction.guildId

	if(shuffle == null){
		shuffle = false
	}

    if(song !== null){
        addSong(name, song, path_id);
    }else{
        play_pl(interaction, name, shuffle);
    }
    return 'OK'
}

function play_pl(interaction, name, shuffle){
    let path = './' + interaction.guildId + '/playlists/' + name + '.txt'
    play.loadPlaylist(interaction, name, path, shuffle);
}

function addSong(name, song, path_id){
    let path = './' + path_id + '/playlists/'
    if(!jio.checkPath(path)){
        jio.warn('Make path: ' + path);
        jio.makePath(path);
        jio.warn('Making new playlist: ' + name);
        jio.writeFile(path + name + '.txt', song + '\n');
        return;
    }

    path = path + name + '.txt'
    let content = jio.readFile(path)

    if(content !== -1){
        content = content + song + '\n';
    }else{
        content = song + '\n';
    }
    jio.writeFile(path, content);

    play.appendSong(name, song);
}
