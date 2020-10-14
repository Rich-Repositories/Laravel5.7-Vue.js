## What is included
### Backend
- **Laravel 5.6**
- **Laravel Passport**
- Use uuids instead of integers
- Register, Login, Password reset Api routes
### Frontend
- **Vue** template based on vue-cli 3
- **Vue Router** for routing
- **Vuex** for state management
- **normalizr** for normalizing nested JSON according to a schema
- **Sentry** for Error Tracking
- **Vee-Validate** for form validation
- **axios**
- **tailwindcss** for styling


## How to use
### Clone repository
```sh
$ git clone git@github.com:khoa-ng/vue-laravel5.7.git
```
### Setup Laravel
1. Install Dependencies
    ```sh
    $ cd project_name
    $ composer install
    ```
2. Copy .env
    ```sh
    $ cp .env.example .env
    ```
3. Update .env with your database details and mailtrap account
    ```env
    ...
    DB_DATABASE=DATABASE_NAME
    DB_USERNAME=DATABASE_USER
    DB_PASSWORD=DATABASE_USER_PASSWORD
    ...
    MAIL_USERNAME=MAILTRAP_USERNAME
    MAIL_PASSWORD=MAILTRAP_PASSWORD
    ...
    ```
4. Generate key
    ```sh
    $ php artisan key:generate
    ```
5. Migrate database
    ```sh
    $ php artisan migrate
    ```
6. Install Passport
    ```sh
    $ php artisan passport:install
    ```

### Setup Vue

1. Install Vue dependencies
    ```sh
    $ cd frontend
    $ npm install
    ```
2. Copy .env files
    ```sh
    $ cp .env.development.local.example .env.development.local
    $ cp .env.production.local.example .env.production.local
    ```
3.  Update .env files VUE_APP_API_URL variable

## Run

### Server
If you dont have any local server running use `php artisan serve` while being on project root folder to start a development server at localhost:8000.

### Frontend

- Run using `vue ui`.
- or run by typing `npm run serve` inside `frontend` folder.

## Build
- Run command using `vue ui`.
- Or run `npm run build`.

Generated files will be compiled inside laravels `public` folder and index.html will be generated at laravels `resources/views/index.blade.php`
