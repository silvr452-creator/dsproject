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

  const playStyleInput = new TextInputBuilder()
        .setCustomId('playStyle')
        .setLabel('Стиль игры')
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setPlaceholder('Например: активный, спокойный, командный');

  const notesInput = new TextInputBuilder()
        .setCustomId('notes')
        .setLabel('Дополнительно')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false)
        .setPlaceholder('Любая дополнительная информация');

    modal.addComponents(
        new ActionRowBuilder().addComponents(gearInput),
        new ActionRowBuilder().addComponents(canPlayAtInput),
        new ActionRowBuilder().addComponents(timezoneInput),
        new ActionRowBuilder().addComponents(playStyleInput),
        new ActionRowBuilder().addComponents(notesInput),
    );
    return modal;
}