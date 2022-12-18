# Aplicación web para la gestión de los cursos de extensión de la Universidad de Córdoba (UCO).

Esta aplicaión forma parte del trabajo final de la asignatura de Ingeniería del Software para el equipo 302 formado por:
Francisco de Paula Algar Muñoz, Ángela de la Encarnación Pedrero y Emilio Gómez Nef.
## Instalación:
Para comenzar a usar la web es necesario disponer de ciertos módulos 
instalados en tu ordenador, estos módulos son:

- MySQL

```bash
    sudo apt install mysql-server
```
- Node JS

```bash
    sudo apt install curl
    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs

```

Una vez ya dispongas de los programas necesarios, accedes a la carpeta del repositorio
'proyectoIS302' en tu terminal y ejecutas el siguiente comando:

```bash
    npm i
```

Con este comando descargarás todos los módulos necesarios para que el sitema funcione
correctamente.

Antes de terminar, es necesario cargar la base de datos en tu sistema, para ello, dirijase
a la ruta:

        proyectoIS302/server/database

Una vez situado en el directorio 'database' ejecute:

        sudo mysql

Cuando ya esté dentro de mysql ejecute los siguientes comandos:

        CREATE USER 'proyectois'@'localhost' IDENTIFIED BY 'basededatos_is';
        GRANT ALL PRIVILEGES ON * . * TO 'proyectois'@'localhost';
        FLUSH PRIVILEGES;
        exit

Esto le permitirá crear el usuario necesario para usar la base de datos.

A partir de ahora cada vez que desee acceder a la base de datos deberá escribir el 
siguiente comando, ejecutelo en su terminal y vuelva a entrar a mysql:

        mysql -u proyectois -p

Cuando ya esté dentro escriba:

        create database bd_is
        source bd_is.sql

Estó hará que se cree toda la base de datos que viene definida en el archivo SQL.

El video tutorial de la página web está en el siguiente enlace;
    https://youtu.be/n6mpCFwNXFc

