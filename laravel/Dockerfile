FROM php:8-apache

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN docker-php-ext-install \
    pdo_mysql \
    && a2enmod \
    rewrite

RUN apt-get update && apt-get install -y mariadb-client

# CMD composer install \
#     && apache2-foreground
CMD composer install \
    && php artisan serve --host="0.0.0.0" --port=80
