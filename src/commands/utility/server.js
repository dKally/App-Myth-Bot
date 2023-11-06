const { SlashCommandBuilder, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		const { guild } = interaction;

		const embed = {
			title: guild.name,
			fields: [
				{
					name: 'ID do Servidor:',
					value: guild.id,
				},
				{
					name: 'Data de Criação:',
					value: guild.createdAt.toDateString(),
				},
				{
					name: 'Membros Totais:',
					value: guild.memberCount,
				},
			],
			thumbnail:{
						url: guild.iconURL({ dynamic: true, format: 'png' })
					}
			,
			color: 0x9900ff,
		};

		return interaction.reply({embeds:[embed]});
	},
};