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

/*
 + Внутри папки 02-write-file находится 1 файл index.js
 + При выполнении команды node 02-write-file в папке 02-write-file создаётся текстовый файл,
  а в консоль выводится приглашение на ввод текста(На ваш выбор)
 + После ввода текста в каталоге 02-write-file введённый текст должен быть записан в созданный ранее файл.
  Процесс не завершается и ждёт нового ввода.
 + После следующего ввода созданный изначально текстовый файл дополняется новым текстом, 
 процесс продолжает ждать ввод.
 + При нажатии сочетания клавиш ctrl + c или вводе exit в консоль выводится прощальная фраза 
 и процесс завершается.

 Самопроверка: 20/20 баллов
*/
