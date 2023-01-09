// index.js

module.exports = {
    send_message: send_message,
	send_file: send_file
}

const jio = require('./jio.js');
const stats = require('./stats.js');
const fs = require('node:fs');
const path = require('node:path');

const { token, clientId } = require('./config.json');
const { REST, Routes, Client, Collection, Events } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(token);

// The intents are from https://discord.com/developers/docs/topics/gateway#gateway-intents
// 1<<0 : GUILDS    1<<7 : GUILD_VOICE_STATES   1<<9 : GUILD_MESSAGES   1<<15 : MESSAGE_CONTENT
const client = new Client({intents: [1<<0, 1<<7, 1<<9, 1<<15]})

// TODO this should not exist, need to create a word filter file.
const allowGIF = false;

function importCommands(){
    // Slash commands constants
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));

    client.commands = new Collection();
    client.cmd = [];

    // Import commands from the commands folder
    for(const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command);
            client.cmd.push(command.data.toJSON())
        }else{
            jio.error(`The command at ${filePath} is missing a required "data" or "execute" property!`);
        }
    }
}

(async () => {

    importCommands();

	try{
		jio.info(`Started refreshing ${client.cmd.length} application (/) commands.`);

        await rest.put(
                Routes.applicationCommands(clientId),
                { body: client.cmd },
                );

		jio.info(`Successfully reloaded application (/) commands.`);

	}catch(error){
		jio.error(error);
	}
})();

client.once('ready', () => {
	jio.info(`Logged in as ${client.user.tag}!`);
});

// Trigger on interactions
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    jio.info("Found interaction");

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        jio.error(`No command matching ${interaction.commandName} was found`)
        return;
    }

	if(interaction.commandName === 'rand'){
		await interaction.deferReply();
		let file = await command.execute(interaction);
		if(file != null){
			await interaction.editReply("Uploading file . . .")
			let here = client.channels.cache.get(interaction.channelId);
			here.send({
				files: [{
					attachment: 'list.txt',
					name:'list.txt',
					description:'A file of random values.'
				}]
			});
		}
		return;
	}

    try{
        await command.execute(interaction);
    } catch (error) {
        jio.error(error);
        await interaction.reply({content: 'There was an error processing this command!', ephemeral: true});
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

function send_file(channel, file){
	const here = client.channels.cache.get(channel);
	here.send('File: ', {files: [file]});
}

client.login(token).then(r => jio.debug(`Login in with token: ${r}`));
