const handleCommand = require("../../handlers/handleCommand");

const prefixes = require("../../../config.json").aliases.prefixes;

module.exports = (client, message) => {
  let usedPrefix;
  let prefixCorrect = false;
  for (const prefix of prefixes) {
    // Uppercase to make prefixes case insensitive
    if (message.content.toUpperCase().startsWith(prefix.toUpperCase())) {
      usedPrefix = prefix;
      prefixCorrect = true;
      break;
    }
  }
  if (!prefixCorrect) return;

  if (message.author.bot) return;

  const content = message.content.slice(usedPrefix.length).trim();

  const firstSpace = content.indexOf(" ");

  let commandName, args;
  if (firstSpace === -1) {
    commandName = content;
    args = "";
  } else {
    commandName = content.slice(0, firstSpace);
    args = content.slice(firstSpace + 1);
  }

  handleCommand(client, message, commandName, args);
};
