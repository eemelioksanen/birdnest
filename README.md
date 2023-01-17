This is a web application made for the reaktor 2023 summer developer trainee pre-assignment: https://www.reaktor.com/careers/developer-trainee-summer-2023-6514340002/

## How to run the application
### 1. Run via npm
#### first install the dependencies running `npm install` in `client` and `server` folders
#### if you want to use the production version of the frontend, run `npm run build` in the `client` folder
#### set the `PORT` environmental variable if you wish to use another port than the default `3003`
#### you can then run `npm start` in the `server` folder. If you have built the client, it will be server through `http://localhost:PORT/`
#### you can also start the client normally running `npm start` in the `client` folder

### 2. Deploy via Docker
the repository contains a Docker image that can be used to deploy the application.
