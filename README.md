# Intern-Task

HTML form with CRUD APIs to store user details

## Getting Started
To get Node server running locally
1. Clone this repo
2. `npm install` to install all required dependencies
3. Install MongoDB community edition [instructions](https://docs.mongodb.com/manual/installation/#tutorials) and ensure you start the service
4. `npm run dev` to start the local server
5. Open `https://localhost:3000` to view the webpage

To access from other web browsers
1. Install nginx
2. Edit `/etc/nginx/sites-available/default` and set `root` to the dir where the repo is cloned and add `index.ejs` before `index.html` and in location add `proxy_pass http://localhost:3000;`
3. Restart nginx server 

## Code overview

### Dependencies
- body-parser: To handle reading data from form element
- ejs (Embedded JS): Template engine to render HTML dynamically
- express: Simplify server creation process
- mongodb: Backend database to store user details
- pdfkit: To generate PDF of user input
- nodemon: To avoid running server file again each time server.js is modified

### Application Structure 
- `server.js`: Entry point to our application.  This file defines our express server and connects it to MongoDB and handles CRUD API calls.
- `package.json`: Contains dependencies of our node app.
- `views/index.ejs`: Contains the HTML, CSS, JS code for the frontend
- `node_modules`: Built-in modules of nodejs

### 
