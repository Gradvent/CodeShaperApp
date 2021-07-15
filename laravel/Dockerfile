FROM php:8-apache

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y mariadb-client \
    build-essential \
    libzip-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libwebp-dev libjpeg62-turbo-dev libpng-dev libxpm-dev \
    libfreetype6 \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl

RUN docker-php-ext-install \
    pdo_mysql \
    zip \
    && a2enmod \
    rewrite

# CMD composer install \
#     && apache2-foreground
CMD composer update --ignore-platform-reqs --no-scripts\
    && cp -n .env.example .env \
    && php artisan key:generate \
    && php artisan config:cache \
    && php artisan migrate \
    && php artisan serve --host="0.0.0.0" --port=8000
