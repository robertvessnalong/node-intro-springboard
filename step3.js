const fs = require('fs');
const argv = process.argv;
const axios = require('axios');
let path;
let output;

const generateNewFile = (data, output) => {
  if (output) {
    fs.writeFile(output, data, 'utf8', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
};

const cat = (path, arg) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    generateNewFile(data, arg);
  });
};

const webCat = (url, arg) => {
  axios
    .get(url)
    .then((res) => {
      generateNewFile(res.data, arg);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

if (argv[2] === '--out') {
  output = argv[3];
  path = argv[4];
} else {
  path = argv[2];
}

if (path.includes('http')) {
  webCat(path, output);
} else {
  cat(path, output);
}
