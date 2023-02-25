# set the base image
FROM node:16-alpine

# set the working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# set environment variable
ENV PORT=3000

# expose the port
EXPOSE 3000

# start the application
CMD ["npm", "start"]
