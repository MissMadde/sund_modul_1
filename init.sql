CREATE TABLE if NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE if NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  genre VARCHAR(50),
  published_year INT,
  author_id INT,
  CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE if NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE if NOT EXISTS loans (
  id SERIAL PRIMARY KEY,
  member_id INT NOT NULL,
  book_id INT NOT NULL,
  loan_date TIMESTAMP NOT NULL,
  returned_at TIMESTAMP,
  CONSTRAINT fk_member FOREIGN KEY (member_id) REFERENCES members(id),
  CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES books(id)
);


INSERT INTO authors (name)
VALUES
('Hobbe'),
('Bobbe');


INSERT INTO books (title, genre, published_year, author_id)
VALUES
('The Hobbit', 'fantasy', 1937, 1),
('1984', 'dystopian', 1949, 1),
('Pippi Longstocking', 'children', 1945, 2),
('The Hunger Games', 'dystopian', 2008, 2);

INSERT INTO members (name) 
VALUES 
('Anna'),
('Alice');



