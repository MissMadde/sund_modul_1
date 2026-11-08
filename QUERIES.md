**GET authors/1/books**

Executing (default): SELECT "Author"."id", "Author"."name", "Books"."id" AS "Books.id", "Books"."title" AS "Books.title", "Books"."genre" AS "Books.genre", "Books"."published_year" AS "Books.published_year", "Books"."author_id" AS "Books.author_id" FROM "authors" AS "Author" LEFT OUTER JOIN "books" AS "Books" ON "Author"."id" = "Books"."author_id" WHERE "Author"."id" = '1';

Last week i wrote this:
The difference is that last week it only returned the books-array only by author id.
This week with sequelize, even the authours name is returned with the books-array as a whole object with left outer join. 

```
"SELECT books.* FROM books JOIN authors ON books.author_id = authors.id WHERE authors.id = $1",
[id]

```

**GET members/1/loans**

Executing (default): SELECT "Member"."id", "Member"."name", "Books"."id" AS "Books.id", "Books"."title" AS "Books.title", "Books"."genre" AS "Books.genre", "Books"."published_year" AS "Books.published_year", "Books"."author_id" AS "Books.author_id", "Books->Loan"."id" AS "Books.Loan.id", "Books->Loan"."member_id" AS "Books.Loan.member_id", "Books->Loan"."book_id" AS "Books.Loan.book_id", "Books->Loan"."loan_date" AS "Books.Loan.loan_date", "Books->Loan"."returned_at" AS "Books.Loan.returned_at" FROM "members" AS "Member" LEFT OUTER JOIN ( "loans" AS "Books->Loan" INNER JOIN "books" AS "Books" ON "Books"."id" = "Books->Loan"."book_id") ON "Member"."id" = "Books->Loan"."member_id" WHERE "Member"."id" = '1';

Last week I probably would have wrote like this:
And as same as the query above, it only return the loans-array from the members id.
with Left outer join the query returns the whole object with member data and the books the member have loaned. Even if the books are empty it will return the object. 
```
SELECT loans.* FROM loans JOIN members ON loans.member_id = members.id WHERE members.id = $1
```

**1. Does Sequelize use INNER JOIN or LEFT OUTER JOIN for include? Why do you think it chose that?**

Sequelize chooses LEFT OUTER JOIN as a standard for relations like include, because it always wants to return the member or the author even if they dont have any books or loans.


