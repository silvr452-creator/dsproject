import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

import { ModalIds } from '../../config/constants.js';

export function createFillProfileModal() {
    const modal = new ModalBuilder()
        .setCustomId(ModalIds.FILL_PROFILE_MODAL)
        .setTitle('Анкета игрока');
    const gearInput = new TextInputBuilder()
        .setCustomId('gearText')
        .setLabel('Снаряжение')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setPlaceholder('Например: Штурма+15, Гаусс+15, Вязанкка 600 приведы');
    const canPlayAtInput = new TextInputBuilder()
        .setCustomId('canPlayAt')
        .setLabel('Когда можешь играть?')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Например: будни после 19:00');

  const timezoneInput = new TextInputBuilder()
        .setCustomId('timezone')
        .setLabel('Часовой пояс')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Например: МСК');

    modal.addComponents(
        new ActionRowBuilder().addComponents(gearInput),
        new ActionRowBuilder().addComponents(canPlayAtInput),
        new ActionRowBuilder().addComponents(timezoneInput),
    );
    return modal;
}