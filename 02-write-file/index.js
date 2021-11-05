const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const link = path.join(__dirname, 'text.txt');
const writeble = fs.createWriteStream(link, 'utf-8');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.write(
  `Привет! Вы можете ввести свое сообщение:\n(Чтобы выйти нажмите: "CTRL+C" или напишите: "exit"):\n`
);

const close = () => {
  rl.write('До новых встреч!');
  writeble.end();
  rl.close();
};

rl.on('SIGINT', () => close());

rl.on('line', (input) => {
  input === 'exit' ? close() : writeble.write(`${input} \n`);
});
