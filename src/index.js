require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const { YoutubeiExtractor } = require("discord-player-youtubei");
const handleEvents = require("./handlers/handleEvents");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.player = new Player(client);
client.player.extractors.register(YoutubeiExtractor);

handleEvents(client);

client.login(process.env.TOKEN);
