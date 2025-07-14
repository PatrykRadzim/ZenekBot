const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

const reply = require("./reply");

module.exports = async (message, pages, time = 30000) => {
  try {
    if (!message || !pages || pages.length === 0)
      throw new Error("Invalid arguments");

    if (pages.length === 1) {
      return await reply(message, {
        embeds: pages,
      });
    }

    const prevButton = new ButtonBuilder()
      .setCustomId("prev")
      .setEmoji("◀️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);

    const nextButton = new ButtonBuilder()
      .setCustomId("next")
      .setEmoji("▶️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(false);

    const buttons = new ActionRowBuilder().addComponents(
      prevButton,
      nextButton
    );
    let index = 0;

    const currentPage = await message.reply({
      embeds: [pages[index]],
      components: [buttons],
    });

    const collector = await currentPage.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time,
    });

    collector.on("collect", async (m) => {
      await m.deferUpdate();

      if (m.customId === "prev" && index > 0) index--;
      if (m.customId === "next" && index < pages.length - 1) index++;

      if (index === 0) prevButton.setDisabled(true);
      else prevButton.setDisabled(false);

      if (index === pages.length - 1) nextButton.setDisabled(true);
      else nextButton.setDisabled(false);

      await currentPage.edit({
        embeds: [pages[index]],
        components: [buttons],
      });

      collector.resetTimer();
    });

    collector.on("end", async (m) => {
      await currentPage.edit({
        embeds: [pages[index]],
        components: [],
      });
    });

    return currentPage;
  } catch (error) {
    console.log(`Pagination error: ${error}`);
  }
};
