const { SlashCommandBuilder, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('limpar')
		.setDescription('Apagar até 99 mensagens.')
		.addIntegerOption(option => option.setName('quantidade').setDescription('Número de mensagems')),
	async execute(interaction) {
		const amount = interaction.options.getInteger('quantidade');

		if (amount < 1 || amount > 99) {
			
			const embed = {
				title: "Você precisa escolher um número de 1 a 99!",
				color: 0x9900ff,
			}

			return interaction.reply({ embeds:[embed], ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			const embed = {
				title: "Ocorreu um erro ao tentar apagar mensagens nesse canal...",
				color: 0x9900ff,
				footer:{
					text:"Se você acha que é um erro, entre em contado com o desenvolvedor do bot: `kaczl`"
				} 
			}
			interaction.reply({ embeds:[embed], ephemeral: true });
		});
		const embed = {
			title: `${amount} Mensagens limpas!`,
			color: 0x9900ff,
			footer: {
				text: 'Não se esqueça de agradecer o tio da limpeza!'
			},
		}
		return interaction.reply({ embeds:[embed], ephemeral: true });
	},
};