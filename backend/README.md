Minesweeper Game Backend
========================

> Backend for the classic game of Minesweeper


Requirements
============

* PHP >= 7.1.6
* Composer >= 1.4.2
* Laravel >= 5.4.28
* MySql

Installation
============

1. Create a mysql database named `minesweeper`
2. Set database user and password in `config/database.php` file (mysql section)
3. Change directory to backend folder
4. Execute the following commands:

``` bash
# install dependencies
composer install

# create database tables
php artisan migrate

# generate passport key for authentication
php artisan passport:install

# create .env file
touch .env

# generate base64 key for backend laravel project, add generated key to .env file: APP_KEY=<key>
php artisan key:generate

#clear config cache
php artisan config:clear

```

For detailed explanation on how things work, checkout the [Laravel guide](https://laravel.com/docs/5.4/)