# Star-Wars-Eurostar


proyecto de prueba para Eurostar Mediagroup

Para una correcta instalación clonar el proyecto entero de githuab:
https://github.com/pedropasquin/Eurostar-SW

Se necesita como requisito disponer de MongoDB en local (localhost:27017)

dentro de la carpeta principal ejecutamos npm -install para que nos instale todas las dependecias del proyecto
entramos en la carpeta frontend/
ejecutamos:
yarn
o
yarn install
Con esto instalamos las dependencias del front de React


Tecnologías utilizadas:

React para el Front
Node y Mongo para el Back

Nos creamos el directorio de la aplicación, en nuestro caso "Star Wars Eurostar", accedemos a el y lanzamos 
el comando en un terminal npm init para crear nuestro package.json donde veremos las dependencias que va a contener
nuestro proyecto.


Vamos a detallar las dependencias que hemos utilizado para este proyecto:

1.- **Express** —> Es un framework para crear nuestra **API REST** (npm install express)

2.- **bcrypt** —> Es una libreria para encriptar contraseñas (npm install bcrypt-nodejs)

3.- **body-parser** —> Para parsear los datos que nos lleguen por POST a JSON y poder trabajar con objetos dentro de nuestro código (npm install body-parser)

4.- **connect-multiparty** —> Nos permite subir ficheros con Node a traves de file desde nuestro formulario, en nuestra aplicación lo utilizaremos para subir la foto de los concursantes (npm install connect-multiparty)

5.- **jwt-simple** —> Se utiliza para la autenticación con tokens (npm install jwt-simple)

6.- **mongoose** —> Nos simplificara mucho nuestro trabajo de MongoDB dentro node (npm install mongoose)

7.- ¿mongoose-pagination? —> Ya veremos si lo instalamos

8.- Nodemon —> (npm i -D nodemon) Dependencia solo en desarrollo

Creacion de la BBDD

MongoDB

añadimos la siguiente línea a nuestro package.json:

    "scripts": {  "start": "nodemon index.js"

De esta forma solo con ejecutar npm start en nuestro terminal arrancara nodemon y se conectar´a nuestra BBDD 
recientemente creada

BACK

Creamos una carpeta models donde se van a encontrar nuestras entidades
Creamos una carpeta controller donde se van a encontrar nuestros controladores
Creamos una carpeta routes para detallar las diferentes rutas/End Points que vamos a utilizar

FRONT

Creamos una carpeta frontend donde alojaremos la parte front en React
Apesar que al añadir un concursante nos pida una imagen, no me ha dado tiempo a implementar 
esta función del todo, debemos meter cualquier valor.


Dependencias

npm install  axios react-router-dom —> Instalamos axios para el consumo de nuestra API y router para la navegación
entre pantallas


# Eurostar-SW
