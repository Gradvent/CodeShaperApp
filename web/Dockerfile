FROM composer as composer

CMD composer install

# FROM php:8-apache
FROM php:8

COPY --from=composer /usr/bin/composer /usr/bin/composer

# RUN docker-php-ext-install \
#     pdo_mysql \
#     && a2enmod \
#     rewrite

# ENTRYPOINT [ "php", "artisan", "serve", "--host=localhost" ]

CMD php artisan serve --host="0.0.0.0" --port=80