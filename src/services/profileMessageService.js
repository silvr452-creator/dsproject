import { prisma } from '../../prisma/client.js';
import { createProfileEmbed } from '../discord/embeds/profileEmbed.js';

export async function updateProfileMessage(guild, discordUserId) {
  const player = await prisma.player.findUnique({
    where: {
      discordUserId,
    },
    include: {
      profile: true,
    },
  });

  if (!player) return;

  if (!player.profileChannelId || !player.profileMessageId) {
    console.log('У игрока нет profileChannelId или profileMessageId');
    return;
  }

  const channel = await guild.channels.fetch(player.profileChannelId).catch(() => null);
  if (!channel) return;

  const message = await channel.messages.fetch(player.profileMessageId).catch(() => null);
  if (!message) return;

  await message.edit({
    embeds: [createProfileEmbed(player)],
  });
}