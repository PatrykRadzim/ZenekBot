const { useMainPlayer } = require("discord-player");
const { EmbedBuilder } = require("discord.js");
const { PermissionsBitField } = require("discord.js");
const embedColor = require("../../../config.json").embedColor;
const reply = require("../../utils/reply");

module.exports = {
  name: "play",
  description: "Play a song in a voice channel",
  type: "music",
  callback: async (message, query) => {
    const embed = new EmbedBuilder().setColor(embedColor);
    const player = useMainPlayer();

    if (!query || query.trim() === "") {
      embed.setDescription("❌ Please provide the song name.");
      await reply(message, { embeds: [embed] });
      return;
    }

    const voiceChannel = message.member?.voice?.channel;

    if (!voiceChannel) {
      embed.setDescription(
        "❌ You need to be in a voice channel to play music."
      );
      await reply(message, { embeds: [embed] });
      return;
    }

    const botVoiceChannel = message.guild?.members.me?.voice?.channel;
    if (botVoiceChannel && botVoiceChannel.id !== voiceChannel.id) {
      embed.setDescription(
        "❌ I'm already playing in a different voice channel."
      );
      await reply(message, { embeds: [embed] });
    }

    if (
      !message.guild?.members.me?.permissions.has(
        PermissionsBitField.Flags.Connect
      )
    ) {
      embed.setDescription(
        "❌ I don't have permission to join your voice channel."
      );
      await reply(message, { embeds: [embed] });
      return;
    }

    if (
      !message.guild?.members.me
        ?.permissionsIn(voiceChannel)
        .has(PermissionsBitField.Flags.Speak)
    ) {
      embed.setDescription(
        "❌ I don't have permission to speak in your voice channel."
      );
      await reply(message, { embeds: [embed] });
      return;
    }

    try {
      const result = await player.play(voiceChannel, query, {
        nodeOptions: {
          metadata: { channel: message.channel }, // Store text channel as metadata on the queue
        },
      });

      embed.setDescription(
        `🎶 Added **[${result.track.title}](${result.track.url})** to the queue.`
      );
      await reply(message, { embeds: [embed] });
    } catch (error) {
      if (error.code === "ERR_NO_RESULT") {
        embed.setDescription(`❌ Sorry, unable to find the song "${query}".`);
        await reply(message, { embeds: [embed] });
        return;
      }
      console.error(error);
      embed.setDescription("❌ An error occurred while playing the song.");
      await reply(message, { embeds: [embed] });
    }
  },
};
