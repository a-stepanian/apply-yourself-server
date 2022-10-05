Learnings:

- Mongoose exists for a reason. Easier and cleaner connection to the DB, allows for easy modeling for validation, better functionality such as returning the document you create when adding to the DB. Without mongoose have to do it in 2 steps, first insertOne to create, then find that document you just created.

- Basic auth flow -> salt and hash password and store that in db (never actual pwd) and use that for comparing during login.

- Reading mongoose errors and digging in to them. I initially setup the application model to require "response" property but don't have that as part of the create application form because that is something the user will add later when the edit their application info. Had to remove required in the schema.

- Deploying the front end on https required configuring the cookies differently.

- In production didn't have the DB collection in the environment variable url string and wasn't interacting with the db. Used postman to test and everything was working so found the difference between the local env variables and the saved ones in heroku.
