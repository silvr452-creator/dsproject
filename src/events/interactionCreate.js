export default {
  name: 'interactionCreate',

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        content: 'Команда не найдена.',
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(`Ошибка в команде ${interaction.commandName}:`, error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'Произошла ошибка при выполнении команды.',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'Произошла ошибка при выполнении команды.',
          ephemeral: true,
        });
      }
    }
  },
};