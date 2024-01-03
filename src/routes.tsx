import React from 'react';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
    {
        "path": "/",
        "element": React.createElement(require('./pages/page').default)
    },
    {
        "path": "user",
        "element": React.createElement(require('./pages/user/layout').default),
        "children": [
            {
                "path": "climate",
                "element": React.createElement(require('./pages/user/climate/page').default)
            },
            {
                "path": "extremes",
                "element": React.createElement(require('./pages/user/extremes/page').default)
            },
            {
                "path": "forecast",
                "element": React.createElement(require('./pages/user/forecast/page').default)
            },
            {
                "path": "graphs",
                "element": React.createElement(require('./pages/user/graphs/page').default)
            },
            {
                "path": "live",
                "element": React.createElement(require('./pages/user/live/page').default)
            },
            {
                "path": "settings",
                "element": React.createElement(require('./pages/user/settings/page').default)
            }
        ]
    }
];

export default routes;