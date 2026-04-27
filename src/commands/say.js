import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Возвращает вам ваш текст')
        .addStringOption(option =>
            option
            .setName('text')
            .setDescription('Текст, который бот отправит')
            .setRequired(true)
        ),

    async execute(interaction) {
        const text = interaction.options.getString('text', true);

        await interaction.reply({
            content: `Ты написал: ${text}`,
        });
    },
};