const Revolt = require("revolt.js");
const client = new Revolt.Client();
require("dotenv").config();
const { getBrainz, setStatus, setBio } = require("./utils/functions");
const Embed = require("./utils/EmbedBuilder");
const fetch = require("node-fetch")
client.on("ready", async () => {
    if (process.env["SESSION_TOKEN"] === "undefined") console.log(client.session)
    console.log(`READY as ${client.user.username}`)
    if (process.env["BRAINZ_USER"] === "undefined") return;
    await getBrainz();
    setInterval(async () => {
        await getBrainz();
    }, 60000)
});
client.on("message", async (msg)=>{
	if (msg.author.bot || msg.system || !msg.content) return;
	if (!msg.content.startsWith(process.env['PREFIX'])) return;
	const args = msg.content.slice(process.env['PREFIX'].length).trim().split(/ +/)
    	const commandName = args.shift().toLowerCase();
    	if (!commandName) return;
	console.log(msg.author.username+" : "+commandName+  (args[0] ? " : " +args.join(" ") : ""))
	if (commandName == "wave"){
	if (msg.author_id == client.user._id){
		msg.edit({content: args.join(' ')+` ( ^_^)／`})
	}}
	if (commandName == "hug"){
	if (msg.author_id == client.user._id){
		msg.edit({content: args.join(' ')+` (⊃･ᴥ･)つ`})
	}}
	if (commandName == "lenny"){
	if (msg.author_id == client.user._id){
		msg.edit({content: args.join(' ')+` ( ͡° ͜ʖ ͡°)`})
	}}
	if (commandName == "shrug"){
	if (msg.author_id == client.user._id){
		msg.edit({content: args.join(' ')+` ┐(￣ヘ￣)┌`})
	}}
	if (commandName == "me"){
	if (msg.author_id == client.user._id){
		msg.edit({content:`_${args.join(' ')}_`})
	}}
	if (commandName == "bio"){
	if (msg.author_id == client.user._id){
		await setBio(`${args.join(" ")}`).then(res=>console.log(res))
		msg.delete()
	}}
	if (commandName == "flip"){
	if (msg.author_id == client.user._id){
		msg.edit({content: args?.join(' ')+" (╯°□°)╯︵ ┻━┻"})
	}}
	if (commandName == "unflip"){
	if (msg.author_id == client.user._id){
		msg.edit({content: args?.join(' ')+" ┬─┬ノ( º _ ºノ)"})
	}}
	if (commandName == "tenor"){
	if (!args[0]) return;
	if (msg.author_id == client.user._id){
		let url = `https://g.tenor.com/v1/search?q=${args.join("%20")}&key=${process.env['TENOR_KEY']}&limit=4`;
		console.log("a")
		let responce = await fetch(url);
		console.log("a")
		let json =   await responce.json();
		const index = Math.floor(Math.random()* json.results.length);
		console.log(json.results[index].itemurl)
		if (!index || !json.results || !json.results[index].itemurl) return msg.delete();
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
