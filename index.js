// index.js

module.exports = {
    send_message: send_message
}

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", 32768]});

const jio = require('./jio.js');
const stats = require('./stats.js');

const Caller = require('./caller.js');
const run = new Caller();

const { token, clientId, guilds } = require('./config.json');
//const {GatewayIntentBits} = require("discord-api-types");

const rest = new REST({ version: '9' }).setToken(token);

const allowGIF = false;

const commands = [
	{
		name: 'avatar',
		description: 'Get a link to the user\'s avatar.'
	},
	{
		name: 'help',
		description: 'Get common commands.'
	},
	{
		name: 'info',
		description: 'Provides useful information.',
		options: [{
			name: 'user',
			description: 'Get info about a user.',
			type: 1,
			required: false,
			options: [{
				name: 'username',
				description: 'A server member',
				type: 6,
				required: false
			}]
		},{
			name: 'server',
			description: 'get info on the server.',
			type: 1,
			required: false
		}]
	},
	{
		name: 'rts',
		description: 'What does this do again?'
	},
	{
		name: 'score',
		description: 'See total messages sent*',
		options: [
			{
				name: 'user',
				description: 'who to look up',
				type: 6, // We want a USER type, more info: https://discord.com/developers/docs/interactions/application-commands#subcommands-and-subcommand-groups
				required: false
			}
		]
    },
    {
        name: 'stop',
        description: 'Stop playing audio'
    },
    {
        name: 'play',
        description: 'Play audio in voice rooms',
        options: [
            {
                name: 'source',
                description: 'Audio target',
                type: 3,
                required: true
            }
        ]
    },
    {
        name: 'pl',
        description: 'playlist manager',
        type: 1,
        options: [
            {
                name: 'name',
                description: 'create a playlist',
                type: 3, // string
                required: true,
            },
            {
                name: 'add',
                description: 'add a song to a playlist',
                type: 3, //string
                required: false
            }
        ]
    }
];

(async () => {
	try{
		jio.info("Started refreshing application (/) commands.");
		
		for(let i = 0; i < guilds.length; i++){
			jio.info("Adding guild: " + guilds[i]);
			if(!jio.checkPath('./' + guilds[i])){
				jio.makePath('./' + guilds[i]);
				jio.warn("Made guild dir at: ./" + guilds[i]);
			}else{
				jio.info("Found guild dir: ./" + guilds[i]);
			}
			await rest.put( Routes.applicationGuildCommands(clientId, guilds[i]), { body: commands } );
		}

		jio.info("Successfully reloaded application (/) commands.");
	}catch(error){
		jio.error(error);
	}
})();

client.on('ready', () => {
	jio.info("Logged in as " + client.user.tag + "!");
});

client.on('interactionCreate', async interaction => {
	jio.info("Found interaction!");
	
	if(!interaction.isCommand()){
		jio.warn("Interaction " + interaction.commandName + " is not a TechBot_ command.");
		return;
	} 

	try{
		run.setInteraction(interaction);
		jio.info("Attemtping to execute interaction: " + interaction.commandName);
		let reply = eval("run." + interaction.commandName + "();");
        if(reply != null){
            await interaction.reply(reply);
        }
		jio.info("Interaction " + interaction.commandName + " finished successfully!");
	} catch(e){
		jio.error("[index.js]: " + e);
        throw e;
	}
});

client.on('messageCreate', async message => {
	if(stats.run(message)){
		if(!allowGIF){
			jio.warn("Message deleted.");
			await message.delete();
		}
	}
})

function send_message(channel, message){
    const here = client.channels.cache.get(channel);
    here.send(message);
}

client.login(token);
