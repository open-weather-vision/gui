const fs = require('fs');
const path = require('path');

/**
 * Updates the _src/routes.tsx_ file that defines the website's hierarchical structure
 * by looking inside _src/pages_.
 */
function updateRoutes() {
    const routes = []; // the website's hierarchical structure (RouteObject[] from react-router-dom)

    function addRoutesOfDir(currentDirectory, relativePath, fullPath, layout) {
        // Get all folders and files inside the current directory (dir)
        const pageDirs = fs.readdirSync(currentDirectory);

        // Handle layouts
        if (pageDirs.includes('layout.tsx')) {
            if (layout) {
                // If there already is an active layout, nest the new layout in the current one (add it as children and set it as new active layout)
                const newLayout = {
                    path: relativePath,
                    element: `$React.createElement(require('./pages${fullPath}layout').default)$`,
                    children: []
                };
                layout.children.push(newLayout);
                layout = newLayout;
                relativePath = '';
            } else {
                // If not create a new layout and add it to the routes definition
                layout = {
                    path: relativePath,
                    element: `$React.createElement(require('./pages${fullPath}layout').default)$`,
                    children: []
                };
                relativePath = '';
                routes.push(layout);
            }
        }

        // Handle pages and subdirectories
        pageDirs.forEach((item) => {
            if (item === 'layout.tsx') return; // We already treated the layout.tsx file

            const isDir = fs.statSync(path.join(currentDirectory, item)).isDirectory();
            if (isDir) {
                // If we have a subdirectory go on recursively
                addRoutesOfDir(path.join(currentDirectory, item), item, fullPath + item + '/', layout);
            } else if (item === 'page.tsx') {
                // If we have a page.tsx file create a new page entry
                console.log(`Page: ${fullPath}`)
                const page = {
                    path: relativePath,
                    element: `$React.createElement(require('./pages${fullPath}page').default)$`
                };

                // If we have a layout nest the page in the layout
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