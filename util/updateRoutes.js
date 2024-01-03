const fs = require('fs');
const path = require('path');

function updateRoutes() {
    const routes = [];

    function addRoutesOfDir(dir, relativePath, fullRelativePath, layout) {
        const pageDirs = fs.readdirSync(dir);
        if (pageDirs.includes('layout.tsx')) {
            if (layout) {
                const newLayout = {
                    path: relativePath,
                    element: `$React.createElement(require('./pages${fullRelativePath}layout').default)$`,
                    children: []
                };
                layout.children.push(newLayout);
                layout = newLayout;
                relativePath = '';
            } else {
                layout = {
                    path: relativePath,
                    element: `$React.createElement(require('./pages${fullRelativePath}layout').default)$`,
                    children: []
                };
                relativePath = '';
                routes.push(layout);
            }
        }
        pageDirs.forEach((item) => {
            if (item === 'layout.tsx') return;

            const isDir = fs.statSync(path.join(dir, item)).isDirectory();
            if (isDir) {
                addRoutesOfDir(path.join(dir, item), item, fullRelativePath + item + '/', layout);
            } else if (item === 'page.tsx') {
                console.log(`Page: ${fullRelativePath}`)
                const page = {
                    path: relativePath,
                    element: `$React.createElement(require('./pages${fullRelativePath}page').default)$`
                };
                if (layout) {
                    layout.children.push(page);
                } else {
                    routes.push(page);
                }
            }
        });
    }

    addRoutesOfDir(path.join(__dirname, '../src/pages'), '/', '/', null);

    fs.writeFileSync(__dirname + '/../src/routes.tsx', "import React from 'react';\nimport { RouteObject } from 'react-router-dom';\n\nconst routes: RouteObject[] = " + JSON.stringify(routes, null, 4).replace(/"\$(.*)\$"/g, '$1') + ";\n\nexport default routes;");
}

updateRoutes();

module.exports = updateRoutes;