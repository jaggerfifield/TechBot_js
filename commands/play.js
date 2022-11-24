// play.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a audio from source.')
    .addStringOption(option =>
        option.setName('source')
        .setDescription('The audio source to play')
        .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(call(interaction));
        },
    loadPlaylist: loadPlaylist,
    appendSong: appendSong
};

const index = require('../index')
const jio = require('../jio.js');
const ytdl = require('ytdl-core');
const {createReadStream} = require('node:fs');
const {getVoiceConnection, createAudioPlayer, joinVoiceChannel, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');

const songs = [];
const pl = [];
const pl_count = [];

function call(interaction){
    let source = interaction.options.getString('source', true);
    if(source != null){
        startVoice(interaction, source);
        return "Song <" + source + "> added to qeue.";
    }else{
        jio.warn("Null source.");
        return "No source found."
    }
}

function startVoice(interaction, source){

        jio.info("New song: " + source);

        let test = getVoiceConnection(interaction.guildId);
        if(test != null){
            jio.info("Added song to qeue");
            songs.push(source);
        }else{
            let player = createAudioPlayer();

            let play_channel = get_play_channel(interaction.guildId);

            const connection = joinVoiceChannel({
                channelId: play_channel,
                guildId: interaction.guildId,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator
            });

            connection.subscribe(player);
            index.send_message(interaction.channelId, "Now playing: " + source);
            player.play(loadSong(source));

            player.on('error', error => {jio.error("[Play.js]" + error)});

            player.on(AudioPlayerStatus.Idle, () =>{
                jio.info("Player Idle, checking next song . . .");
                if(songs.length !== 0){
                    let song = songs.shift();
                    pl_count[0] = pl_count[0] - 1;
                    if(pl_count[0] <  1){
                        pl.shift();
                        pl_count.shift();
                    }
                    index.send_message(interaction.channelId, "Now playing: " + song);
                    player.play(loadSong(song));
                }else{
                    stop(interaction);
                }
            })
        }
}

function get_play_channel(guildId){
    let channel_ids = jio.readFile('./' + guildId + '/pl_config.txt');

    if(channel_ids === -1){
        jio.error("No config!")
        index.send_message("No channel found in config!");
        return
    }
    return channel_ids;
}

function loadSong(song){

    let sound;

    if(song.includes(".mp3") && !song.includes("http")){
        jio.info("Local resource requested.");
        sound = createAudioResource(createReadStream(song.replace(/['"]/g,'')));
    }else{
        sound = createAudioResource(ytdl(song,
            {
                filter: 'audioonly',
                fmt: "mp3",
                highWaterMark: 1 << 62,
                liveBuffer: 1 << 62,
                dlChunkSize: 0,
                bitrate: 128,
                quality: "lowestaudio",
            }));
    }

    return sound;
}

function loadPlaylist(interaction, name, path){
    let content = jio.readFile(path);
    content = content.split('\n');
    content.pop(); // Remove the extra newline character

    pl.push(name);
    pl_count.push(content.length);

    console.log(content);
    for(let s in content){
        songs.push(content[s]);
    }

    startVoice(interaction, songs.shift());
}

function appendSong(name, song){
    jio.info('Check if playlist is playing');
    if(pl[0] === name){
        jio.info('Appending song');
        songs.push(song);
        pl_count[0] = pl_count[0] + 1;
    }
}

function stop(interaction){
    const connection = getVoiceConnection(interaction.guildId);
    if(connection != null){
        connection.destroy();
    }
    return "Stopped";
}