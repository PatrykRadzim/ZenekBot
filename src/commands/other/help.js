const { EmbedBuilder } = require("discord.js");
const path = require("path");
const getAllFiles = require("../../utils/getAllFiles");
const pagination = require("../../utils/pagination");
const embedColor = require("../../../config.json").embedColor;

module.exports = {
  name: "help",
  description: "Show all available commands",
  callback: async (message) => {
    const commandFolderPath = path.join(__dirname, "..");
    const commandCategories = ["music", "settings", "other"];

    const pages = [];

    for (const commandCategory of commandCategories) {
      const fullPath = path.join(commandFolderPath, commandCategory);
      const commandFiles = getAllFiles(fullPath, false);

      const commands = commandFiles
        .map((file) => {
          const cmd = require(file);
          return cmd;
        })
        .filter((cmd) => cmd && cmd.name && cmd.description);

      const embed = new EmbedBuilder()
        .setColor(embedColor)
        .setTitle(
          `${
            commandCategory[0].toUpperCase() + commandCategory.slice(1)
          } commands`
        )
        .setDescription(
          commands.length
            ? commands
                .map((cmd) => `🔸**${cmd.name}** - ${cmd.description}`)
                .join("\n\n")
            : "_No commands found._"
        );

      pages.push(embed);
    }

    pagination(message, pages);
  },
};
