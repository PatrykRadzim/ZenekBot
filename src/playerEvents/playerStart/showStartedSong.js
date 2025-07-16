const { EmbedBuilder } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;

module.exports = async (client, queue, track) => {
  const textChannel = queue.metadata?.channel;

  if (textChannel) {
    // Timeout to make sure that message from play.js comes first

    setTimeout(async () => {
      const embed = new EmbedBuilder()
        .setColor(embedColor)
        .setTitle(`💿 Started Playing`)
        .setDescription(
          `**[${track?.title}](${track?.url})** (${track?.duration})`
        )
        .setImage(track?.thumbnail);
      await textChannel.send({ embeds: [embed] });
    }, 100);
  } else {
    console.warn("No text channel found in queue metadata.");
  }
};
