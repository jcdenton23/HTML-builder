const { join, extname, parse } = require('path');
const { readdir, mkdir, rmdir, copyFile } = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');

const bundlePath = join(__dirname, 'project-dist');
const mainAssetsPath = join(__dirname, 'assets');
const copyAssetsPath = join(bundlePath, 'assets');

async function createFolder(folder) {
  await rmdir(folder, { recursive: true });
  await mkdir(folder, { recursive: true });
}

async function mergeStyles(p1, p2) {
  const CSSFilePath = join(bundlePath, 'style.css');
  const writable = createWriteStream(CSSFilePath, 'utf-8');
  const link = join(p1, p2);
  const files = await readdir(link, { withFileTypes: true });
  const cssFiles = files.filter((file) => extname(file.name) === '.css');

  cssFiles.forEach((file) => {
    if (file.isFile()) {
      const readable = createReadStream(join(link, file.name), 'utf-8');
      readable.on('data', (chunk) => writable.write(chunk));
    } else {
      mergeStyles(link, file.name);
    }
  });
}

async function copyDirectory(mainLink, copyLink) {
  await createFolder(copyLink);

  const files = await readdir(mainLink, { withFileTypes: true });
  files.forEach(async (file) => {
    if (file.isFile()) {
      await copyFile(join(mainLink, file.name), join(copyLink, file.name));
    } else copyDirectory(join(mainLink, file.name), join(copyLink, file.name));
  });
}

async function replaceHtmlTemplates() {
  const link = join(__dirname, 'template.html');
  const readable = createReadStream(link, 'utf-8');
  const writable = createWriteStream(join(bundlePath, 'index.html'));
  let html = '';

  readable.on('data', async (chunk) => {
    html = chunk;

    const files = await readdir(join(__dirname, 'components'), {
      withFileTypes: true,
    });
    const htmlFiles = files.filter((file) => extname(file.name) === '.html');

    htmlFiles.forEach((file, i) => {
      if (file.isFile()) {
        const readableFile = createReadStream(
          join(__dirname, 'components', file.name)
        );
        const reg = `{{${parse(file.name).name}}}`;
        readableFile.on('data', (chunk) => {
          html = html.replace(reg, chunk);
          if (i === htmlFiles.length - 1) {
            writable.write(html);
          }
        });
      }
    });
  });
}

async function startBuild() {
  await createFolder(bundlePath);
  await mergeStyles(__dirname, 'styles');
  await copyDirectory(mainAssetsPath, copyAssetsPath);
  await replaceHtmlTemplates();
}

startBuild();
