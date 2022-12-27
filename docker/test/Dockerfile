FROM node:18.12.1-bullseye-slim
LABEL maintainer="https://github.com/benidevo"

WORKDIR /app

RUN apt-get update
RUN apt-get -y --no-install-recommends install netcat && apt-get install -y build-essential

COPY --chown=node:node package**.json ./

RUN npm install

EXPOSE 8000

COPY --chown=node:node . .

COPY ./docker/test/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

USER node

ENTRYPOINT [ "/entrypoint.sh" ]