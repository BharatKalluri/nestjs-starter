FROM node:14.15.1

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json .
RUN yarn

# Bundle app source
COPY . .

RUN yarn build
EXPOSE 8080

CMD [ "yarn", "start" ]
