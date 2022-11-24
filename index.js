// index.js

module.exports = {
    send_message: send_message
}

const jio = require('./jio.js');
const fs = require('node:fs');
const path = require('node:path');

const { token, clientId, guild } = require('./config.json');
const { REST, Routes, Client, Collection, Events } = require('discord.js');

// The intents are from https://discord.com/developers/docs/topics/gateway#gateway-intents
// 1<<0 : GUILDS    1<<7 : GUILD_VOICE_STATES   1<<9 : GUILD_MESSAGES   1<<15 : MESSAGE_CONTENT
const client = new Client({intents: [1<<0, 1<<7, 1<<9, 1<<15]})

// Slash commands constants
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file=>file.endsWith('.js'));

const commands = []
client.commands = new Collection();

// Import commands from the commands folder
for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON())
    }else{
        jio.error(`The command at ${filePath} is missing a required "data" or "execute" property!`);
    }
}

const rest = new REST({ version: '10' }).setToken(token);

const stats = require('./stats.js');

const allowGIF = false;

jio.info("Adding guild: " + guild);
if(!jio.checkPath('./' + guild)){
    jio.makePath('./' + guild);
    jio.warn("Made guild dir at: ./" + guild);
}else{
    jio.info("Found guild dir: ./" + guild);
}

(async () => {
	try{
		jio.info(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
                Routes.applicationGuildCommands(clientId, guild),
                { body: commands },
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

client.login(token).then(r => jio.debug(`Login in with token: ${r}`));
