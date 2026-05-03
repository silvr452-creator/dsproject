import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

import { ButtonIds } from '../../config/constants.js';

export function createFillProfileButton(isProfileFilled = false) {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(
                isProfileFilled
                    ? ButtonIds.UPDATE_PROFILE
                    : ButtonIds.FILL_PROFILE
            )
            .setLabel(
                isProfileFilled
                    ? 'Обновить профиль'
                    : 'Заполнить профиль'
            )
            .setStyle(
                isProfileFilled
                    ? ButtonStyle.Primary
                    : ButtonStyle.Success
            ),
    );
}