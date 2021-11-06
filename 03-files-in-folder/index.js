const fs = require('fs/promises');
const path = require('path');

const link = path.join(__dirname, 'secret-folder');

async function printFileInformation(file) {
  const fileLink = path.join(link, file);
  const stat = await fs.stat(fileLink);
  const extName = path.extname(file);
  const name = path.basename(file, extName);

  const res = `${name} - ${extName.slice(1)} - ${stat.size / 1024} kb\n`;
  process.stdout.write(res);
}

async function printAllFilesInfo(path) {
  const files = await fs.readdir(path, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      printFileInformation(file.name);
    }
  }
}

printAllFilesInfo(link);
