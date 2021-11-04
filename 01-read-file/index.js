const fs = require('fs');
const path = require('path');
const process = require('process');

const link = path.join(__dirname, 'text.txt');

const readable = fs.createReadStream(link, 'utf-8');
readable.on('data', (chunk) => {
  process.stdout.write(chunk);
});
