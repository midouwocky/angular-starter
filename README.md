# Angular Starter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build docker prod image

Run `docker build -t {app-name}:{tag} .` to build the project and create the docker image for it. You can run the projuct by running
`docker run -it -p {output-port}:80 --rm {app-name}:{tag}`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Authentication

JWT authentication is required to access some routes (/content/\*\*), change the mocked Urls in envirenment file to use it with your authentication API.
JWT token is sent if existed with every http request as a Bearer token header.
Use canActivate or canActivateChild with AuthGuard class to apply a security check on the route before access this last one.

## Internationalization

Using ngx-translate, see documentation (https://github.com/ngx-translate/core)

## Code quality

Code quality analysation using TsLint, lint-staged, Prettier, Pretty-quick and Husky to launch a code verification and lint correction before each commit, also a production build before push, find documentation for each liberary below :

- Tslint : https://github.com/palantir/tslint
- Lint-staged : https://github.com/okonet/lint-staged
- Prettier : https://github.com/prettier/prettier
- Pretty-quick : https://github.com/azz/pretty-quick
- Husky : https://github.com/typicode/husky
