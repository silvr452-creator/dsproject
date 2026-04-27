import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
} from 'discord.js';

import { ButtonIds } from '../config/constants.js';

export const data = new SlashCommandBuilder()
    .setName('profile-create')
    .setDescription('Сделать кнопку создания профиля');

export async function execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(ButtonIds.CREATE_PROFILE)
            .setLabel('Создать профиль')
            .setStyle(ButtonStyle.Primary),
    );

    await interaction.reply({
        content: 'Нажмите на кнопку, что-бы создать личный профиль',
        components: [row],
    });
    
}

export default {
    data,
    execute,
};