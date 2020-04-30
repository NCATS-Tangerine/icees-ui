# pull official base image
FROM node:13.12.0-alpine as build-deps

WORKDIR /app

ENV NODE_ENV production

COPY . ./
RUN cd client
RUN yarn install
RUN cd ..

RUN yarn install
RUN yarn build
EXPOSE 4567
CMD ["yarn", "server"]


# # set working directory
# WORKDIR /app
# COPY client/package.json client/yarn.lock ./
# RUN yarn install
# COPY . ./
# RUN yarn build


# # production environment
# FROM node:13.12.0-alpine
# RUN mkdir -p /client/build
# COPY --from=build-deps /app/client/build /client/build
# COPY package.json yarn.lock ./
# RUN yarn install
# # TODO: can we copy everything except the client folder?
# COPY . ./
# ENV NODE_ENV production
# EXPOSE 4567
# CMD ["yarn", "server"]