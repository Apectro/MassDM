const Discord = require("discord.js")
const { client, config } = require("../index.js")

client.on("ready", () => {

    console.log("|\n|    Advanced MassDM\n|   Made by swirls#000\n|\n| Last Update: 16.6.2020\n|")

    client.user.setActivity(`Advanced MassDM v${config.version}`, { type: "PLAYING" }).catch(console.error);

})