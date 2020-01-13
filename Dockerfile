#############
### build ###
#############

# base image
FROM node:10.16.0 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.1.1

# add app
COPY . /app

# generate build
RUN ng build

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# copy artifact build from the 'build environment'
COPY --from=build /app/dist/angular-starter /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]