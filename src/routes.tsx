import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
    {
        "path": "/",
        "element": require('./pages/page').default()
    },
    {
        "path": "user",
        "element": require('./pages/user/layout').default(),
        "children": [
            {
                "path": "climate",
                "element": require('./pages/user/climate/page').default()
            },
            {
                "path": "forecast",
                "element": require('./pages/user/forecast/page').default()
            },
            {
                "path": "graphs",
                "element": require('./pages/user/graphs/page').default()
            },
            {
                "path": "live",
                "element": require('./pages/user/live/page').default()
            },
            {
                "path": "records",
                "element": require('./pages/user/records/page').default()
            },
            {
                "path": "settings",
                "element": require('./pages/user/settings/page').default()
            }
        ]
    }
];

export default routes;