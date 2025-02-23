#!/usr/bin/env node
const { isSiteAvailable } = require('./index');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Please provide a website URL.');
  process.exit(1);
}

const url = args[0];
const webhookURL = args[1] || null; // Eğer 2. argüman varsa webhook, yoksa null
const intervalSeconds = args[2] ? parseInt(args[2], 10) : null; // Eğer saniye verilmişse onu al, yoksa null
const loopCount = args[3] ? parseInt(args[3], 10) : null; // Eğer loop verilmişse onu al, yoksa null

(async () => {
  await isSiteAvailable(url, webhookURL, intervalSeconds, loopCount);
})();
