import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import Command from 'structures/Command'
import { CommandType } from 'structures/enums'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin.'),
  type: CommandType.Fun,
  run: async (client, interaction): Promise<void> => {
    const { user, guild } = interaction
    const member = interaction.inCachedGuild() ? interaction.member : undefined

    const embed = new EmbedBuilder()
      .setTitle('🪙  Coinflip  🪙')
      .setColor(
        guild?.members.me?.displayHexColor ||
          client.user?.hexAccentColor ||
          null,
      )
      .setDescription(
        `I flipped a coin for you, ${member}! It was **${
          Math.round(Math.random()) ? 'heads' : 'tails'
        }**.`,
      )
      .setFooter({
        text: member?.displayName || user.username,
        iconURL: member?.displayAvatarURL() || user.displayAvatarURL(),
      })
      .setTimestamp()

    await client.reply(interaction, { embeds: [embed] })
  },
})
