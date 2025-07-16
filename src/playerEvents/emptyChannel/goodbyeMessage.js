const { EmbedBuilder } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;

module.exports = async (client, queue) => {
  const textChannel = queue.metadata?.channel;

  if (textChannel) {
    await textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(embedColor)
          .setDescription("👋 The channel is empty, I'm leaving..."),
      ],
    });
  } else {
    console.warn("No text channel found in queue metadata.");
  }
};
