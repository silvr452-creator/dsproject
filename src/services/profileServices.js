import { prisma } from "../../prisma/client.js";

export async function getOrCreatePlayer(discordUser, member) {
    let player = await prisma.player.findUnique({
        where: {
            discordUserId: discordUser.id,
        }, 
        include: {
            profile: true,
            channels: true,
        },
    });

    if(!player) {
        player = await prisma.player.create({
            data: {
                discordUserId: discordUser.id,
                nickname: member.displayName,
                lastActivityAt: new Date(),
                profile: {
                    create: {},
                },
            },
            include: {
                profile: true,
                channels: true,
            },
        });
    }
    return player;
}

export async function updateFirstUserProfile(playerId, data) {
    return prisma.profile.update({
        where: {
            playerId,
        },
        data,
    });
}

export async function getProfileByDiscord(discordUserId) {
    return prisma.player.findUnique({
        where: {discordUserId},
        include: {
            profile: true,
            channels: true,
        },
    });
}