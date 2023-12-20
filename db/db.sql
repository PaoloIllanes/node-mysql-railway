CREATE DATABASE currency_converter_logs;
USE currency_converter_logs;
CREATE TABLE currency_logs(
	  id INT PRIMARY KEY AUTO_INCREMENT,
      curr_from VARCHAR(30),
      curr_to VARCHAR(30),
      quantity INT(20),
      result INT(100)
);