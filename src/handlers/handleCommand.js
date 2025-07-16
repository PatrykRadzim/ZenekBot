const { EmbedBuilder } = require("discord.js");
const findCommand = require("../utils/findCommand");

const embedColor = require("../../config.json").embedColor;

module.exports = async (client, message, commandName, args) => {
  const command = findCommand(commandName);
  if (command === null) return;

  try {
    if (command?.type === "music") {
      await client.player.context.provide(
        { guild: message.guild },
        async () => {
          await command.callback(message, args);
        }
      );
    } else {
      await command.callback(message, args);
    }
  } catch (error) {
    console.log(`Error running command "${command.name}": ${error}`);
    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(embedColor)
          .setDescription("❌ There was en error running this command."),
      ],
    });
  }
};
