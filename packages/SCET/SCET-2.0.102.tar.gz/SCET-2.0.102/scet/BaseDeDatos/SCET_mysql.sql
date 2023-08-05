-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema scet
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `scet` ;

-- -----------------------------------------------------
-- Schema scet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scet` DEFAULT CHARACTER SET utf8 ;
USE `scet` ;

-- -----------------------------------------------------
-- Table `scet`.`Objetos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Objetos` (
  `idObjetos` INT NOT NULL AUTO_INCREMENT,
  `referencia` VARCHAR(255) NULL DEFAULT NULL,
  `nombre` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idObjetos`),
  UNIQUE INDEX `referencia_Objetos_UNIQUE` (`referencia` ASC));


-- -----------------------------------------------------
-- Table `scet`.`Ubicaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Ubicaciones` (
  `idUbicaciones` INT NOT NULL AUTO_INCREMENT,
  `referencia` VARCHAR(255) NULL DEFAULT NULL,
  `nombre` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idUbicaciones`),
  UNIQUE INDEX `referencia_Ubicaciones_UNIQUE` (`referencia` ASC));


-- -----------------------------------------------------
-- Table `scet`.`Entidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Entidades` (
  `idEntidades` INT NOT NULL AUTO_INCREMENT,
  `referencia` VARCHAR(255) NULL DEFAULT NULL,
  `nombre` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idEntidades`),
  UNIQUE INDEX `referencia_Entidades_UNIQUE` (`referencia` ASC));


