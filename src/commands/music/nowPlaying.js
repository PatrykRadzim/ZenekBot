const { EmbedBuilder } = require("@discordjs/builders");
const { getCurrentTrack } = require("../../utils/trackCache");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "nowplaying",
  description: "Show currently playing song",
  type: "music",
  callback: async (message) => {
    const track = getCurrentTrack(message.guild.id);

    console.log(track);
    const embed = new EmbedBuilder()
      .setColor(embedColor)
      .setTitle("💿 Now Playing")
      .setDescription(`**[${track.title}](${track.url})** (${track?.duration})`)
      .setImage(track?.thumbnail);

    await reply(message, { embeds: [embed] });
  },
};
