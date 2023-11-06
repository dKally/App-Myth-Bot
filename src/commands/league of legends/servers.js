const { SlashCommandBuilder, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servidores')
        .setDescription('Veja todos os servidores disponiveis para o comando /elo')
        ,
          
    async execute(interaction) {
        const embed = {
            title: "Lista de Servidores",
            color: 0x9900ff,
            fields:[
                {
                    name: "Brasil (BR)",
                    value: "br1"
                },
                {
                    name: "Coreia (KR)",
                    value: "kr"
                },
                {
                    name: "América do Norte (NA)",
                    value: "na1"
                },
                {
                    name: "Europa Oeste (EUW)",
                    value: "euw1"
                },
                {
                    name: "Japão (JP)",
                    value: "jp1"
                },
                {
                    name: "Oceania (OCE)",
                    value: "oc1"
                },
                {
                    name: "Turquia (TR)",
                    value: "tr1"
                },
                {
                    name: "América Latina Sul (LAS)",
                    value: "la2"
                },
                {
                    name: "América Latina Norte (LAN)",
                    value: "la1"
                },
                
            ]
            
        }
        const reply = await interaction.reply({
            embeds: [embed],
        });
        
    },
};