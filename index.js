const Revolt = require("revolt.js");
const client = new Revolt.Client();
require("dotenv").config();
const { getBrainz, setStatus } = require("./utils/functions");
const Embed = require("./utils/EmbedBuilder");
const fetch = require("node-fetch")
client.on("ready", async () => {
    if (process.env["SESSION_TOKEN"] === "undefined") console.log(client.session)
    await getBrainz().then(res => {
        console.log(res)
    })
    setInterval(async () => {
        await getBrainz().then(res => {
            console.log(res)
        })
    }, 60000)
});
client.on("message", async (msg)=>{
	if (msg.author.bot || msg.system || !msg.content) return;
	if (!msg.content.startsWith("-")) return;
	const args = msg.content.slice("-".length).trim().split(/ +/);
    	const commandName = args.shift().toLowerCase();
    	if (!commandName) return;
	if (commandName == "tenor"){
	if (!args[0]) return;
	if (msg.author_id == process.env['USER_ID']){
		let url = `https://g.tenor.com/v1/search?q=${args.join("%20")}&key=${process.env['TENOR_KEY's]}&limit=4`;
		console.log("a")
		let responce = await fetch(url);
		console.log("a")
		let json =   await responce.json();
		const index = Math.floor(Math.random()* json.results.length);
		console.log(json.results[index].itemurl)
		if (!index || !json.results || !json.results[index].itemurl) return;
		console.log("a")
		msg.edit({content: `[ ](${json.results[index].itemurl})`});
		console.log("a")
		}
	}
})

if (process.env["SESSION_TOKEN"] === "undefined") {
    return client.login({ email: process.env["EMAIL"], password: process.env["PASSWORD"] })
} else {
    if (process.env["SESSION_TOKEN"]) return client.useExistingSession({ "token": process.env.SESSION_TOKEN })
}
