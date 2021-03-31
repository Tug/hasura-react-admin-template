# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:15.6.0-alpine as build-stage

# set working directory
WORKDIR /app

ENV NODE_ENV production

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

# add app
COPY . ./

COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19

# Copy the nginx.conf
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build/ /usr/share/nginx/html
