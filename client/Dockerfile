FROM node:12.1.0
WORKDIR /app
COPY . ./

RUN yarn install --production=true

RUN yarn build

RUN serve -s build -l 3000

EXPOSE 3000

CMD ["yarn", "start"]
