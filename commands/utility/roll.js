const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Rolls a dice in NdN format (e.g., 2d6 rolls two six-sided dice).')
		.addStringOption((option) =>
			option.setName('dice').setDescription('The dice to roll in NdN format').setRequired(true),
		),
	async execute(interaction) {
		const dice = interaction.options.getString('dice');
		const dicePattern = /^(\d+)d(\d+)$/;
		const match = dice.match(dicePattern);
		
		if (!match) {
			return interaction.reply('Invalid dice format! Please use NdN format (e.g., 2d6).');
		}
		const numDice = parseInt(match[1], 10);
		const numSides = parseInt(match[2], 10);
		
		if (numDice <= 0 || numSides <= 0) {
			return interaction.reply('Number of dice and sides must be positive integers.');
		}
		
		const rolls = [];
		for (let i = 0; i < numDice; i++) {
			rolls.push(Math.floor(Math.random() * numSides) + 1);
		}
		
		const total = rolls.reduce((a, b) => a + b, 0);
		await interaction.reply(`You rolled: ${rolls.join(', ')} (Total: ${total})`);
	},
};