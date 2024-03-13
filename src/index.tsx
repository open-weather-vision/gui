import React from "react";
import {
	createBrowserRouter,
	createHashRouter,
	RouterProvider,
} from "react-router-dom";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ReactDOM from "react-dom/client";

let router;
if (process.env.REACT_APP_TYPE === "electron") {
	console.log("hash rounter");
	router = createHashRouter(require("./routes").default);
} else {
	console.log("browser rounter");
	router = createBrowserRouter(require("./routes").default);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
