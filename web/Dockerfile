FROM composer as composer

CMD composer install

FROM php:8-apache as backend

EXPOSE 80

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install \
    pdo_mysql \
    && a2enmod \
    rewrite