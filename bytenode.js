/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const bytenode = require('bytenode');

(async function () {
  const getFiles = (path) => {
    const files = [];
    for (const file of fs.readdirSync(path)) {
      const fullPath = path + '/' + file;
      if (fs.lstatSync(fullPath).isDirectory()) {
        getFiles(fullPath).forEach(function (x) {
          if (x.endsWith('.js')) {
            files.push(file + '/' + x);
          }
        });
      } else if (file.endsWith('.js')) {
        files.push(file);
      }
    }
    return files;
  };
  const rootDir = './dist';
  const files = getFiles(rootDir);
  for (const item of files) {
    const targetFile = `./dist-bytenode/${item}c`;
    const parentDir = path.dirname(targetFile);
    if (!fs.existsSync(parentDir)) {
      shell.mkdir('-p', parentDir);
    }
    // --no-module
    await bytenode.compileFile({
      filename: `${rootDir}/${item}`,
      output: targetFile,
      createLoader: item === 'main.js',
    });
  }
  console.log('Done');
})();
