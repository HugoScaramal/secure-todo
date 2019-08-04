FROM node:12-alpine
LABEL author="Hugo Scaramal"

ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME

RUN yarn global add @angular/cli
RUN yarn global add ionic

EXPOSE 4200

USER 1000