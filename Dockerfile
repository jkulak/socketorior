FROM mhart/alpine-node:7.1.0

EXPOSE 8080

RUN mkdir /app
WORKDIR /app
ENV NODE_ENV development

# Add shell aliases
RUN echo 'alias l="ls -la"' >> ~/.bashrc

RUN npm install -g yarn

COPY package.json /app
RUN yarn install --verbose

COPY . /app

CMD ["npm", "start"]
