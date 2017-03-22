FROM retosu/mynode:latest

WORKDIR /app/assets

COPY .babelrc .
COPY vendor ./vendor
COPY webpack.config.js .
COPY webpack.config.development.js .
COPY package.json .
COPY assets ./assets

ENTRYPOINT [ "prehook", "npm install", "--" ]

CMD ["npm", "run", "build"]
