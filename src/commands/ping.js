import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Проверяет, работает ли бот'),

  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};