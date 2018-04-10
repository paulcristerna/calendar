CREATE TABLE users (
  id mediumint(7) AUTO_INCREMENT,
  name varchar(50),
  lastname varchar(25),
  user varchar(25),
  photo varchar(25),
  birthday varchar(25),
  password varchar(25),
  date timestamp DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE calendar (
  id mediumint(7) AUTO_INCREMENT,
  user mediumint(7),
  photo varchar(25),
  description varchar(25),
  date timestamp DEFAULT NOW(),
  PRIMARY KEY (id)
);