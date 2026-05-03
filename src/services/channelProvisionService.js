import {
    CategoryChannel,
    ChannelType,
    PermissionFlagsBits,
} from 'discord.js';

import { prisma } from '../../prisma/client.js';
import { botConfig } from '../config/botConfig.js';

export async function createPlayerProfileChannels({guild, member, player}) {
    const categoryName = `Профиль-${member.displayName}`;
    const everyoneRoleId = guild.roles.everyone.id;
    const adminRolesId = botConfig.roles.adminRolesIds;
    const moderatorRolesIds = botConfig.roles.moderatorRolesIds;

    const permissionOverwrites = [{
        id: everyoneRoleId,
        deny: [PermissionFlagsBits.ViewChannel]
    },
    {
        id: member.id,
        allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
        ],
    },
    ...adminRolesId.map(roleId => ({
        id: roleId,
        allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
        ],
    })),
    ...moderatorRolesIds.map(roleId => ({
        id: roleId,
        allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
        ],
    }))
    ];


    const category = await guild.channels.create({
        name: categoryName,
        type: ChannelType.GuildCategory,
        permissionOverwrites,
    });

    const menuChannel = await guild.channels.create({
        name: botConfig.profileCategory.menu,
        type: ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites,
    });

    const playerChannels = await prisma.playerChannels.create({
        data: {
            playerId: player.id,
            categoryChannelId: category.id,
            menuChannelId: menuChannel.id,
        }
    });

    return {
        category,
        menuChannel,
        playerChannels,
    };
}