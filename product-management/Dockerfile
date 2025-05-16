# Use the NodeJS image from Docker Hub
FROM node:current-alpine3.20

# Setup the working directory
WORKDIR /app

# Copy the package.json file containing information of external modules are used in this project
COPY package*.json ./

# Installed external modules
RUN npm install

# The below command is used to run specific command before the containter startes, it is usually used to setup libraries for the container
# RUN apt-get install curl

# Copy all files of the project into working directory
COPY .. .

# Use port 3000 of the container
EXPOSE 3000

# Run the project (Only have a CMD command in the last file, can use ENTRYPOINT with CMD)
CMD [ "npm", "start" ]
