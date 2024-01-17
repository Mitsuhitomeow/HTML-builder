const path = require('path');
const fs = require('fs');

const readStream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf8',
);

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {
  readStream.close();
});

readStream.on('error', (err) => {
  console.error('error', err);
});
