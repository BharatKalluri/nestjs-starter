<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# An opinionated NestJS Typescript starter

## Features

Everything nest js gives out of the box (Hot Reloading, testing with `jest` etc), and

- JSON based config setup. Sample config at `config.example.json`
- JSON based Logging setup using [`Pino`](https://www.npmjs.com/package/pino)
- Per request UUID logging for easier traceability
- Docker setup
- Sample module setup (`health-check`) with unit testing on service, and a sample e2e test.
- AWS SDK integration, sample s3 client as a starting point
- Rate limiting (pre configured to limit each IP to 100 requests per 15 minutes) using `express-rate-limit`
- OpenAPI/Swagger setup using `@nestjs/swagger`
- Data validation using `class-validator`
- Global exception handlers to capture `ServerError` with error codes and respond to client with corresponding error messages from `errorCodes.json`
- Connected to MongoDB using `@nestjs/mongoose`, using URL from config.

## TODO

- [ ] share local AWS config file with docker

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running the app using docker

```bash
docker build -t server . && docker run -p 127.0.0.1:8080:8080 server 
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
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

