import React from 'react';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
    {
        "path": "/",
        "element": React.createElement(require('./pages/page').default)
    },
    {
        "path": "weather-station",
        "element": React.createElement(require('./pages/weather-station/layout').default),
        "children": [
            {
                "path": "climate",
                "element": React.createElement(require('./pages/weather-station/climate/page').default)
            },
            {
                "path": "extremes",
                "element": React.createElement(require('./pages/weather-station/extremes/page').default)
            },
            {
                "path": "forecast",
                "element": React.createElement(require('./pages/weather-station/forecast/page').default)
            },
            {
                "path": "graphs",
                "element": React.createElement(require('./pages/weather-station/graphs/page').default)
            },
            {
                "path": "live",
                "element": React.createElement(require('./pages/weather-station/live/page').default)
            },
            {
                "path": "settings",
                "element": React.createElement(require('./pages/weather-station/settings/page').default)
            },
            {
                "path": "tests",
                "element": React.createElement(require('./pages/weather-station/tests/page').default)
            }
        ]
    }
];

export default routes;