# SmartPay API

## Description

This is a RESTful API for SmartPay. SmartPay is a point of sale application that allows users to accept payments from their customers and record transaction details.

## Technologies

The following technologies were used in this project:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Requirements

Before starting, you need to create a .env file in the root directory of the project, and provide the environment variables in .env.example file.

Kindly ensure that you are in the root directory before running the following commands.

## Install Dependencies and Run the Application

```bash
docker-compose up
```

## Run Tests

```bash
docker-compose -f docker-compose.test.yml up --build
```

## Stop the Application

```bash
docker-compose down
```
