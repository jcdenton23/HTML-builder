const { join } = require('path');
const { readdir, copyFile, mkdir, rmdir } = require('fs/promises');

const mainPath = join(__dirname, 'files');
const copyPath = join(__dirname, 'files-copy');

async function copyDirectory(mainLink, copyLink) {
  await rmdir(copyLink, { recursive: true });
  await mkdir(copyLink, { recursive: true });

  try {
    const files = await readdir(mainLink, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        await copyFile(join(mainLink, file.name), join(copyLink, file.name));
      } else
        copyDirectory(join(mainLink, file.name), join(copyLink, file.name));
    }
    process.stdout.write('Все файлы скопированы.\n');
  } catch {
    process.stdout.write('Произошла ошибка.\n');
  }
}

copyDirectory(mainPath, copyPath);
