# Start your image with a node base image
FROM node:lts-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install && npm cache clean --force 



# Copy local directories to the current local directory of our docker image (/app)
COPY . .



EXPOSE 4000

# Start the app using serve command
CMD [ "npm", "run", "start:dev" ]