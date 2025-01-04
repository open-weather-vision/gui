# gui

This package contains the open-weather-vision graphical user interface. It can be run as frontend application inside a browser or as electron desktop application.

## Starter guide for developers

*Prerequisites*:
1. [NodeJS](https://nodejs.org/en)
2. _env-cmd_ (install using `npm i -g env-cmd`)

### Running the application

#### As web application
- in development mode: `npm run web:dev`
- in production mode: `npm run web:build && npm run web:start`

#### As electron desktop application
- in development mode: `npm run electron:dev`
- in production mode: `npm run electron:build && npm run electron:start`

### Understanding the project structure

#### /src/components
In this folder we define all components that are used across the whole application.

#### /src/pages
In this folder we define all pages a user can enter via links.
The folder structure represents the logical website structure. A `page.tsx` represents a visible endpoint. E.g. a `page.tsx` inside `/src/pages/hello/world` refers to `localhost:3000/hello/world`. 
If you define a `layout.tsx` inside a folder, all `page.tsx` files in subfolders will get wrapped inside the defined component.

#### /src/languages
In this folder a .json file is defined for each supported language. Yes, the gui support multiple languages! The language can be switched easily by the user.

#### /src/img
In this folder all images and icons that are imported via imports (`import { ReactComponent as IconName } from "../../img/icon_name.svg"`) are located.

#### /src/util
In this folder other files that support development are located. Currently there is the `updatesRoutes.js` file, which recursively reads the `src/pages` directory to create the _routes.tsx_ file which defines the website hierarchical structure.

#### Environment files
There are environment files for each application type (electron, web) and environment type (development, production). If you want environment specific behaviour you may use the these files to define environment variables. Remember to prefix them with `REACT_APP_`.