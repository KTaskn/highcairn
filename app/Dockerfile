FROM php:7.3-fpm

ENV HOME /root

RUN apt-get update
RUN apt-get install --yes --no-install-recommends git
RUN apt-get install --yes --no-install-recommends unzip
RUN docker-php-ext-install pdo_mysql

COPY ./php.ini /usr/local/etc/php/php.ini

# install Composer(PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV PATH $PATH:$HOME/.composer/vendor/bin

WORKDIR /var/www

# install Laravel
RUN composer global require laravel/installer