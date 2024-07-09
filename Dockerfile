# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt for the correct environment
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code
COPY . .

COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Ensure node_modules are not overwritten
VOLUME ["/usr/src/app/node_modules"]

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["/usr/src/app/wait-for-it.sh", "db:5432", "--", "npm", "start"]


