const path = require('path');
const fs = require('fs').promises;

const originDirPath = path.resolve(__dirname, 'files');
const copyDirPath = path.resolve(__dirname, 'files-copy');

const copyDir = async () => {
  try {
    const files = await fs.readdir(originDirPath);
    await fs.mkdir(copyDirPath, { recursive: true });

    await Promise.all(
      files.map(async (file) => {
        const originFilePath = path.join(originDirPath, file);
        const copyFilePath = path.join(copyDirPath, file);

        await fs.copyFile(originFilePath, copyFilePath);
      }),
    );

    console.log('Copying was successful.');
  } catch (err) {
    console.error('Copy error:', err);
  }
};

copyDir();
