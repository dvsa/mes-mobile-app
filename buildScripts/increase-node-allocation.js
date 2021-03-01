const fs = require('fs');

const path = 'node_modules/@ionic/app-scripts/bin/ionic-app-scripts.js';

// post install script for updating the ionic-app-scripts.js to up the node allocation
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }
    const result = data
        .replace(/--max-old-space-size=4096/g, '')
        .replace('#!/usr/bin/env node', '#!/usr/bin/env node --max-old-space-size=4096');

    fs.writeFile(path, result, 'utf8', (error) => {
        if (error) return console.log(error);
    });
});
