'use strict';

const ul = document.querySelector('.users');
const apiUrl = 'https://wind-bow.glitch.me/twitch-api/';
const streamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

async function addStreamerToList(username = 'freecodecamp') {
  const streamer = {
    username,
    logo: '',
    url: '',
    online: false,
    game: ''
  };

  // Get profile data
  let blob = await fetch(`${apiUrl}/channels/${username}`);
  let json = await blob.json();
  streamer.url = json.url;
  streamer.logo = json.logo;

  // Get currently streaming game
  blob = await fetch(`${apiUrl}/streams/${username}`);
  json = await blob.json();
  if (json.stream !== null) {
    streamer.online = true;
    streamer.game = json.stream.game;
  }

  // Append to DOM
  const toAppend = `
    <li class="streamer ${streamer.online ? 'online' : 'offline'}">
      <a href="${streamer.url}">
        <img src="${streamer.logo}" alt="profileImage">
        <span class="username">${streamer.username}</span>
        <span class="status">${streamer.online ? 'Online' : 'Offline'}</span>
        <span class="game">${streamer.online ? streamer.game : ''}</span>
      </a>
    </li>
  `;

  ul.innerHTML += toAppend;
}

streamers.forEach(streamer => {
  addStreamerToList(streamer);
});
//# sourceMappingURL=app.js.map
