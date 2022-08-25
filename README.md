# ProyectoRedis_SolyLuna

Backend API RestFul SQL para la web de la Hostería Sol y Luna.

## Especificaciones

- Backend Framework: NodeJs
- Web Application Framework: Express
- DB engine: MySQL
- ORM: Sequelize

## SetUp

### Instalar dependencias

```cmd
npm install
```

### Configuracion para la conexión con la Base de Datos

Crear archivo ".env" en la raiz del proyecto con el siguiente contenido y llenar los campos 'DB_USERNAME' y 'DB_PASSWORD' con lo apropiado en los entornos Development, Test y Production.

```cmd
#Environment.
NODE_ENV=development
PORT=3001

#Development
DEV_DB_USERNAME=
DEV_DB_PASSWORD=
DEV_DATABASE=solluna
DEV_DB_HOST="127.0.0.1"
DEV_DB_PORT=3306

#Test
TEST_DB_USERNAME=
TEST_DB_PASSWORD=
TEST_DATABASE=solluna_test
TEST_DB_HOST="127.0.0.1"
TEST_DB_PORT=3306

#Production
PROD_DB_USERNAME=
PROD_DB_PASSWORD=
PROD_DATABASE=solluna
PROD_DB_HOST="127.0.0.1"
PROD_DB_PORT=3306

#Email
STAFF_EMAIL=solylunasoporte@gmail.com
STAFF_PASSWORD=solyluna1
```

### Crear Base de Datos

```cmd
npx sequelize-cli db:create
```

### Aplicar migraciones

```cmd
npx sequelize-cli db:migrate
```

### Aplicar seeders

```cmd
npx sequelize-cli db:seed:all
```

## Iniciar servidor

### Development

```cmd
npm run devstart
```

## Iniciar tests

- Configurar la variable de entorno NODE_ENV con el valor 'test' el archivo .env.
- Ejecutar comandos para la creación de la DB, migraciones y seeders si fuese necesario.

```cmd
npm run test
```

## Credenciales staff

username: willymateo<br>
password: dawm2022<br><br>

username: rafaelmontalvo<br>
password: dawm2022<br><br>

username: lizvergara<br>
password: dawm2022<br><br>

username: briggittelopez<br>
password: dawm2022<br><br>
