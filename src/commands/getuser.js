import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('getuser')
        .setDescription('Получить информацию о пользователе')
        .addUserOption(option =>
            option
            .setName('userinfo')
            .setDescription('Получить информацию о другом пользователе')
            .setRequired(false)
        ),
    
    async execute(interaction){
        const user = interaction.options.getUser('userinfo') || interaction.user;

        await interaction.reply({
            content: `Пользователь: ${user.tag}\nID:${user.id}`,
        });
    },
};