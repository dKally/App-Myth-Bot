const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Pegar avatar do usuário selecionado ou o seu prórpio.')
		.addUserOption(option => option.setName('alvo').setDescription('Usuário alvo.')),
	async execute(interaction) {
		const user = interaction.options.getUser('alvo');
		if (user) return interaction.reply(`Avatar de: ${user.username} ${user.displayAvatarURL()}`);
		return interaction.reply(`Seu avatar: ${interaction.user.displayAvatarURL()}`);
	},
};