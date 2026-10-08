CREATE TABLE if NOT EXISTS books (
 id SERIAL PRIMARY KEY,
 title VARCHAR(100) NOT NULL,
 genre VARCHAR(50),
 published_year INT,
);

CREATE TABLE if NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

ALTER TABLE books 
ADD COLUMN author_id INT,
ADD CONSTRAINT fk_author 
FOREIGN KEY (author_id) 
REFERENCES authors(id);


INSERT INTO books (title, genre, published_year)
VALUES
('The Hobbit', 'fantasy', 1937),
('1984', 'dystopian', 1949),
('Pippi Longstocking', 'children', 1945),
('The Hunger Games', 'dystopian', 2008);

INSERT INTO authors (name)
VALUES
('Hobbe'),
('Bobbe');



