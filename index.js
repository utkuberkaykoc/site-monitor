const fetch = require('node-fetch');

/**
 * Checks if a website is available.
 * @param {string} url - The website URL to check.
 * @param {string} [webhookURL] - Optional Discord Webhook URL for notifications.
 * @param {number} [intervalSeconds] - Interval in seconds (min 30).
 * @param {number} [loopCount] - Number of times to check (max 50).
 * @returns {Promise<void>}
 */
async function isSiteAvailable(url, webhookURL = null, intervalSeconds = null, loopCount = null) {
  // Eğer saniye veya loopCount yoksa sadece 1 kez çalışsın
  if (!intervalSeconds && !loopCount) {
    await checkOnce(url, webhookURL);
    return;
  }

  // Saniye 30'dan küçükse 30 yap, loop 50'den büyükse 50 yap
  intervalSeconds = intervalSeconds ? Math.max(intervalSeconds, 30) : null;
  loopCount = loopCount ? Math.min(loopCount, 50) : 3; // Eğer loopCount verilmemişse 3 yap

  console.log(`🔄 Checking ${url} every ${intervalSeconds} seconds, repeating ${loopCount} times.`);

  let count = 0;

  const checkWebsite = async () => {
    await checkOnce(url, webhookURL);
    count++;

    if (count >= loopCount) {
      console.log(`✅ Finished checking ${url} ${loopCount} times.`);
      clearInterval(interval);
    }
  };

  // İlk kontrolü hemen yap
  checkWebsite();

  // Eğer saniye verilmişse, belirli aralıklarla tekrar kontrol et
  if (intervalSeconds) {
    const interval = setInterval(checkWebsite, intervalSeconds * 1000);
  }
}

/**
 * Runs a single check on a website.
 * @param {string} url - Website URL.
 * @param {string} [webhookURL] - Optional webhook URL.
 * @returns {Promise<boolean>} - Returns true if site is up.
 */
async function checkOnce(url, webhookURL) {
  try {
    const response = await fetch(url, { method: 'GET' });
    const isUp = response.ok;
    console.log(isUp ? `✅ ${url} is UP!` : `❌ ${url} is DOWN!`);

    if (webhookURL) {
      await sendDiscordNotification(webhookURL, isUp ? `✅ Website is UP: ${url}` : `❌ Website is DOWN: ${url}`);
    }

    return isUp;
  } catch (error) {
    console.log(`❌ ${url} is DOWN!`);
    if (webhookURL) {
      await sendDiscordNotification(webhookURL, `@everyone ❌ Website is DOWN: ${url}`);
    }
    return false;
  }
}

/**
 * Sends a notification to Discord.
 * @param {string} webhookURL - The Discord Webhook URL.
 * @param {string} message - The message to send.
 * @returns {Promise<void>}
 */
async function sendDiscordNotification(webhookURL, message) {
  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    if (response.status === 204) {
      console.log('✅ Discord notification sent successfully!');
    } else {
      console.error('❌ Failed to send Discord notification:', response.statusText);
    }
  } catch (error) {
    console.error('❌ Error sending Discord notification:', error.message);
  }
}

module.exports = {
  isSiteAvailable
};
