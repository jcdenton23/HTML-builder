const { createReadStream, createWriteStream } = require('fs');
const { join, extname } = require('path');
const { readdir } = require('fs/promises');

const bundlePath = join(__dirname, 'project-dist', 'bundle.css');
const writable = createWriteStream(bundlePath, 'utf-8');

async function mergeStream(p1, p2) {
  const link = join(p1, p2);
  const files = await readdir(link, { withFileTypes: true });
  const cssFiles = files.filter((file) => extname(file.name) === '.css');

  cssFiles.forEach((file) => {
    if (file.isFile()) {
      const readable = createReadStream(join(link, file.name), 'utf-8');
      readable.on('data', (chunk) => writable.write(chunk));
    } else {
      mergeStream(link, file.name);
    }
  });
}

mergeStream(__dirname, 'styles');

/*
 + После завершения работы скрипта в папке project-dist должен находиться файл bundle.css 
 содержащий стили из всех файлов папки styles.
 + При добавлении/удалении/изменении файлов стилей в папке styles и повторном запуске скрипта
  файл bundle.css перезаписывается и содержит актуальные стили.
 + Любые файлы имеющие расширение отличное от css или директории игнорируются.
 + Стили находящиеся в файле bundle.css созданном в процессе сборки не должны быть повреждены.

 Самопроверка: 20/20 баллов
*/
