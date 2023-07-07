# Use the official Node runtime as a parent image
FROM node:14

# Set working directory in the Docker image
WORKDIR /usr/src/app

# Add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json to Docker image
COPY package*.json ./

# Install application dependencies
RUN npm install
RUN npm install react-scripts@4.0.3 -g

# Copy the rest of the application to Docker image
COPY . .

# Expose the port app runs on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
