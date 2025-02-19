const axios = require('axios');

// Kontrol edilecek site URL'leri ve Discord Webhook URL'si
const siteURLs = [
  'https://utku.berkaykoc.net',
  'https://example.com',
  'https://anotherexample.com'
];
const discordWebhookURL = 'DISCORD_WEBHOOK_URL';

async function checkWebsite(url) {
  try {
    const response = await axios.get(url);
    
    if (response.status === 200) {
      console.log(`Website is up and running: ${url}`);
      await sendDiscordNotification(`Website is up and running: ${url}`);
    } else {
      console.error(`Website is down: ${url}`);
      await sendDiscordNotification(`@everyone Website is down: ${url}`);
    }
  } catch (error) {
    console.error(`Error checking website (${url}):`, error.message);
    await sendDiscordNotification(`@everyone Error checking website (${url}): \n${error.message}`);
  }
}

async function sendDiscordNotification(message) {
  try {
    const response = await axios.post(discordWebhookURL, 
      { content: message }, { headers: { 'Content-Type': 'application/json' }
    });
    if (response.status === 204) {
      console.log('Discord notification sent successfully!');
    } else {
      console.error('Failed to send Discord notification:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending Discord notification:', error.message);
  }
}

async function checkAllWebsites() {
  for (const url of siteURLs) {
    await checkWebsite(url);
  }
}

checkAllWebsites();
setInterval(checkAllWebsites, 60000);

/*
        _   _            _               _               _                           _   
  _   _| |_| | ___   _  | |__   ___ _ __| | ____ _ _   _| | _____   ___   _ __   ___| |_ 
 | | | | __| |/ / | | | | '_ \ / _ \ '__| |/ / _` | | | | |/ / _ \ / __| | '_ \ / _ \ __|
 | |_| | |_|   <| |_| |_| |_) |  __/ |  |   < (_| | |_| |   < (_) | (__ _| | | |  __/ |_ 
  \__,_|\__|_|\_\\__,_(_)_.__/ \___|_|  |_|\_\__,_|\__, |_|\_\___/ \___(_)_| |_|\___|\__|
                                                   |___/                                 
*/