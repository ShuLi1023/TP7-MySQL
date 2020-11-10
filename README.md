# TP7-MySQL
1)	Tests
Now that everything works for the test part, we expect you to write tests! Add the needed tests for your API actions and for the WeiClinic.
You can test nominal cases only; you don’t need to write tests for technical errors

2)	MySQL Database management
Using Docker, you can easily add a MySQL database in your workstation. The provided database db_alteredCarbon (if you follow the documentation) contains two tables:
-	CorticalStacks: contains all the created stacks in your Clinic
-	Envelopes: contains all the created envelopes in your Clinic
Login and password to access the database are root, port number is 3306 (default for MySQL).
Now, you will have to access the database to create, read, update and delete information. Every time we start/call your API, we expect the data to match the content of your database.

If you encounter a problem with Docker, you can install MySQL 5 (not 8!) on your own and setup the database yourself. The provided sql files will create the database and the tables, and add a few rows inside them. They are exactly what we used to configure the Docker container.

Remember: the database should not be called for a unit test! Follow the advices provided from the PowerPoint.
