const axios = require("axios");
const brainz_url = `https://api.listenbrainz.org/1/user/${process.env["BRAINZ_USER"]}/playing-now`
let spotifyURL = `https://spotify-github-profile.vercel.app/api/view?uid=31kvkxiloqtpqox4huatz7ydh2km`
async function setStatus(text, presence) {
    await axios.patch(
        `https://api.revolt.chat/users/@me`,
        {
            status: { text, presence }
        },
        {
            headers: {
                'x-session-token': process.env['SESSION_TOKEN']
            }
        }
    );
};
async function setBio(content) {
    await axios.patch(
        `https://api.revolt.chat/users/@me`,
        {
            profile: { content }
        },
        {
            headers: {
                'x-session-token': process.env['SESSION_TOKEN']
            }
        }
    );
};
async function getBrainz() {
    return axios.get(
        brainz_url
    ).then(async (res) => {
        const presence = "Focus"
        const statusText = `🎶 | ${res.data.payload?.listens[0]?.track_metadata?.track_name || ""} - ${res.data.payload?.listens[0]?.track_metadata?.artist_name || ""}`
        await setStatus(statusText, presence);
        return "Setting Brainz As Status!"
    })
};

async function spotify() {
    return axios.get(
	spotifyURL
    ).then(async (res) => {
        const presence = "Focus"
        const statusText = `🎶 | ${res.data.payload?.listens[0]?.track_metadata?.track_name || ""} - ${res.data.payload?.listens[0]?.track_metadata?.artist_name || ""}`
        //await setStatus(statusText, presence);
        return res.data["artist"]; //"Setting Brainz As Status!"
    })
};
module.exports = {
    getBrainz: getBrainz,
    setBio: setBio,
    spotify: spotify,
    setStatus: setStatus
}
