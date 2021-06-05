const fs = require('fs');
const argv = process.argv;
const axios = require('axios');
const url = require('url').URL;

const cat = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
};

const webCat = (url) => {
  axios
    .get(url)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

try {
  if (new URL(argv[2]).href) {
    webCat(argv[2]);
  }
} catch {
  try {
    cat(argv[2]);
  } catch (err) {
    console.log(err);
  }
}
