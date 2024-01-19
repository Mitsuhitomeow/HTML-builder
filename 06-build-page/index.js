const path = require('path');
const fs = require('fs').promises;
const projectPath = path.resolve(__dirname, 'project-dist');

const createDir = async () => {
  try {
    await fs.mkdir(projectPath, { recursive: true });
  } catch (error) {
    console.log('Error create FOLDER..', error);
  }
};

const initHtml = async () => {
  try {
    const templateComponentsPath = path.resolve(__dirname, 'components');
    const templateHtmlPath = path.resolve(__dirname, 'template.html');
    const components = await fs.readdir(templateComponentsPath);
    let indexHtml = await fs.readFile(templateHtmlPath, 'utf-8');

    await Promise.all(
      components.map(async (file) => {
        const extension = path.extname(file);
        const isHtml = extension === '.html';

        if (isHtml) {
          const tag = file.split('.html').join('');
          const content = await fs.readFile(
            path.join(templateComponentsPath, file),
            'utf-8',
          );
          indexHtml = indexHtml.replace(`{{${tag}}}`, content);
        }
      }),
    );

    await fs.writeFile(path.join(projectPath, 'index.html'), indexHtml);
  } catch (error) {
    console.log('Error create HTML file..', error);
  }
};

const initCss = async () => {
  try {
    const templateCssPath = path.resolve(__dirname, 'styles');
    const files = await fs.readdir(templateCssPath);

    await fs.writeFile(path.join(projectPath, 'style.css'), '');
    await Promise.all(
      files.map(async (file) => {
        const extension = path.extname(file);
        const isCss = extension === '.css';

        if (isCss) {
          const content = await fs.readFile(path.join(templateCssPath, file));
          await fs.appendFile(path.join(projectPath, 'style.css'), content);
        }
      }),
    );
  } catch (err) {
    console.error('Error create CSS file..', err);
  }
};

const arrayFilesInDir = async (data, startPath, endingPath) => {
  await Promise.all(
    data.map(async (file) => {
      const start = path.join(startPath, file);
      const end = path.join(endingPath, file);
      await fs.copyFile(start, end);
    }),
  );
};

const copyAssets = async () => {
  try {
    const templateAssetsPath = path.resolve(__dirname, 'assets');
    const projectAssetsPath = path.resolve(__dirname, 'project-dist/assets');
    const dirs = await fs.readdir(templateAssetsPath);

    await fs.mkdir(projectAssetsPath, { recursive: true });
    await Promise.all(
      dirs.map(async (dir) => {
        const endingPath = path.join(projectAssetsPath, dir);
        const startPath = path.join(templateAssetsPath, dir);
        const innerFiles = await fs.readdir(path.join(templateAssetsPath, dir));
        await fs.mkdir(endingPath, { recursive: true });

        arrayFilesInDir(innerFiles, startPath, endingPath);
      }),
    );
  } catch (err) {
    console.log('Error copying ASSETS...', err);
  }
};

const initBuild = async () => {
  try {
    await createDir();
    await initHtml();
    await initCss();
    await copyAssets();

    console.log('project-dist has been successfully...');
  } catch (error) {
    console.error('Error build:', error);
  }
};

initBuild();
