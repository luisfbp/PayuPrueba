-- AUTHOR: LUIS FELIPE BEJARANO

-- SCHEMA CREATION
CREATE SCHEMA db_store;

USE db_store;
-- TABLE CREATION
CREATE TABLE IF NOT EXISTS db_store.currency (
  id 			VARCHAR(4) NOT NULL,
  name 			VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS db_store.product (
  id 			INT NOT NULL AUTO_INCREMENT,
  name 			VARCHAR(45) NOT NULL,
  value 		DECIMAL(15,2) NOT NULL,
  currency_id VARCHAR(4) NOT NULL,
  PRIMARY KEY (id, currency_id),
  INDEX fk_product_currency_idx (currency_id ASC),
  CONSTRAINT fk_product_currency FOREIGN KEY (currency_id) REFERENCES db_store.currency (id) 
	ON DELETE NO ACTION 
    ON UPDATE NO ACTION);
    
CREATE TABLE IF NOT EXISTS db_store.purchase (
  id 				INT NOT NULL AUTO_INCREMENT,
  date_purchage 	DATETIME NOT NULL,
  total 			DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (id));

-- TABLE FOR RELATING A PURCHAGE WITH A PRODUCT
CREATE TABLE IF NOT EXISTS db_store.product_by_purchage (
  product_id 				INT NOT NULL,
  purchase_id 				INT NOT NULL,
  quantity 					INT NOT NULL,
  purchage_product_value 	DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (product_id, purchase_id),
  INDEX fk_product_by_purchage_purchase_idx (purchase_id ASC),
  INDEX fk_product_by_purchage_product_idx (product_id ASC),
  CONSTRAINT fk_product_by_purchage_product FOREIGN KEY (product_id) REFERENCES db_store.product (id) 
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_product_by_purchage_purchase FOREIGN KEY (purchase_id) REFERENCES db_store.purchase (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- INSERTS CURRENCIES
INSERT INTO db_store.currency (id, name)
VALUES ('COP', 'Colombian Pesos');

INSERT INTO db_store.currency (id, name)
VALUES ('US', 'American Dolars');

INSERT INTO db_store.currency (id, name)
VALUES ('MXN', 'Mexican Pesos');

-- INSERT PRODUCTS
INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Maestro Yoda', 75000, 'COP');

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Sable laser de plástico', 35.00, 'US');

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Nave espacial Halcón Milenario', 125000, 'COP');

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Estrella de la muerte', 200, 'US');

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('R2D2 en fichas de Lego', 450, 'MXN');

INSERT INTO db_store.product (name, value, currency_id)
VALUES ('Jar Jar Binks Gobernador', 800, 'MXN');