# Use an existing docker image as base
FROM node:22-alpine 

# setup working directory
WORKDIR /usr/app

# copy files from local FS to container image FS snapshot &  Download dependencies
COPY package.json package-lock.json ./

RUN npm install


COPY . .

EXPOSE 5173

# Default command
CMD ["npm","run","dev", "--", "--host"]