const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (commandName) => {
  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const currentCommand = require(commandFile);
      if (
        // Both in uppercase to make commands case insensitive
        commandName.toUpperCase().trim() === currentCommand.name.toUpperCase()
      )
        return currentCommand;
    }
  }

  return null;
};
