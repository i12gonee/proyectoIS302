/*CREATE DATABASE bd_is;
/*USE bd_is;

/*
-----------CREAR USUARIO Y ASIGARLE TODOS LOS PRIVILEGIOS-----------
CREATE USER 'proyectois'@'localhost' IDENTIFIED BY 'basededatos_is';
GRANT ALL PRIVILEGES ON * . * TO 'proyectois'@'localhost';
FLUSH PRIVILEGES;
*/

/*
Cuando el usuario este creado, podreis acceder escribiendo el siguiente comando en la terminal:
  mysql -u proyectois -p
  <cuando deis enter os pedirá la contraseña>
*/

DROP TABLE participantes_cursos;
DROP TABLE recursos;
DROP TABLE cursos;
DROP TABLE participantes;
DROP TABLE coord_cursos;
DROP TABLE coord_recursos;

CREATE TABLE participantes (
  id_p INT(8) PRIMARY KEY,
  nombre_p VARCHAR(64) NOT NULL,
  mail_p VARCHAR(64) NOT NULL,
  contrasena_p VARCHAR(64) NOT NULL
);

CREATE TABLE coord_cursos (
  id_cc INT(8) PRIMARY KEY,
  nombre_cc VARCHAR(64) NOT NULL,
  mail_cc VARCHAR(64) NOT NULL,
  contrasena_cc VARCHAR(64) NOT NULL
);

CREATE TABLE coord_recursos (
  id_cr INT(8) PRIMARY KEY,
  nombre_cr VARCHAR(64) NOT NULL,
  mail_cr VARCHAR(64) NOT NULL,
  contrasena_cr VARCHAR(64) NOT NULL
);

CREATE TABLE cursos (
  id_curso INT(8) PRIMARY KEY,
  nombre_curso VARCHAR(64) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_final DATE NOT NULL,
  max_inscripciones INT(8) NOT NULL,
  ponente VARCHAR(64) NOT NULL,
  descripcion VARCHAR(64) NOT NULL,
  aula VARCHAR(64) NOT NULL,
  id_cc INT(8)
);

CREATE TABLE recursos (
  recurso VARCHAR(64) PRIMARY KEY,
  id_curso INT(8) NOT NULL,
  id_cr INT(8) NOT NULL
);

CREATE TABLE participantes_cursos (
  participantes_id_p INT(8),
  cursos_id_curso INT(8),
  PRIMARY KEY (participantes_id_p, cursos_id_curso)
);

ALTER TABLE participantes_cursos ADD FOREIGN KEY (participantes_id_p) REFERENCES participantes (id_p);

ALTER TABLE participantes_cursos ADD FOREIGN KEY (cursos_id_curso) REFERENCES cursos (id_curso);

ALTER TABLE cursos ADD CONSTRAINT fk_coord_cursos_cursos FOREIGN KEY (id_cc) REFERENCES coord_cursos (id_cc);

ALTER TABLE recursos ADD CONSTRAINT fk_cursos_recursos FOREIGN KEY (id_curso) REFERENCES cursos (id_curso);

ALTER TABLE recursos ADD CONSTRAINT fk_coord_recursos_recursos FOREIGN KEY (id_cr) REFERENCES coord_recursos (id_cr);

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (18851345, 'Aleix Fuentes', 'aleix@uco.es', '5cxne');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (57133453, 'Lydia Escribano', 'lydia@uco.es', 'v6eax');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (31268078, 'Francisca Machado', 'francisca@uco.es', 'vpc4d');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (75500134, 'Pablo Segarra', 'pablo@uco.es', '5i2gv');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (52892267, 'Alberto Barrera', 'albert@uco.es', 'oopmw');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (18423531, 'Pilar Vivas', 'pilar@uco.es', 'gtnyj');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (25474151, 'Saida Salas', 'saida@uco.es', 'mrvel');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (58352809, 'Consuelo Verdugo', 'consuelo@uco.es', '5aq3p');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (61511588, 'Victor Roca', 'victor@uco.es', 'v7odw');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (94320813, 'Imane Cuevas', 'imane@uco.es', 'y9vm3');


INSERT INTO coord_cursos(id_cc, nombre_cc, mail_cc, contrasena_cc) 
      VALUES (92943376, 'Emilio', 'i12gonee@uco.es', 'emiliocc');

INSERT INTO coord_recursos(id_cr, nombre_cr, mail_cr, contrasena_cr) 
      VALUES (71004647, 'Angela', 'i12gonee@uco.es', 'angelacr');

INSERT INTO participantes(id_p, nombre_p, mail_p, contrasena_p) 
      VALUES (58886431, 'Paco', 'i12almuf@uco.es', 'pacop');

INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc) 
      VALUES (12347865, 'Algebra lineal', '2023-09-01', '2023-10-01', 20, 'Alfonso', 'Curso de Algebra', 'B1', 92943376);

INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc) 
      VALUES (12549987, 'IS', '2023-09-05', '2023-10-05', 50, 'Emilio', 'Curso de IS', 'B2', 92943376);

INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc) 
      VALUES (16745567, 'POO', '2023-09-10', '2023-12-05', 50, 'Paco', 'Curso de IS', 'B6', 92943376);

INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc) 
      VALUES (16778567, 'Cálculo', '2023-09-08', '2023-05-10', 100, 'Alfonso', 'Curso de cálculo', 'P10', 92943376);

INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc) 
      VALUES (16790567, 'IP', '2023-09-10', '2023-12-05', 200, 'Salinas', 'Curso de introducción a la programación', 'P2', 92943376);

INSERT INTO cursos(id_curso, nombre_curso, fecha_inicio, fecha_final, max_inscripciones, ponente, descripcion, aula, id_cc) 
      VALUES (17690567, 'Física', '2023-10-10', '2023-12-05', 200, 'Salinas', 'Curso de física', 'P9', 92943376);
