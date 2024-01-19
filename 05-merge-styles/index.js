const path = require('path');
const fs = require('fs').promises;

const bundlerCssPath = path.resolve(__dirname, 'project-dist');
const originCssPath = path.resolve(__dirname, 'styles');

const initBuild = async () => {
  try {
    const files = await fs.readdir(originCssPath, { withFileTypes: true });
    await fs.writeFile(path.join(bundlerCssPath, 'bundle.css'), '');

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(originCssPath, file.name);
        const extension = path.extname(filePath);
        const isCss = extension === '.css';

        if (isCss) {
          const content = await fs.readFile(filePath);
          await fs.appendFile(path.join(bundlerCssPath, 'bundle.css'), content);
        }
      }),
    );

    console.log('Built successfully..');
  } catch (error) {
    console.error('Creation error:', error);
  }
};

initBuild();
