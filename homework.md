## 1, Retrieve hidden data:

### Payload:

OR 1=1

### Query:

SELECT \* FROM products WHERE category = 'Gifts' AND released = 1

### Why:

So the single quote ' ends the string.

The double -- stops the rest of the query, so the last part AND released = 1 disappears.

The OR 1=1 is always true so it basically says to the database "Show the products if the category match OR if this is true" And 1=1 is always true so the database will return all products.

## 2, Login bypass:

### Payload:

administrator'--

### Query:

SELECT \* FROm users WHERE username='administrator' AND password=' '

### Why:

So, the username i type in is administrator'--
the little single quote ' makes the database think that the username string ends there, and the the double -- which means its a comment in SQL so the database ignores whats behind it.

this means that the password-check is gone and never executed by the database, so the database just thinks that the login was successfull and returns a valid user administrator loged in. Poor Database.

## 3, UNION: retrieve data from other tables:

### Payload:

' UNION select username, password from users--

### Query:

SELECT \* FROM products WHERE category = ' ' UNION select username, password from users

### Why:

So, usually you fetch data from one specific table, but with the UNION operator you can put the data together from two different tables showing it as one result.

The single quote ' make the database think the string ends here.

The UNION operator asks the database to fetch the data from the original query and put it toghether with the data from my own query/payload and then i get the username and password in the same result as the original query.

## 4, Determine the number of columns:

### Payload:

' UNION SELECT NULL, NULL, NULL--

### Query:

SELECT \* FROM products WHERE category = ' '

### Why:

When we use UNION operator the columns must be the same amount and the same datatype for both tables.

By using NULL, which fits into all datatypes, the database counts the number of columns in your query/payload and then counts the number of columns in the original query. So by starting at 1 (NULL) and work our way up (NULL, NULL) and add one NULL in every everytime, the database will give you HTTP 500 statuscode for every wrong, but when there is a match the website will be shown as normal, and thats your answer to how many columns there is.

## 5, Find a column containing text:

### Payload:

' UNION SELECT NULL, '8p3vFH', NULL--

### Query:

SELECT \* FROM products WHERE category = ' '

### Why:

When we use the UNION operator, the datatypes must be the same in the columns, so by using the payload ' UNION SELECT NULL, NULL, NULL-- (because we now know there are 3 columns) and change one NULL at a time to the selected string 8p3vFH from the task, we can know which column accepts text. For every wrong datatype-match, the database will not execute the query and the website will show 500 http statuscode, and for the right match, the website will show the result.

## 6, Retrieve multiple values in a single column:

### Payload:

' UNION SELECT NULL, NULL--

' UNION SELECT NULL, 'a'--

' UNION SELECT NULL, username || '~' || password FROM users--

### Querty:

SELECT \* FROM products WHERE category = ' '

### Why:

So the concat operator | | is putting string together so this: username || '~' || password means put them all together into one string that fits into a column. This method tricks the database into thinking there's only one value that fits into one column.
