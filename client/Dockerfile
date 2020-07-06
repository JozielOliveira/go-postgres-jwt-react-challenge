FROM node:12.1.0
WORKDIR /app
COPY . ./

RUN yarn install --silent
RUN yarn build
RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]
