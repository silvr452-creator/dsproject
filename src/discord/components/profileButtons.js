import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

import { ButtonIds } from '../../config/constants.js';

export function createFillProfileButton() {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(ButtonIds.FILL_PROFILE)
            .setLabel('Заполнить профиль')
            .setStyle(ButtonStyle.Success),
    );
}