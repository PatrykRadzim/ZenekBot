const { EmbedBuilder } = require("@discordjs/builders");
const { useMainPlayer } = require("discord-player");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "loop",
  description:
    "Loop the queue in different modes (track, queue, autoplay, off)",
  type: "music",
  callback: async (message, args) => {
    const player = useMainPlayer();
    const embed = new EmbedBuilder().setColor(embedColor);

    if (args === "") args = "track";

    let loopMode;
    switch (args.toUpperCase()) {
      case "OFF":
        loopMode = 0;
        break;
      case "TRACK":
        loopMode = 1;
        break;
      case "QUEUE":
        loopMode = 2;
        break;
      case "AUTOPLAY":
        loopMode = 3;
        break;
      default:
        embed.setDescription(
          "❌ Invalid argument for loop. Use one of these: **track**, **queue**, **autoplay**, **off**."
        );
        await reply(message, { embeds: [embed] });
        return;
    }

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

    queue.setRepeatMode(loopMode);

    embed.setDescription(`♾️ Loop mode set to **${args.toLowerCase()}**.`);
    await reply(message, { embeds: [embed] });
  },
};
