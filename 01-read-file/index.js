const fs = require('fs');
const path = require('path');
const process = require('process');

const link = path.join(__dirname, 'text.txt');

const readable = fs.createReadStream(link, 'utf-8');
readable.on('data', (chunk) => {
  process.stdout.write(chunk);
});

/*
 + Внутри папки 01-read-file находятся 2 файла index.js и text.txt
 + При выполнении команды node 01-read-file в корневом каталоге репозитория в консоль
  выводится содержимое файла text.txt.
 + В коде не должны быть использованы синхронные методы чтения файла.
 + Чтение файла должно происходить с помощью ReadStream.

 Самопроверка: 20/20 баллов
*/
