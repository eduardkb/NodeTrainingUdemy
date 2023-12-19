# Project with Handlebars

- provides interaction between front and back-end where logic is on backend. Handlebars restricts logic on front-end.

## installing dependencies

- $> npm install express express-handlebars
- $> npm install nodemon --save-dev

## Running WebPage

- install packages:
- $> npm install
- start app:
- $> npm start

## General Notes

- Basic code examples for if else, each, whith, ... on home.hbs with variables inserted from index.js
- Partials concept: created new route '/blog' also file '/views/blog.hbs' that for each post calls /views/partials/post.hbs using {{> post}}
- Introduced css creating app.use in file index.js, creating file \public\css\style.css and referencing on \views\layouts\main.hbs
