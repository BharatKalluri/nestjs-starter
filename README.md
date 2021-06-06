<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# An opinionated NestJS Typescript starter

## Features

Everything nest js gives out of the box (Hot Reloading, testing with `jest` etc), and

- A starter `User` mongoose schema with a get/create an endpoint using firebase user data
- JSON based config setup. Sample config at `config.json`
- JSON based Logging setup using [`Pino`](https://www.npmjs.com/package/pino)
- Per request UUID logging for easier traceability
- Docker setup
- Firebase auth setup! Along with decorators which can be used at endpoint levels.
- Sample module setup (`health-check`) with unit testing on service, and a sample e2e test.
- AWS SDK integration, sample s3 client as a starting point
- Rate limiting (pre configured to limit each IP to 100 requests per 15 minutes) using `express-rate-limit`
- OpenAPI/Swagger setup using `@nestjs/swagger`
- Data validation using `class-validator`
- Global exception handlers to capture `ServerError` with error codes and respond to client with corresponding error messages from `errorCodes.json`
- Connected to MongoDB using `@nestjs/mongoose`, using URL from config.
- Codebuild configuration setup (Uses `buildspec.yml` for build configuration and a env variable called `S3_BUCKET` for the bucket to retrieve `config.json` from. Go through the `buildspec.yml` for more information)
- `Procfile` setup for elastic beanstalk to start the nestJS node process at port 8080
- Pre commit hook which runs `tsc` and `prettier`

## TODO

- [ ] share local AWS config file with docker

## Installation

```bash
yarn
```

to set up hooks

```bash
yarn setuphooks
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

