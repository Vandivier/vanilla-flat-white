// This file supports deployment to gh-pages. Route updates are needed for that.

import * as fs from 'fs';
import * as path from 'path';
import * as fsWalk from '@nodelib/fs.walk';

const REGEX_HREF_PREFIX = /href="\//g;

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 * ref: https://stackoverflow.com/a/22185855/3931488
 */
const copyRecursiveSync = function (src, dist) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        fs.mkdirSync(dist);
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dist, childItemName));
        });
    } else {
        fs.copyFileSync(src, dist);
    }
};

copyRecursiveSync('./src', './dist');
console.log('copy to dist folder is done.');

fsWalk.walk('./dist', (error, entries) => {
    entries
        .filter((entry) => entry.dirent.isFile())
        .forEach((entry) => {
            const oldFileContent = fs.readFileSync(path.resolve(entry.path), 'utf8');
            const newFileContent = oldFileContent.replace(REGEX_HREF_PREFIX, `href="/vanilla-flat-white/`);
            fs.writeFileSync(entry.path, newFileContent);
        });
});

console.log('update html within dist is done.');
