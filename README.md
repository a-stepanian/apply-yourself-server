Learnings:

- Mongoose exists for a reason. Easier and cleaner connection to the DB, allows for easy modeling for validation, better functionality such as returning the document you create when adding to the DB. Without mongoose have to do it in 2 steps, first insertOne to create, then find that document you just created.

- Basic auth flow -> salt and hash password and store that in db (never actual pwd) and use that for comparing during login.
