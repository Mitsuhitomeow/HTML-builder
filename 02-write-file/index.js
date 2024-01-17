const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;

fs.writeFile(path.resolve(__dirname, 'text.txt'), '', (err) => {
  if (err) throw err;
});

stdout.write('Enter a message...\n');
stdin.on('data', (data) => {
  fs.appendFile(path.resolve(__dirname, 'text.txt'), data, (err) => {
    if (err) throw err;
  });

  const readStream = fs.createReadStream(
    path.resolve(__dirname, 'text.txt'),
    'utf-8',
  );
  readStream.on('data', (chunk) => {
    let chunkArray = chunk.split('\r\n');
    chunkArray = chunkArray.flat();
    let lastWord = chunkArray[chunkArray.length - 2];

    if (lastWord === 'exit') {
      process.exit();
    }
  });
});
process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Goodbye...'));
