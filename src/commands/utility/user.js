const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Ver informações de um usuário.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Usuário alvo. (opcional)')
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('target') || interaction.user;

    if (interaction.guild) {
      const member = interaction.guild.members.cache.get(user.id);

      if(user.bot){
        const embed = {
          title: "**" + user.username + "**",
          description: "`O alvo selecionado é um bot.`",
          fields: [
            {
              name: 'ID:',
              value: user.id,
            },
            {
              name: 'Bot Criado em:',
              value: user.createdAt.toLocaleDateString(),
            },
            {
              name: 'Entrou no Servidor em:',
              value: new Date(member.joinedAt).toLocaleDateString(),
            }
          ],
          thumbnail: {
            url: user.displayAvatarURL({ dynamic: true, format: 'png' }),
          },
          color: 0x9900ff,
        };

        return await interaction.reply({ embeds: [embed] });
      }

      if (member) {
        const embed = {
          title: "**" + user.globalName + "**",
          description: "`@" + user.username + "`",
          fields: [
            {
              name: 'ID:',
              value: user.id,
            },
            {
              name: 'Conta Criada em:',
              value: user.createdAt.toLocaleDateString(),
            },
            {
              name: 'Entrou no Servidor em:',
              value: new Date(member.joinedAt).toLocaleDateString(),
            }
          ],
          thumbnail: {
            url: user.displayAvatarURL({ dynamic: true, format: 'png' }),
          },
          color: 0x9900ff,
        };

        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply('Esse usuário não é membro desse servidor.');
      }
    } else {
      await interaction.reply('Esse comando deve ser executado em um servidor.');
    }
  },
};
