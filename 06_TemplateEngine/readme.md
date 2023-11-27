# Project with Handlebars

- provides interaction between front and back-end

## installing dependencies

- $> npm install express express-handlebars
- $> npm install nodemon --save-dev

## running

- install packages:
- $> npm install
- start app:
- $> npm start

## notes

- Basic code examples for if else, each, whith, ... on home.hbs with variables inserted from index.js
- Partials concept: created new route '/blog' also file '/views/blog.hbs' that for each post calls /views/partials/post.hbs using {{> post}}
- Introduced css creating app.use in file index.js, creating file \public\css\style.css and referencing on \views\layouts\main.hbs
