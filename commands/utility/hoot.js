const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data : new SlashCommandBuilder().setName('hoot').setDescription('Replies with a "Hoot Hoot!" message'),
	async execute(interaction) {
		await interaction.reply('Hoot Hoot!');
	},
};

