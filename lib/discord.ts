import axios from 'axios';

const DISCORD_API_URL = 'https://discord.com/api/v10';

export async function getDiscordUser(accessToken: string) {
  try {
    const response = await axios.get(`${DISCORD_API_URL}/users/@me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Discord user:', error);
    return null;
  }
}

export async function getServerStats(guildId: string) {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  
  if (!botToken) {
    throw new Error('Missing Discord bot token');
  }

  try {
    const [guild, guildPreview, channels] = await Promise.all([
      axios.get(`${DISCORD_API_URL}/guilds/${guildId}`, {
        headers: { Authorization: `Bot ${botToken}` },
      }),
      axios.get(`${DISCORD_API_URL}/guilds/${guildId}/preview`, {
        headers: { Authorization: `Bot ${botToken}` },
      }),
      axios.get(`${DISCORD_API_URL}/guilds/${guildId}/channels`, {
        headers: { Authorization: `Bot ${botToken}` },
      }),
    ]);

    const textChannels = channels.data.filter((c: any) => c.type === 0).length;
    const voiceChannels = channels.data.filter((c: any) => c.type === 2).length;
    
    const boostLevel = Math.floor(guild.data.premium_subscription_count / 2) || 0;

    return {
      name: guild.data.name,
      icon: guild.data.icon,
      totalMembers: guildPreview.data.approximate_member_count,
      onlineMembers: 0,
      textChannels: textChannels,
      voiceChannels: voiceChannels,
      boostCount: guild.data.premium_subscription_count || 0,
      boostLevel: boostLevel,
    };
  } catch (error) {
    console.error('Error fetching server stats:', error);
    return null;
  }
}
