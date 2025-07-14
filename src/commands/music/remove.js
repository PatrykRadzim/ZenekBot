const { useQueue } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "remove",
  description:
    "Remove a track by its position in the queue, or simply type 'remove last' to remove the last track",
  type: "music",
  callback: async (message, arg) => {
    const queue = useQueue(message?.guild.id);
    const embed = new EmbedBuilder().setColor(embedColor);

    if (!queue) {
      embed.setDescription("❌ Queue not found.");
      await reply(message, { embeds: [embed] });
      return;
    }

    let number;
    if (arg.toUpperCase() === "LAST") number = queue.tracks.size;
    else {
      number = arg;
      if (isNaN(number) || number > queue.tracks.size || number < 1) {
        embed.setDescription("❌ Please enter a valid track number.");
        await reply(message, { embeds: [embed] });
        return;
      }
    }

    embed.setDescription(
      `☑️ Removed **${
        queue.tracks.toArray()[number - 1]?.title
      }** from the queue.`
    );
    await reply(message, { embeds: [embed] });

    queue.removeTrack(number - 1);
  },
};
