<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# NestJS Typescript starter

## Features

Everything nest js gives out of the box (Hot Reloading, testing with `jest` etc), and

- `.env` based configuration setup using `@nestjs/config`
- JSON based Logging setup using [`Pino`](https://www.npmjs.com/package/pino)
- Per request UUID logging for easier traceability
- Docker setup
- Sample module setup (`health-check`) with unit testing on service, and a sample e2e test.
- AWS SDK integration, sample s3 client as a starting point
- Rate limiting (limit each IP to 100 requests per 15 minutes) using `express-rate-limit`
- OpenAPI/Swagger setup using `@nestjs/swagger`

## TODO

- [ ] Validation pipes using io-ts
- [ ] Firebase integration
- [ ] AWS config file sharing for docker

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app using docker

```bash
docker build -t server . && docker run -p 127.0.0.1:3000:3000 server 
```
<small>`server` is just the image tag name, it could be anything</small>

## Verify if the server is up and running

```bash
~ ❯ curl http://localhost:3000/health-check
{"success":true}
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

