// This file supports deployment to gh-pages. Route updates are needed for that.

// TODO: replace all anchor within dist html `href="/` with `href="/vanilla-flat-white`
const fs = require('fs');
const path = require('path');

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
