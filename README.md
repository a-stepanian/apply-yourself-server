Learnings:

- Mongoose exists for a reason. Easier and cleaner connection to the DB, allows for easy modeling for validation, better functionality such as returning the document you create when adding to the DB. Without mongoose have to do it in 2 steps, first insertOne to create, then find that document you just created.

- Basic auth flow -> salt and hash password and store that in db (never actual pwd) and use that for comparing during login.

- Reading mongoose errors and digging in to them. I initially setup the application model to require "response" property but don't have that as part of the create application form because that is something the user will add later when the edit their application info. Had to remove required in the schema.
