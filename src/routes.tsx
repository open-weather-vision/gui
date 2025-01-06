import React from 'react';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
    {
        "path": "/",
        "element": React.createElement(require('./pages/layout').default),
        "children": [
            {
                "path": "admin",
                "element": React.createElement(require('./pages/admin/layout').default),
                "children": [
                    {
                        "path": "account",
                        "element": React.createElement(require('./pages/admin/account/page').default)
                    },
                    {
                        "path": "",
                        "element": React.createElement(require('./pages/admin/page').default)
                    },
                    {
                        "path": "stations",
                        "element": React.createElement(require('./pages/admin/stations/page').default)
                    },
                    {
                        "path": "theme",
                        "element": React.createElement(require('./pages/admin/theme/page').default)
                    }
                ]
            },
            {
                "path": "",
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
                        "path": "",
                        "element": React.createElement(require('./pages/weather-station/page').default)
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
        ]
    }
];

export default routes;