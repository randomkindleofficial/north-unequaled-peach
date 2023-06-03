const express = require("express");
const path = require("path");
const firestore = require("./firestore.js");
const exphbs = require("express-handlebars");
const hbs = require('hbs');
const app = express();

const axios = require('axios');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 'loopback, linklocal, uniquelocal')

app.set("views", path.join(__dirname, "src/pages"));
hbs.registerPartials(__dirname + '/src/pages/partials');

app.set("view engine", "hbs");
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: null,
    helpers: {
      add: (a, b) => a + b,
      loud: (a, b) => (a ? a.toUpperCase() : b),
    },
    extname: 'hbs'
  })
);
app.get("/", async (req, res) => {
    // req.query.paramName <-- a querystring example
    res.render("auth", {
      ip:req.ip
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
