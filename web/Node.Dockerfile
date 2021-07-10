FROM node:lts

ARG TARGET_PATH=/var/www/html

# RUN mkdir ${TARGET_PATH}

VOLUME ${TARGET_PATH}

WORKDIR ${TARGET_PATH}

CMD npm install \
    && npm run watch
