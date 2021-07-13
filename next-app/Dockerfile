FROM node:lts

ARG TARGET_PATH=/var/www

# RUN mkdir ${TARGET_PATH}

VOLUME ${TARGET_PATH}

WORKDIR ${TARGET_PATH}

CMD npm install \
    && npm run dev
