const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

var jio = require('./jio.js');
var stats = require('./stats.js');

var Caller = require('./caller.js');
var run = new Caller();

const { token, clientId, guilds } = require('./config.json');

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
		await interaction.reply(reply);
		jio.info("Interaction " + interaction.commandName + " finished successfully!");
	} catch(e){
		jio.error(e);
	}
});

client.on('messageCreate', async message => {
	if(stats.run(message)){
		if(!allowGIF){
			jio.warn("Message deleted.");
			message.delete();
		}
	}
})

client.login(token);
