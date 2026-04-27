import { Events } from "discord.js";
import { ButtonIds, ModalIds } from "../config/constants.js";
import { getOrCreatePlayer, updateFirstUserProfile } from "../services/profileServices.js";
import { createPlayerProfileChannels } from "../services/channelProvisionService.js";
import { createFillProfileButton } from "../discord/components/profileButtons.js";
import { createFillProfileModal } from "../discord/components/profileModal.js";

export const name = Events.InteractionCreate;

export async function execute(interaction) {
  try {
    if(interaction.isChatInputCommand()){
      const command = interaction.client.command.get(interaction.commandName);

      if(!command) return;

      await command.execute(interaction);
      return;
    }

    if(interaction.isButton()){
      if(interaction.customId === ButtonIds.CREATE_PROFILE) {
        await handleCreateProfileButton(interaction);
        return;
      }
      if(interaction.customId === ButtonIds.FILL_PROFILE){
        const modal = createFillProfileModal();
        await interaction.showModal(modal);
        return;
      }
    }
    if(interaction.isModalSubmit()){
      if(interaction.customId === ModalIds.FILL_PROFILE_MODAL){
        await handleCreateProfileModal(interaction);
        return;
      }
    }
  } catch (error){
    console.error(error);

    const message = {
      content: 'Произошла ошибка при обработке взаимодействия',
      ephemeral: true,
    };

    if(interaction.replied || interaction.deferred) {
      await interaction.followUp(message);
    } else {
      await interaction.reply(message);
    }
  }
}

async function handleCreateProfileButton(interaction) {
  await interaction.deferReply({
    ephemeral:true
  });
  
  const player = await getOrCreatePlayer(interaction.user, interaction.member);
  
  if(player.channels?.menuChannelId) {
    await interaction.editReply({
      content: `У тебя уже есть профиль: <#${player.channels.menuChannelId}>`,
    });
    return;
  }

  const {menuChannel} = await createPlayerProfileChannels({
    guild: interaction.guild,
    member: interaction.member,
    player,
  });

  const fillProfileButton = createFillProfileButton();

  await menuChannel.send({
    content: [
      `Привет, <@${interaction.user.id}>!`,
      '',
      'Это твоё личное меню профиля.',
      'Для начала заполни информацию о себе.',
    ].join('\n'),
    components: [fillProfileButton],
  });

  await interaction.editReply({
    content: `Профиль создан: <#${menuChannel.id}`,
  });

}

async function handleFillProfileModal(interaction) {
  await interaction.editReply({
    ephemeral: true,
  });

  const player = await interaction.getOrCreatePlayer(interaction.user, interaction.member);
  const gearText = interaction.fields.getTextInputValue('gearText');
  const canPlayAt = await interaction.fields.getTextInputField('gearText');
  const timezone = interaction.fields.getTextInputValue('timezone');
  const playStyle = interaction.fields.getTextInputValue('playStyle');
  const notes = interaction.fields.getTextInputValue('notes') || null;

  await updateFirstUserProfile(player.id, {
    gearText,
    canPlayAt,
    timezone,
    playStyle,
    notes,
  });

  await interaction.editReply({
    content: 'Профиль заполнен и сохранен.',
  });
}

export default {
  name: 'interactionCreate',

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        content: 'Команда не найдена.',
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(`Ошибка в команде ${interaction.commandName}:`, error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'Произошла ошибка при выполнении команды.',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'Произошла ошибка при выполнении команды.',
          ephemeral: true,
        });
      }
    }
  },
};