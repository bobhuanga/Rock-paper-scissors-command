const Discord = require('discord.js')
var count1 = 0;
var count2 = 0;
var count3 = 0;
module.exports = {
    name: 'rps',
    description: "Rock, Paper, Scissors command!",
    async execute(message, args, Discord, client) {

        const newEmbeds = new Discord.MessageEmbed()
            .setTitle('Rock, Paper, Scissors!')
            .setDescription('React to play!')
        let msg = await message.channel.send(newEmbeds)
        await msg.react("🗻")
        await msg.react("📄")
        await msg.react("✂")

        const filter = (reaction, user) => {
            return ['🗻', '📄', '✂'].includes(reaction.emoji.name) && user.id === message.author.id;
        }
        const choices = ['🗻', '📄', '✂']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, { max: 1, time: 60000, error: ["time"] }).then(
            async (collected) => {
                const reaction = collected.first()
                let result = new Discord.MessageEmbed()
                    .setTitle("Result")
                    .addField("Your Choice", `${reaction.emoji.name}`)
                    .addField("Bot's Choice", `${me}`)
                await msg.edit(result)

                if ((me === "🗻" && reaction.emoji.name === "✂") ||
                    (me === "✂" && reaction.emoji.name === "📄") ||
                    (me === "📄" && reaction.emoji.name === "🗻")) {
                    message.reply("You Lost!");
                    count1++;
                } else if (me === reaction.emoji.name) {
                    count2++;
                    return message.reply("It's a tie!");
                } else {
                    count3++;
                    return message.reply("You Won!");
                }

            })
            .catch(collected => {
                message.reply('Process has been canceled, you failed to respond in time.');
            })

    }
}
