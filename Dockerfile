FROM node:18.13.0

# configure a non-root user
RUN useradd -m appuser
WORKDIR /home/appuser/app

# copy the application source files to home/app and give non-root user ownership
COPY . .
RUN chown appuser -R .

# change to non-root user
USER appuser

# install and build client
WORKDIR /home/appuser/app/client
RUN npm install && npm run build

# install server
WORKDIR /home/appuser/app/server
RUN npm install

# expose the port 3000
EXPOSE 8080

# set the environmental variables
ENV NODE_ENV=production \
  PORT=8080

# run the application
CMD ["node", "index.js"]