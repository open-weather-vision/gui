const fs = require('fs');
const updateRoutes = require('./updateRoutes');

fs.watch(__dirname + '/../src/pages', (eventType, filename) => {
    updateRoutes();
})