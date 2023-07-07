# Choose the base image
FROM node:14

# Set working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to Docker image
COPY package*.json ./

# Install dependencies in Docker image
RUN npm install

# Copy the rest of the application to Docker image
COPY . .

# Expose the port app runs on
EXPOSE 5000

# Command to start the application
CMD [ "node", "server.js" ]
