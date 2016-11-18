'use strict';

const fs = require('mz/fs');
const path = require('path');
const bytes = require('bytes');

exports.listDir = function* (parent, deep, root) {
  /* istanbul ignore else */
  if (deep > 0) {
    root = root || parent;
    const files = yield fs.readdir(parent);
    const result = [];
    for (const file of files) {
      /* istanbul ignore if */
      if (file[0] === '.' || file.indexOf('node_modules') === 0) continue;

      const filePath = path.join(parent, file);
      const info = yield fs.stat(filePath);
      const item = {
        label: `${file} (${bytes(info.size, { decimalPlaces: 0 })})`,
        parent,
        path: path.relative(root, filePath),
        size: info.size,
        modified: info.mtime,
        created: info.ctime,
      };

      if (info.isDirectory()) {
        item.type = 'directory';
        item.label = file;
        item.children = yield exports.listDir(path.join(parent, file), deep - 1, root);
      }
      result.push(item);
    }
    result.sort(x => !x.type);
    return result;
  }
};

exports.readFile = function* (file, root) {
  const filePath = path.resolve(root, file);
  const content = yield fs.readFile(filePath, 'utf-8');
  return {
    path: file,
    content,
  };
};
