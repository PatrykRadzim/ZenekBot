module.exports = async (client, queue) => {
  const textChannel = queue.metadata?.channel;

  if (textChannel) {
    await textChannel.send("The channel is empty, I'm leaving...");
  } else {
    console.warn("No text channel found in queue metadata.");
  }
};
