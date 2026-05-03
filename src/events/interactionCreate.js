import { Events } from 'discord.js';
import {
  getOrCreatePlayer,
  updateFirstUserProfile,
} from '../services/profileServices.js';
import { ButtonIds, ModalIds } from '../config/constants.js';
import { createPlayerProfileChannels } from '../services/channelProvisionService.js';
import { createFillProfileButton } from '../discord/components/profileButtons.js';
import { createFillProfileModal } from '../discord/components/profileModal.js';
import { createProfileEmbed } from '../discord/embeds/profileEmbed.js';
import { getProfileByDiscord } from '../services/profileServices.js';
import { updateProfileMessage } from '../services/profileMessageService.js';
import { prisma } from '../../prisma/client.js';

export default {
  name: Events.InteractionCreate,

  async execute(interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        await command.execute(interaction);
        return;
      }

      if (interaction.isButton()) {
        console.log('Нажата кнопка:', interaction.customId);

        if (interaction.customId === ButtonIds.CREATE_PROFILE) {
          await handleCreateProfileButton(interaction);
          return;
        }

        if (interaction.customId === ButtonIds.FILL_PROFILE) {
          const modal = createFillProfileModal();
          await interaction.showModal(modal);
          return;
        }
      }

      if (interaction.isModalSubmit()) {
        if (interaction.customId === ModalIds.FILL_PROFILE_MODAL) {
          await handleFillProfileModal(interaction);
          return;
        }
      }
    } catch (error) {
      console.error(error);

      const message = {
        content: 'Произошла ошибка при обработке взаимодействия',
        ephemeral: true,
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(message);
      } else {
        await interaction.reply(message);
      }
    }
  },
};

async function handleCreateProfileButton(interaction) {
  
  
  await interaction.deferReply({
    ephemeral: true,
  });

  const player = await getOrCreatePlayer(
    interaction.user,
    interaction.member,
  );

  if (player.channels?.menuChannelId) {
    await interaction.editReply({
      content: `У тебя уже есть профиль: <#${player.channels.menuChannelId}>`,
    });
    return;
  }

  const { menuChannel } = await createPlayerProfileChannels({
    guild: interaction.guild,
    member: interaction.member,
    player,
  });

  const fillProfileButton = createFillProfileButton(false);

  await menuChannel.send({
    content: [
      `Привет, <@${interaction.user.id}>!`,
      '',
      'Это твоё личное меню профиля.',
      'Для начала заполни информацию о себе.',
    ].join('\n'),
    components: [fillProfileButton],
  });

  const updatedPlayer = await getProfileByDiscord(interaction.user.id);

  const profileMessage = await menuChannel.send({
    content: 'Текущий профиль:',
    embeds: [createProfileEmbed(updatedPlayer)],
  });

  await prisma.playerChannels.update({
    where: {
      playerId: player.id,
    },
    data: {
      profileMessageId: profileMessage.id,
    },
  });

  await interaction.editReply({
    content: `Профиль создан: <#${menuChannel.id}>`,
  });
}

async function handleFillProfileModal(interaction) {
  await interaction.deferReply({
    ephemeral: true,
  });

  const player = await getOrCreatePlayer(
    interaction.user,
    interaction.member,
  );

  const gearText = interaction.fields.getTextInputValue('gearText');
  const canPlayAt = interaction.fields.getTextInputValue('canPlayAt');
  const timezone = interaction.fields.getTextInputValue('timezone');

  await updateFirstUserProfile(player.id, {
    gearText,
    canPlayAt,
    timezone,
  });

  await updateProfileMessage(interaction.guild, interaction.user.id);

  await interaction.editReply({
    content: 'Профиль заполнен и сохранен.',
    components: [createFillProfileButton(true)],
  });
}