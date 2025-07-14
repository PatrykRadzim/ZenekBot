const { useMainPlayer } = require("discord-player");
const { getCurrentTrack } = require("../../utils/trackCache");
const { EmbedBuilder } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "list",
  description: "Display upcoming tracks",
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

    // Pagination in the future

    const currentTrack = getCurrentTrack(message.guild.id);

    const next10Tracks = queue.tracks.toArray().slice(0, 10);

    const response = [
      `🎤 Now Playing: **[${currentTrack.title}](${currentTrack.url})** (${currentTrack.duration})`,
      ,
      next10Tracks.length > 0
        ? [
            "📃 Upcoming Tracks:",
            ...next10Tracks.map((track, index) =>
              track?.title
                ? `${index + 1}. **[${track.title}](${track.url})** (${
                    track.duration
                  })`
                : `${index + 1}. **[Unknown Track]**`
            ),
          ].join("\n")
        : "❌ No more tracks in the queue.",
    ].join("\n");

    embed.setDescription(response);
    await reply(message, { embeds: [embed] });
  },
};
