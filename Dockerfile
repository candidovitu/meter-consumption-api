FROM node:20.17.0-slim

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn --ignore-engines

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start:prod"]