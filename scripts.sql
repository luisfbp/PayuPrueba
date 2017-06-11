-- AUTHOR: LUIS FELIPE BEJARANO

-- SCHEMA CREATION
CREATE SCHEMA db_store;

USE db_store;
-- TABLE CREATION
CREATE TABLE IF NOT EXISTS db_store.currency (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  shortName VARCHAR(4) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS db_store.product (
  id 			INT NOT NULL AUTO_INCREMENT,
  name 			VARCHAR(45) NOT NULL,
  value 		INT NOT NULL,
  currency_id 	INT NOT NULL,
  PRIMARY KEY (id, currency_id),
  INDEX fk_products_currency_idx (currency_id ASC),
  CONSTRAINT fk_products_currency
    FOREIGN KEY (currency_id)
    REFERENCES db_store.currency (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- INSERTS CURRENCIES
INSERT INTO db_store.currency (shortName, name)
VALUES ('COP', 'Colombian Pesos');

INSERT INTO db_store.currency (shortName, name)
VALUES ('US', 'American Dolars');

INSERT INTO db_store.currency (shortName, name)
VALUES ('MXN', 'Mexican Pesos');

INSERT INTO products (name, value)
VALUES ('Maestro Yoda', 1000);

-- INSERT PRODUCTS
INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Maestro Yoda', 1000, 1);

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Sable laser de plástico', 1000, 1);

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Nave espacial Halcón Milenario', 1000, 1);

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Estrella de la muerte', 1000, 1);

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('R2D2 en fichas de Lego', 1000, 1);

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Jar Jar Binks Gobernador', 1000, 1);