const { SlashCommandBuilder, MessageEmbed } = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('elo')
        .setDescription('Insira o nome do jogador para ver seu elo.')
        .addStringOption(option =>
            option
                .setName('nome')
                .setDescription('Nome do jogador')
                .setRequired(true)
        ).addStringOption(option =>
            option
                .setName('servidor')
                .setDescription('Escolha um servidor, "/servidores" (opcional)')
        ).addStringOption(option =>
            option
                .setName('jogo')
                .setDescription('Escolha um jogo (opcional)')
                .addChoices(
                    { name: 'League of Legends', value: 'lol' },
                    { name: 'Team Tatics Fight', value: 'tft' },
                )
            ),
          
    async execute(interaction) {
        const embedLoading = {
            title: "Carregando dados...",
            description: "Por favor, aguarde.",
            color: 0x9900ff,
            
        }
        const reply = await interaction.reply({
            embeds: [embedLoading],
        });
        try {
            const target = interaction.options.getString('nome');
            const selectedGame = interaction.options.getString('jogo');
            function selectedGameFunction(){
                if (selectedGame === 'lol') {
                    return 'lol'
                } else if (selectedGame === 'tft') {
                    return 'tft'
                } else {
                    return 'lol'
                }
            }
            
            function getServerOption(interaction) {
                const serverOption = interaction.options.getString('servidor');
                return serverOption || 'br1';
            }
            const server = getServerOption(interaction)

            
            console.log(server)
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();
            await page.goto(`https://blitz.gg/${selectedGameFunction()}/profile/${server}/${target}`);
            console.log(`https://blitz.gg/${selectedGameFunction()}/profile/${server}/${target}`)


            let player = target;

            const topLineText = await page.evaluate(() => {
                const rankElement = document.querySelector('.name');
                const pdlElement = document.querySelector('.points');

                if (rankElement && pdlElement) {
                    const rank = rankElement.textContent.trim();
                    const pdl = pdlElement.textContent.trim();
                    return { rank, pdl };
                } else {
                    return null;
                }
            });

            const winRates = await page.evaluate(() => {
                const winRateElement = document.querySelector('.bottom-line');

                if (winRateElement) {
                    const spans = winRateElement.querySelectorAll('span');
                    const winRateTexts = [];

                    spans.forEach(span => {
                        winRateTexts.push(span.textContent.trim());
                    });

                    return winRateTexts;
                } else {
                    return null;
                }
            });

            await browser.close();

            if (topLineText) {

                const embed = {
                    title: player,
                    color: 0x9900ff,
                    fields:[
                        {
                            name:'Rank Atual:',
                            value: topLineText.rank + ' | ' + topLineText.pdl
                        },{
                            name:'WinRate',
                            value: winRates[0].replace(/[a-zA-Z]/g, '') + ' | ' + winRates[1]
                        }
                    ]
                }
                console.log(embed)

                await reply.edit({
                    embeds: [embed],
                });
            } else {
                const embedNotFound = {
                    title: "Rank não encontrado... =(",
                    description: "Verifique se o nome do player está certo ou se o player realmente existe. Se o erro persistir, entre em contado com o desenvolvedor do bot: kaczl",
                    color: 0x9900ff,
                    
                }
                await reply.edit({
                    embeds: [embedNotFound],
                });
            }
        } catch (error) {
            console.error(error);
            const embedError = {
                title: "Ocorreu algum erro... =(",
                description: "Verifique se o nome do player está certo ou se o player realmente existe. Se o erro persistir, entre em contado com o desenvolvedor do bot: kaczl",
                color: 0x9900ff,
            }
            await interaction.reply({
                embeds: [embedError],
            });
        }
    },
};