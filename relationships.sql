-- SKILL 1 --


-- one - to - one
-- one user can have one profile and one profile can have one user.

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (name, email)
VALUES ('Vera Larsson', 'vera@gmail.com'),
('Alexander Larsson', 'alexander@gmail.com');

CREATE TABLE profiles (
id SERIAL PRIMARY KEY,
users_id INT UNIQUE,
bio TEXT,
FOREIGN KEY (users_id) REFERENCES users(id)
);


INSERT INTO users (name, email) VALUES ('Madde', 'Madde@gmail.com');


INSERT INTO profiles (users_id, bio) VALUES (3, 'loves coding');

SELECT * FROM users;

SELECT * FROM profiles;


SELECT users.name, profiles.bio
FROM users
JOIN profiles ON users.id = profiles.users_id;




-- one - to - many --
-- one author can have many books, but a book can only have one author.

CREATE TABLE authors (
id SERIAL PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE books (
id SERIAL PRIMARY KEY,
title VARCHAR(100),
author_id INT,
FOREIGN KEY (author_id) REFERENCES authors(id)
);


INSERT INTO authors (name)
VALUES ('J.K Rowling');

INSERT INTO books (title, author_id)
VALUES ('Harry Potter', 1),
('Fantastic Beasts', 1);


SELECT authors.name, books.title
FROM authors
JOIN books ON authors.id = books.author_id;



--  many - to many --
-- one student can have many courses, and one course can have many students


CREATE TABLE students (
id SERIAL PRIMARY KEY,
name VARCHAR(100)
);


CREATE TABLE courses (
id SERIAL PRIMARY KEY,
title VARCHAR(100)
);

CREATE TABLE student_courses (
student_id INT,
course_id INT,
PRIMARY KEY (student_id, course_id),
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (course_id) REFERENCES courses(id)
);


INSERT INTO students (name) VALUES ('Timon'), ('Pumba');
INSERT INTO courses (title) VALUES ('Drama'), ('History');
INSERT INTO student_courses (student_id, course_id) VALUES (1,1), (1,2), (2,1);


SELECT students.name, courses.title
FROM students
JOIN student_courses ON students.id = student_courses.student_id
JOIN courses ON courses.id = student_courses.course_id;



-- i Tried to brake the code with 

INSERT INTO books (title, author_id) VALUES ('Abook', 111);

-- And i got the errorcode:

-- ERROR:  insert or update on table "books" violates foreign key constraint "books_author_id_fkey"
-- Key (author_id)=(111) is not present in table "authors". 

-- SQL state: 23503
-- Detail: Key (author_id)=(111) is not present in table "authors".

-- Answer: i get this errorcode because of the foreign key that exists 
-- in the books table that demand that every author_id must exist 
-- in the authors table