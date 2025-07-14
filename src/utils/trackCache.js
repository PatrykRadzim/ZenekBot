// This is a temporary solution in order to get currently playing song in list.js and nowPlaying.js commands,
// because for some reason queue.current.title returns undefined.

const cache = new Map();

function setCurrentTrack(guildId, track) {
  cache.set(guildId, track);
}

function getCurrentTrack(guildId) {
  return cache.get(guildId);
}

module.exports = { setCurrentTrack, getCurrentTrack };
