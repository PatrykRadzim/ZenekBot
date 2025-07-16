// This is a temporary solution in order to get currently playing song in list.js and nowplaying.js commands, 
// because for some reason queue.current.title returns undefined.

const { setCurrentTrack } = require("../../utils/trackCache");

module.exports = async (client, queue, track) => {
  setCurrentTrack(queue.guild.id, track);
};
