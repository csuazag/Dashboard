
FROM node:9.6.1

LABEL version="1.0"
LABEL description="Web app p2"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeApp
COPY . ./

RUN npm install -g

EXPOSE 3000
CMD ng serve