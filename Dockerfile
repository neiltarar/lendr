# specify a base image
FROM node:16-alpine3.12
# create and use a working directory in the image
WORKDIR /usr/src/app
# copy required files
COPY package*.json ./
# install packages
RUN npm install
# copy source code
COPY ./client ./client 
COPY ./controllers ./controllers
COPY ./database ./database
COPY ./middleware ./middleware
COPY ./models ./models
COPY ./server.js ./server.js
# expose port 3000 to the host
EXPOSE 3000
# run application
CMD [ "node", "server.js" ]