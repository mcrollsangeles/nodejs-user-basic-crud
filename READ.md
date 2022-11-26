This is a basic CRUD using node.js.
The architecture of this project is based on MVC concept but on this case its MRC - Model, Routes, Controller.

Folder test_cases is not required to run the project, the folder just contains possible test scenarios.
The sql script for DB creation is in the src/database folder.
The DB configuration is in src/database/connection.js

To run the project, here are the following commands needed to be done:

npm init
npm install express body-parser
npm install express body-parser mysql
npm install date-and-time --save
npm install -g nodemon
npm start / nodemon server.js

To test the project, just import the API collection in the API platform (like postman).

If you are encountering errors running the program using nodemon or npm start,
try modifying the following lines in package.json file:
line 4: "main": "src/server.js",
line 7: "start": "nodemon src/server.js"

Additional validation could still be added here for a better security specially against SQL injection.