FROM php:8.1

RUN apt-get update -y && apt-get install -y openssl zip unzip git 

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN chmod +x /usr/local/bin/install-php-extensions; \
    install-php-extensions pdo mbstring pdo_mysql

WORKDIR /var/www/backend-laravel-api
COPY . .
RUN composer install

EXPOSE 8000

RUN php artisan optimize:clear
RUN php artisan config:cache

CMD php artisan serve --host=0.0.0.0