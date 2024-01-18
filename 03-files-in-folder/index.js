const path = require('path');
const fs = require('fs').promises;
const { stdout } = process;

const main = async () => {
  const folderPath = path.resolve(__dirname, 'secret-folder/');

  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.resolve(folderPath, file.name);
      const stats = await fs.stat(filePath);

      if (stats.isFile()) {
        const expansion = path.extname(file.name).slice(1);
        const fileName = path.basename(file.name, `.${expansion}`);
        const fileSize = stats.size / 1024;
        stdout.write(`${fileName} - ${expansion} - ${fileSize.toFixed(2)}KB\n`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

main();