-- -----------------------------------------------------
-- Table `scet`.`Empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Empresas` (
  `idEmpresas` INT NOT NULL AUTO_INCREMENT,
  `idEntidades` INT NOT NULL,
  PRIMARY KEY (`idEmpresas`),
  INDEX `fk_Empresas_Entidades_idx` (`idEntidades` ASC),
  CONSTRAINT `fk_Empresas_Entidades`
    FOREIGN KEY (`idEntidades`)
    REFERENCES `scet`.`Entidades` (`idEntidades`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Talleres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Talleres` (
  `idTalleres` INT NOT NULL AUTO_INCREMENT,
  `idUbicaciones` INT NOT NULL,
  `idEmpresas` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idTalleres`),
  INDEX `fk_Talleres_Ubicaciones_idx` (`idUbicaciones` ASC),
  INDEX `fk_Talleres_Empresas_idx` (`idEmpresas` ASC),
  CONSTRAINT `fk_Talleres_Ubicaciones`
    FOREIGN KEY (`idUbicaciones`)
    REFERENCES `scet`.`Ubicaciones` (`idUbicaciones`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Talleres_Empresas`
    FOREIGN KEY (`idEmpresas`)
    REFERENCES `scet`.`Empresas` (`idEmpresas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Caracteristicas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Caracteristicas` (
  `idCaracteristicas` INT NOT NULL AUTO_INCREMENT,
  `idEntidades` INT NOT NULL,
  `tipo` TEXT NULL DEFAULT NULL,
  `valor` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idCaracteristicas`, `idEntidades`),
  INDEX `fk_Caracteristicas_Entidades_idx` (`idEntidades` ASC),
  CONSTRAINT `fk_Caracteristicas_Entidades`
    FOREIGN KEY (`idEntidades`)
    REFERENCES `scet`.`Entidades` (`idEntidades`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Especificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Especificaciones` (
  `idEspecificaciones` INT NOT NULL AUTO_INCREMENT,
  `idObjetos` INT NOT NULL,
  `tipo` TEXT NULL DEFAULT NULL,
  `valor` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idEspecificaciones`),
  INDEX `fk_Especificaciones_Equipos_idx` (`idObjetos` ASC),
  CONSTRAINT `fk_Especificaciones_Equipos`
    FOREIGN KEY (`idObjetos`)
    REFERENCES `scet`.`Objetos` (`idObjetos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Tecnicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Tecnicos` (
  `idTecnicos` INT NOT NULL AUTO_INCREMENT,
  `idEntidades` INT NOT NULL,
  `idEmpresas` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idTecnicos`),
  INDEX `fk_Tecnicos_Entidades_idx` (`idEntidades` ASC),
  INDEX `fk_Tecnicos_Empresas_idx` (`idEmpresas` ASC),
  CONSTRAINT `fk_Tecnicos_Entidades`
    FOREIGN KEY (`idEntidades`)
    REFERENCES `scet`.`Entidades` (`idEntidades`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Tecnicos_Empresas`
    FOREIGN KEY (`idEmpresas`)
    REFERENCES `scet`.`Empresas` (`idEmpresas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Descripciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Descripciones` (
  `idDescripciones` INT NOT NULL AUTO_INCREMENT,
  `idUbicaciones` INT NOT NULL,
  `tipo` TEXT NULL DEFAULT NULL,
  `valor` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idDescripciones`),
  INDEX `fk_Descripciones_Ubicaciones_idx` (`idUbicaciones` ASC),
  CONSTRAINT `fk_Descripciones_Ubicaciones`
    FOREIGN KEY (`idUbicaciones`)
    REFERENCES `scet`.`Ubicaciones` (`idUbicaciones`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Almasenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Almasenes` (
  `idAlmasenes` INT NOT NULL AUTO_INCREMENT,
  `idUbicaciones` INT NOT NULL,
  `idEmpresas` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idAlmasenes`),
  INDEX `fk_Almasenes_Ubicaciones_idx` (`idUbicaciones` ASC),
  INDEX `fk_Almasenes_Empresas_idx` (`idEmpresas` ASC),
  CONSTRAINT `fk_Almasenes_Ubicaciones`
    FOREIGN KEY (`idUbicaciones`)
    REFERENCES `scet`.`Ubicaciones` (`idUbicaciones`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Almasenes_Empresas`
    FOREIGN KEY (`idEmpresas`)
    REFERENCES `scet`.`Empresas` (`idEmpresas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Herramientas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Herramientas` (
  `idHerramientas` INT NOT NULL AUTO_INCREMENT,
  `idObjetos` INT NOT NULL,
  `idEmpresas` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idHerramientas`),
  INDEX `fk_Herramientas_Equipos_idx` (`idObjetos` ASC),
  INDEX `fk_Herramientas_Empresas_idx` (`idEmpresas` ASC),
  CONSTRAINT `fk_Herramientas_Equipos`
    FOREIGN KEY (`idObjetos`)
    REFERENCES `scet`.`Objetos` (`idObjetos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Herramientas_Empresas`
    FOREIGN KEY (`idEmpresas`)
    REFERENCES `scet`.`Empresas` (`idEmpresas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Clientes` (
  `idClientes` INT NOT NULL AUTO_INCREMENT,
  `idEntidades` INT NOT NULL,
  PRIMARY KEY (`idClientes`),
  INDEX `fk_Clientes_Entidades_idx` (`idEntidades` ASC),
  CONSTRAINT `fk_Clientes_Entidades`
    FOREIGN KEY (`idEntidades`)
    REFERENCES `scet`.`Entidades` (`idEntidades`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Entradas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Entradas` (
  `idEntradas` INT NOT NULL AUTO_INCREMENT,
  `idClientes` INT NOT NULL,
  `idEmpresas` INT NOT NULL,
  `fecha` TEXT NULL DEFAULT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idEntradas`),
  INDEX `fk_Entradas_Empresas_idx` (`idEmpresas` ASC),
  INDEX `fk_Entradas_Clientes_idx` (`idClientes` ASC),
  CONSTRAINT `fk_Entradas_Empresas`
    FOREIGN KEY (`idEmpresas`)
    REFERENCES `scet`.`Empresas` (`idEmpresas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Entradas_Clientes`
    FOREIGN KEY (`idClientes`)
    REFERENCES `scet`.`Clientes` (`idClientes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Equipos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Equipos` (
  `idEquipos` INT NOT NULL AUTO_INCREMENT,
  `idObjetos` INT NOT NULL,
  `idClientes` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idEquipos`),
  INDEX `fk_Equipos_Objetos_idx` (`idObjetos` ASC),
  INDEX `fk_Equipos_Clientes_idx` (`idClientes` ASC),
  CONSTRAINT `fk_Equipos_Objetos`
    FOREIGN KEY (`idObjetos`)
    REFERENCES `scet`.`Objetos` (`idObjetos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Equipos_Clientes`
    FOREIGN KEY (`idClientes`)
    REFERENCES `scet`.`Clientes` (`idClientes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Trabajos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Trabajos` (
  `idTrabajos` INT NOT NULL AUTO_INCREMENT,
  `idEquipos` INT NOT NULL,
  `idTalleres` INT NULL DEFAULT NULL,
  `idAlmasenes` INT NULL DEFAULT NULL,
  `idEntradas` INT NOT NULL,
  `fecha` TEXT NULL DEFAULT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idTrabajos`),
  INDEX `fk_Trabajos_Entradas_idx` (`idEntradas` ASC),
  INDEX `fk_Trabajos_Talleres_idx` (`idTalleres` ASC),
  INDEX `fk_Trabajos_Almasenes_idx` (`idAlmasenes` ASC),
  INDEX `fk_Trabajos_Equipos_idx` (`idEquipos` ASC),
  CONSTRAINT `fk_Trabajos_Entradas`
    FOREIGN KEY (`idEntradas`)
    REFERENCES `scet`.`Entradas` (`idEntradas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Trabajos_Talleres`
    FOREIGN KEY (`idTalleres`)
    REFERENCES `scet`.`Talleres` (`idTalleres`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Trabajos_Almasenes`
    FOREIGN KEY (`idAlmasenes`)
    REFERENCES `scet`.`Almasenes` (`idAlmasenes`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Trabajos_Equipos`
    FOREIGN KEY (`idEquipos`)
    REFERENCES `scet`.`Equipos` (`idEquipos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Acciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Acciones` (
  `idAcciones` INT NOT NULL AUTO_INCREMENT,
  `idTecnicos` INT NULL DEFAULT NULL,
  `idHerramientas` INT NULL DEFAULT NULL,
  `idTrabajos` INT NOT NULL,
  `fecha` TEXT NULL DEFAULT NULL,
  `estado` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idAcciones`),
  INDEX `fk_Acciones_Trabajos_idx` (`idTrabajos` ASC),
  INDEX `fk_Acciones_Tecnicos_idx` (`idTecnicos` ASC),
  INDEX `fk_Acciones_Herramientas_idx` (`idHerramientas` ASC),
  CONSTRAINT `fk_Acciones_Trabajos`
    FOREIGN KEY (`idTrabajos`)
    REFERENCES `scet`.`Trabajos` (`idTrabajos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Acciones_Tecnicos`
    FOREIGN KEY (`idTecnicos`)
    REFERENCES `scet`.`Tecnicos` (`idTecnicos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Acciones_Herramientas`
    FOREIGN KEY (`idHerramientas`)
    REFERENCES `scet`.`Herramientas` (`idHerramientas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `scet`.`Contacto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Contacto` (
  `idContacto` INT NOT NULL AUTO_INCREMENT,
  `idEntidades` INT NOT NULL,
  `tipo` TEXT NULL DEFAULT NULL,
  `valor` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idContacto`),
  INDEX `fk_Contacto_Entidades_idx` (`idEntidades` ASC),
  CONSTRAINT `fk_Contacto_Entidades`
    FOREIGN KEY (`idEntidades`)
    REFERENCES `scet`.`Entidades` (`idEntidades`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `scet`.`Informacion_Fiscal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`Informacion_Fiscal` (
  `idInformacion_Fiscal` INT NOT NULL AUTO_INCREMENT,
  `idEntidades` INT NOT NULL,
  `razon_social` TEXT NULL DEFAULT NULL,
  `rif_tipo` TEXT NOT NULL,
  `rif_numero` INT NOT NULL,
  `rif_final` INT NULL DEFAULT NULL,
  `estado` TEXT NULL DEFAULT NULL,
  `ciudad` TEXT NULL DEFAULT NULL,
  `direccion` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idInformacion_Fiscal`),
  INDEX `fk_Informacion_fiscal_Entidades_idx` (`idEntidades` ASC),
  CONSTRAINT `fk_Informacion_fiscal_Entidades`
    FOREIGN KEY (`idEntidades`)
    REFERENCES `scet`.`Entidades` (`idEntidades`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

USE `scet` ;

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Talleres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Talleres` (`idUbicaciones` INT, `idTalleres` INT, `nombre` INT, `referencia` INT, `idEmpresas` INT);

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Tecnicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Tecnicos` (`idTecnicos` INT, `idEntidades` INT, `nombre` INT, `referencia` INT, `idEmpresas` INT);

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Almasenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Almasenes` (`idAlmasenes` INT, `idUbicaciones` INT, `nombre` INT, `referencia` INT, `idEmpresas` INT);

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Herramientas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Herramientas` (`idHerramientas` INT, `idObjetos` INT, `nombre` INT, `referencia` INT, `idEmpresas` INT);

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Clientes` (`idClientes` INT, `idEntidades` INT, `nombre` INT, `referencia` INT);

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Equipos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Equipos` (`idEquipos` INT, `idObjetos` INT, `nombre` INT, `referencia` INT, `idClientes` INT);

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Empresas` (`idEmpresas` INT, `idEntidades` INT, `nombre` INT, `referencia` INT);

-- -----------------------------------------------------
-- Placeholder table for view `scet`.`_Entradas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scet`.`_Entradas` (`idEntradas` INT, `idTrabajos` INT, `idEquipos` INT, `idObjetos` INT, `idClientes` INT, `idEntidades` INT, `cliente` INT, `codigo` INT, `equipo` INT, `serial` INT, `entregado` INT, `estado` INT);

-- -----------------------------------------------------
-- View `scet`.`_Talleres`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Talleres`;
USE `scet`;
-- -----------------------------------------------------
-- View _Talleres
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Talleres AS
SELECT
    b.idUbicaciones,
    a.idTalleres,
    b.nombre,
    b.referencia,
    a.idEmpresas
FROM Talleres AS a
LEFT JOIN Ubicaciones AS b ON (a.idUbicaciones = b.idUbicaciones);

-- -----------------------------------------------------
-- View `scet`.`_Tecnicos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Tecnicos`;
USE `scet`;
-- -----------------------------------------------------
-- View _Tecnicos
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Tecnicos AS
SELECT
    a.idTecnicos,
    b.idEntidades,
    b.nombre,
    b.referencia,
    a.idEmpresas
FROM Tecnicos AS a
LEFT JOIN Entidades AS b ON (a.idEntidades = b.idEntidades);

-- -----------------------------------------------------
-- View `scet`.`_Almasenes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Almasenes`;
USE `scet`;
-- -----------------------------------------------------
-- View _Almasenes
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Almasenes AS
SELECT
    a.idAlmasenes,
    b.idUbicaciones,
    b.nombre,
    b.referencia,
    a.idEmpresas
FROM Almasenes AS a
LEFT JOIN Ubicaciones AS b ON (a.idUbicaciones = b.idUbicaciones);

-- -----------------------------------------------------
-- View `scet`.`_Herramientas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Herramientas`;
USE `scet`;
-- -----------------------------------------------------
-- View _Herramientas
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Herramientas AS
SELECT
    a.idHerramientas,
    b.idObjetos,
    b.nombre,
    b.referencia,
    a.idEmpresas
FROM Herramientas AS a
LEFT JOIN Objetos AS b ON (a.idObjetos = b.idObjetos);

-- -----------------------------------------------------
-- View `scet`.`_Clientes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Clientes`;
USE `scet`;
-- -----------------------------------------------------
-- View _Clientes
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Clientes AS
SELECT
    a.idClientes,
    b.idEntidades,
    b.nombre,
    b.referencia
FROM Clientes AS a
LEFT JOIN Entidades AS b ON (a.idEntidades = b.idEntidades);

-- -----------------------------------------------------
-- View `scet`.`_Equipos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Equipos`;
USE `scet`;
-- -----------------------------------------------------
-- View _Equipos
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Equipos AS
SELECT
    a.idEquipos,
    b.idObjetos,
    b.nombre,
    b.referencia,
    a.idClientes
FROM Equipos AS a
LEFT JOIN Objetos AS b ON (a.idObjetos = b.idObjetos);

-- -----------------------------------------------------
-- View `scet`.`_Empresas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Empresas`;
USE `scet`;
-- -----------------------------------------------------
-- View _Empresas
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Empresas AS
SELECT
    a.idEmpresas,
    b.idEntidades,
    b.nombre,
    b.referencia
FROM Empresas AS a
LEFT JOIN Entidades AS b ON (a.idEntidades = b.idEntidades);

-- -----------------------------------------------------
-- View `scet`.`_Entradas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `scet`.`_Entradas`;
USE `scet`;
-- -----------------------------------------------------
-- View _Entradas
-- -----------------------------------------------------
CREATE  OR REPLACE VIEW _Entradas AS
SELECT
    a.idEntradas,
    b.idTrabajos,
    c.idEquipos,
    d.idObjetos,
    e.idClientes,
    f.idEntidades,
    f.nombre AS cliente,
    f.referencia AS codigo,
    d.nombre  AS equipo,
    d.referencia  AS serial,
    a.estado AS entregado,
    b.estado
FROM Entradas AS a
INNER JOIN Trabajos AS b ON (a.idEntradas = b.idEntradas)
INNER JOIN Equipos AS c ON (b.idEquipos = c.idEquipos)
INNER JOIN Objetos AS d ON (c.idObjetos = d.idObjetos)
LEFT JOIN Clientes AS e ON (a.idClientes = e.idClientes)
LEFT JOIN Entidades AS f ON (e.idEntidades = f.idEntidades);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
