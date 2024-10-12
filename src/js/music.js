const albumlabel = document.getElementById("albumlabel");
const albumart = document.getElementById("album-art");
const song = document.getElementById("song");
const artist = document.getElementById("artist");
const album = document.getElementById("album");
const loader = document.getElementById("loader");
const musicContent = document.getElementById("music-content");

async function getLatestSong() {
    const api = "https://lastfm-last-played.biancarosa.com.br/aidxn_/latest-song";
    try {
        const lsResponse = await fetch(api);
        if (lsResponse.ok) {
            const latestSongJSON = await lsResponse.json();
            if (!latestSongJSON.track["@attr"]) {
                albumlabel.textContent = "Last Listen:";
            } else if (latestSongJSON.track["@attr"].nowplaying) {
                albumlabel.textContent = "Now Playing:";
            } else {
                console.warn("[WARN] Invalid now playing status.");
                albumlabel.textContent = "Last Listen:";
            }

            albumart.src = latestSongJSON.track.image[1]["#text"] || "/img/placeholder.png";
            song.textContent = latestSongJSON.track.name;
            artist.textContent = latestSongJSON.track.artist["#text"];
            album.textContent = latestSongJSON.track.album["#text"];

            loader.classList.add("hidden");
            musicContent.classList.remove("hidden");
        } else {
            console.error(`Error: ${lsResponse.status}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

(async function() {
    await getLatestSong();
})();