## Skill 1: Understand the ORM

**1, The video calls Sequelize a "translator". What does it translate, and from what into what?**

Sequelize is like a translator that translate our JS code like objects, methods and models and all that we create, into SQL queries. Then the database and Postgres can understand that and execute it. It can also translate it back from the database into JS so we can understand it. 

**2, What does ORM stand for? What is the "object" and what is the "relational" part?**

Object Relational Mapping.

Object - represent the objects in our code.

Relational - The relational part referes to the relational database like PostgreSQL.

Mapping - is the real translator that makes the database and JS talk togheter.

**3, Write the SQL that Book.findAll() runs. Then write the SQL for Book.findByPk(3).**

Book.findAll() = ``SELECT * FROM Books;``

and

Book.findByPk(3) = ``SELECT * FROM "Books" WHERE "id" = 3;`` (it searches for Primary Key 3)

**4, In new Sequelize(...), what does each of these do: host, port, dialect, logging?**

host: is the host for the database, like localhost if its local on my computer.

port: tells what port the database is listening to.

dialect: tells Sequelize what relational database to comunicate with, like postgres or mysql and so on.

logging: its like console.log that logs the queries into the console, if we want to.

**5, What does sequelize.sync() do? What would sequelize.sync({ force: true }) do, and why should you never use it on a database with real data?**

sequelize.sync() looks at my models and creates the tables into the database if not exists already.

sequelize.sync({ force: true }) does the same as the one above BUT (big but) if the tables already exists, it DELETES them before, and then creates them again. So you should nevere use it on real databases with real important data.

<hr>

<hr>

## Skill 4: Question

**6, Why does the loan date belong in the loans table, and not in books or members?**

in a many-to-many relation between members and books, a book can be borrowed many times by a member eller many members and one member can borrow many books. thats why the loan_date must be in the junction table. 
IF loan_date would be in the books table, the book would only be able to be borrowed one time ever, and if loan_date would be in the members table, the member would only be able to borrow one book ever. 

