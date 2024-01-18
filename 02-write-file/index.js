const path = require('path');
const fs = require('fs').promises;
const { stdout, stdin } = process;

const writeFileAsync = async (filePath, data) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
  });
};

const appendFileAsync = async (filePath, data) => {
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err;
  });
};

const readAndCheckFileAsync = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  const lines = data.split('\r\n');
  const lastWord = lines[lines.length - 2];

  if (lastWord === 'exit') {
    process.exit();
  }
};

const main = async () => {
  const filePath = path.resolve(__dirname, 'text.txt');

  try {
    await writeFileAsync(filePath, '');
    stdout.write('Enter message...\n');

    stdin.on('data', async (data) => {
      await appendFileAsync(filePath, data);
      await readAndCheckFileAsync(filePath);
    });

    process.on('SIGINT', () => process.exit());
    process.on('exit', () => stdout.write('Goodbye...'));
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
