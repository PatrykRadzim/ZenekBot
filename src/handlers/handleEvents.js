const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = path.basename(eventFolder);

    client.on(eventName, async (...args) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, ...args);
      }
    });
  }

  // Player events
  const playerEventFolders = getAllFiles(
    path.join(__dirname, "..", "playerEvents"),
    true
  );

  for (const playerEventFolder of playerEventFolders) {
    const playerEventFiles = getAllFiles(playerEventFolder);
    playerEventFiles.sort((a, b) => a > b);

    const playerEventName = path.basename(playerEventFolder);

    client.player.events.on(playerEventName, async (...args) => {
      for (const playerEventFile of playerEventFiles) {
        const playerEventFunction = require(playerEventFile);
        await playerEventFunction(client, ...args);
      }
    });
  }
};
