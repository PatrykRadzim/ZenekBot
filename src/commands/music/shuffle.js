const { useMainPlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "shuffle",
  description: "Shuffle the tracks in the queue",
  type: "music",
  callback: async (message) => {
    const player = useMainPlayer();
    const embed = new EmbedBuilder().setColor(embedColor);

    if (!player) {
      embed.setDescription("❌ Player instance not found.");
      await reply(message, { embeds: [embed] });
      return;
    }

    const queue = player.nodes.get(message.guild.id);

    if (!queue) {
      embed.setDescription(
        "❌ This server doesn't have an active player session."
      );
      await reply(message, { embeds: [embed] });
      return;
    }

    if (!queue.isPlaying()) {
      embed.setDescription("❌ There is no track playing.");
      await reply(message, { embeds: [embed] });
      return;
    }

    if (queue.tracks.size < 2) {
      embed.setDescription(
        "❌ There are not enough tracks in the queue to shuffle."
      );
      await reply(message, { embeds: [embed] });
      return;
    }

    queue.tracks.shuffle();

    embed.setDescription("🔀 Queue is now shuffled.");
    await reply(message, { embeds: [embed] });
  },
};
