FROM node:20.5.1
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8082
CMD ["npm","start"]