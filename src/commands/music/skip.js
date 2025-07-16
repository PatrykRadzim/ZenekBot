const { useMainPlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "skip",
  description: "Skip the currently playing song",
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

    queue.node.skip();

    embed.setDescription("⏭️ The current song has been skipped.");
    await reply(message, { embeds: [embed] });
  },
};
