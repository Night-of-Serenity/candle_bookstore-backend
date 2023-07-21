FROM node:16-alpine
# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json .

RUN npm install

# copy app source code
COPY . .


CMD ["npm","start"]

# dckr_pat_IY7xVh9IvcRIVOFs23kyo0YDdDc