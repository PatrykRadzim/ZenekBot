const { useMainPlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "pause",
  description: "Pause or resume the currently playing song",
  type: "music",
  callback: async (message) => {
    const embed = new EmbedBuilder().setColor(embedColor);
    const player = useMainPlayer();

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

    if (queue.node.isPaused()) {
      queue.node.resume();
      embed.setDescription("▶️ The player is now playing.");
      await reply(message, { embeds: [embed] });
    } else {
      queue.node.pause();
      embed.setDescription("⏸️ The player is now paused.");
      await reply(message, { embeds: [embed] });
    }
  },
};
