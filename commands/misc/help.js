const discord = require("discord.js");
const { config } = require("../../index.js");

module.exports.execute = async (client, message, args) => {

    const helpCommand = client.commands.get("help").help;
    const embed = new discord.MessageEmbed()
        .setThumbnail(client.user.avatarURL(client.user))
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp();

    if (!args[0]) {

        const categories = [...new Set(client.commands.map(command => command.help.category))];
    
        embed.setTitle(`${client.user.tag} | Command list`);
        embed.setDescription([
            `**Prefix:** \`${config.prefix}\``,
            `<> : Required | [] : Optional`,
            `Use \`${config.prefix}${helpCommand.name} ${helpCommand.usage}\` to view command help with more detail.`
        ].join("\n"));
    
        let categorisedCommands;
    
        for (const category of categories) {
            categorisedCommands = client.commands.filter(cmd => cmd.help.category == category);
            embed.addField(category, categorisedCommands.map(cmd => `\`${cmd.help.name}\``).join(", "));
        }
    
        message.channel.send(embed);
        return;
    }

    const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    if (!command) return this.execute(client, message, []);

    const commandInfo = command.help;
    const aliasesPresent = commandInfo.aliases.length > 0;
    
    embed.setTitle(`${commandInfo.name.toUpperCase()} COMMAND`);
    embed.setDescription(commandInfo.description);
    embed.addField("Usage", `\`${config.prefix}${commandInfo.name}${commandInfo.usage != "" ? ` ${commandInfo.usage}` : ""}\``);
    embed.addField("Aliases", `${aliasesPresent ? commandInfo.aliases.map(alias => `\`${alias}\``).join(", ") : "\`None\`"}`);

    message.channel.send(embed);

}

module.exports.help = {
    name: "help",
    aliases: [],
    category: "Miscellaneous",
    usage: "[command]",
    description: "Need some help with commands because they are too complicated? Look no further! I am here to your aid!"
}