
FROM node:10.9.1

LABEL version="1.0"
LABEL description="Web app p2"

ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeApp
COPY . ./

RUN npm install -g
RUN npm install -g @angular/cli 
EXPOSE 3000
CMD ng serve