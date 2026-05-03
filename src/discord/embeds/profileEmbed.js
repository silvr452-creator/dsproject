import { EmbedBuilder } from "discord.js";

export function createProfileEmbed(player) {
    const profile = player.profile;

    return new EmbedBuilder()
        .setTitle(`Профиль игрока ${player.nickname}`)
        .setColor(0x2f80ed)
        .addFields(
            {name: 'Игрок', value:`<@${player.discordUserId}`, inline: true},
            {name: 'Уровень', value: String(player.level), inline: true},
            {name: 'Опыт', value: String(player.totalExp), inline: true},
            {name: 'Статус', value: player.status, inline: true},

            {name: 'Снаряжение', value: profile?.gearText || 'Не указано'},
            {name: 'Когда играет', value: profile?.canPlayAt || 'Не указано', inline: true},
            {name: 'Часовой пояс', value: profile?.timezone || 'Не указано', inline: true},
        )
        .setTimestamp();
}