FROM php:7.3-fpm

ENV HOME /root

RUN apt-get update

RUN apt-get install --yes --no-install-recommends git
RUN apt-get install --yes --no-install-recommends unzip

# install Composer(PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV PATH $PATH:$HOME/.composer/vendor/bin

WORKDIR /var/www

# install Laravel
RUN composer global require laravel/installer