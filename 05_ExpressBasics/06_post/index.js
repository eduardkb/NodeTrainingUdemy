// to start this example use path /users/add

const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

// code to process the incomming data
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// get url to get user data
app.get("/users/add", (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

// post to print user data
app.post("/users/save", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;

  console.log(`Use name ${name}, with age ${age}`);

  res.sendFile(`${basePath}/userform.html`);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Returning user ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
