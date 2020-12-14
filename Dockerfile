FROM node:14.15.1

ENV PORT 3000

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package*.json .
RUN yarn

# Bundle app source
COPY . .

RUN npm run build
EXPOSE 3000

CMD [ "yarn", "start" ]