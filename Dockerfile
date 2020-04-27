# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV PATH /app/client/node_modules/.bin:$PATH


# add app
COPY . ./

# install app dependencies
RUN yarn install
RUN cd client
RUN yarn install
RUN cd ..

# start app
CMD ["yarn", "start"]
