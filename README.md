This is a web application made for the Reaktor 2023 summer developer trainee pre-assignment.

The application is running on fly.io: https://wandering-fire-3559.fly.dev/

## How to run the application

### 1. Run via npm

First install the dependencies running `npm install` in `client` and `server` folders.

If you want to use the production version of the frontend, run `npm run build` in the `client` folder.

Set the `PORT` environmental variable if you wish to use another port than the default `3003`.

You can then run `npm start` in the `server` folder. If you have built the client, it will be server through `http://localhost:PORT/`.

You can also start the client normally running `npm start` in the `client` folder.

### 2. Deploy via Docker

The repository contains a Docker image that can be used to deploy the application.
