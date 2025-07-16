module.exports = async (message, content) => {
  try {
    return await message.reply(content);
  } catch (error) {
    if (error.status === 429) {
      console.warn("⚠️ 429: Too many requests.");
    } else {
      console.error(error);
    }
  }
};
