FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN make init
EXPOSE 3000
RUN ["npm","start"]