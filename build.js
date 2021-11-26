// This file supports deployment to gh-pages. Route updates are needed for that.

// pseudocode
// 1. get all html files in their nested folder structure and copy and paste into dist/ dir at repo top level
// 2. replace all anchor `href="/` with `href="/vanilla-flat-white`
const fs = require('fs');
const path = require('path');
// TODO: maybe i need const os = require('os');

const fs = require('fs');
const path = require('path');

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 * ref: https://stackoverflow.com/a/22185855/3931488
 */
const copyRecursiveSync = function (src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

copyRecursiveSync('.', 'dist');
console.log('copy to dist folder is done.');
