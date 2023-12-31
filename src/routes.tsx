import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
    {
        "path": "/",
        "element": require('./pages/layout').default(),
        "children": [
            {
                "path": "",
                "element": require('./pages/page').default()
            },
            {
                "path": "test",
                "element": require('./pages/test/page').default()
            },
            {
                "path": "user",
                "element": require('./pages/user/layout').default(),
                "children": [
                    {
                        "path": "",
                        "element": require('./pages/user/page').default()
                    }
                ]
            }
        ]
    }
];

export default routes;