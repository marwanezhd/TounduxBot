const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES] });

const TOKEN = 'MTEwNTk4Mjk0Nzg4ODIwNTkyNg.Gi30OB.h_Jq7BlFx-REGEBFSR7WXw0y7WmnudPNmulyJk';

client.once('ready', () => {
    console.log('Le bot est prêt.');
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const member = newState.member;
    const guild = member.guild;
    
    const purgeRoleName = 'Frère de purge'; // Nom du rôle "Frère de purge"
    const purgeChannelName = 'Appel à la purge'; // Nom du salon "Appel à la purge"
    
    const purgeRole = guild.roles.cache.find(role => role.name === purgeRoleName);
    const purgeChannel = guild.channels.cache.find(channel => channel.name === purgeChannelName && channel.type === 'GUILD_TEXT');

    if (purgeRole && purgeChannel) {
        if (newState.channel && !oldState.channel) { // Vérifie si le joueur a rejoint un salon vocal
            if (member.roles.cache.has(purgeRole.id)) { // Vérifie si le membre a le rôle "Frère de purge"
                purgeChannel.send(`${member.user.username} a rejoint le salon vocal "${newState.channel.name}" ! Mention du rôle <@&${purgeRole.id}>`);
            }
        }
    }
});

client.login(TOKEN);
