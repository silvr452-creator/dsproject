import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder() 
        .setName('help1')
        .setDescription('Показывает список команд'),
    
        async execute(interaction, client) {
            const commandList = client.commands.map(cmd => `/${cmd.data.name}`).join('\n');

            await interaction.reply({
                content: `Доступные команды:\n${commandList}`,
                ephemeral: true,
            });
        },
};