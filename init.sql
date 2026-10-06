CREATE TABLE if NOT EXISTS books (
 id SERIAL PRIMARY KEY,
 title VARCHAR(100) NOT NULL,
 genre VARCHAR(50),
 published_year INT,
 author_id INT REFERENCES authors(id)
);

CREATE TABLE if NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);


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



